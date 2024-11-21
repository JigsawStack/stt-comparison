import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import Groq from "groq-sdk";
import { AssemblyAI } from "assemblyai";
import { JigsawStack } from "jigsawstack";

const audioSamples = [
  {
    name: "sample3.mp3",
    url: "https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_long_audio_sample_3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF9sb25nX2F1ZGlvX3NhbXBsZV8zLm1wMyIsImlhdCI6MTczMjIwMjM0NywiZXhwIjozMTU1MzAwNjY2MzQ3fQ.KX1NxaFIfVRdWFsp1sToQNreRLzWIThJHYGyR6xcGbs&t=2024-11-21T15%3A19%3A07.592Z",
  },
  {
    name: "sample1.mp4",
    url: "https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_short_audio_sample_1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF9zaG9ydF9hdWRpb19zYW1wbGVfMS5tcDQiLCJpYXQiOjE3MzIyMDIzMDYsImV4cCI6MzE1NTMwMDY2NjMwNn0.I0-T5I-nkdeykmizHmq1Ut_Jjs66DxzApv2XbrV9MyM&t=2024-11-21T15%3A18%3A26.030Z",
  },
  {
    name: "sample2.mp3",
    url: "https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_very_short_audio_sample_2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF92ZXJ5X3Nob3J0X2F1ZGlvX3NhbXBsZV8yLm1wMyIsImlhdCI6MTczMjIwMzIwNywiZXhwIjozMTU1MzAwNjY3MjA3fQ._R0cLbrIx_FUR3CMRYaUMj616diA_1fjWUcVq2vAONg&t=2024-11-21T15%3A33%3A27.154Z",
  },
];

const aai = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});
const jigsawstack = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_API_KEY!,
});

const runGroq = (audioUrl: string) => {
  return groq.audio.transcriptions.create({
    file: fs.createReadStream(audioUrl),
    model: "whisper-large-v3-turbo",
    language: "en",
    temperature: 0.0,
  });
};

const runJigsawStack = (audioUrl: string) => {
  return jigsawstack.audio.speech_to_text({
    url: audioUrl,
  });
};

const runAssemblyAI = (audioUrl: string) => {
  return aai.transcripts.transcribe({
    audio_url: audioUrl,
  });
};

const stt = async (
  func: (audioUrl: string) => Promise<void>,
  audioUrl: string
) => {
  const start = performance.now();
  try {
    await func(audioUrl);
  } catch (error) {
    console.error(`Error in ${func.name}:`, error);
    return -1;
  }
  const end = performance.now();
  const time = end - start;
  console.log(`${func.name} took ${time}ms or ${time / 1000}s`);
  return time;
};

const providers = {
  Groq: runGroq,
  JigsawStack: runJigsawStack,
  AssemblyAI: runAssemblyAI,
};

const benchmark = async () => {
  const iterations = 10;
  const providerKeys = Object.keys(providers);

  if (!fs.existsSync("samples")) {
    fs.mkdirSync("samples");
    console.log("Downloading audio samples...");
    await Promise.all(
      audioSamples.map(async (as) => {
        const resp = await fetch(as.url);
        fs.writeFileSync(
          `samples/${as.name}`,
          Buffer.from(await resp.arrayBuffer())
        );
      })
    );
    console.log("Audio samples downloaded.");
  }

  const responseTimes: {
    samples: {
      [key: string]: {
        url: string;
        results: {
          [key: string]: number[];
        };
        results_avg: {
          [key: string]: number;
        };
      };
    };
  } = {
    samples: {},
  };

  for (
    let audioSampleIndex = 0;
    audioSampleIndex < audioSamples.length;
    audioSampleIndex++
  ) {
    const audioURL = audioSamples[audioSampleIndex].url;

    const sampleKey = audioSamples[audioSampleIndex].name;

    responseTimes.samples[sampleKey] = {
      url: audioURL,
      results: providerKeys.reduce((acc, provider) => {
        acc[provider] = [];
        return acc;
      }, {}),
      results_avg: providerKeys.reduce((acc, provider) => {
        acc[provider] = 0;
        return acc;
      }, {}),
    };

    console.log(`Running ${iterations} iterations for ${sampleKey}`);

    for (let i = 0; i < iterations; i++) {
      console.log(`Iteration ${i + 1}`);

      const providerResults = await Promise.all(
        providerKeys.map((provider) =>
          stt(
            providers[provider],
            provider == "Groq"
              ? `samples/${audioSamples[audioSampleIndex].name}`
              : audioURL
          )
        )
      );

      providerResults.forEach((result, index) => {
        responseTimes.samples[sampleKey].results[providerKeys[index]].push(
          result
        );
      });
    }

    providerKeys.forEach((provider) => {
      const avg = avgResponseTime(
        responseTimes.samples[sampleKey].results[provider]
      );
      responseTimes.samples[sampleKey].results_avg[provider] = avg;
      console.log(
        `Average response time for ${provider} with sample ${sampleKey}: ${avg}ms or ${
          avg / 1000
        }s`
      );
    });

    fs.writeFileSync(
      `benchmark_results.json`,
      JSON.stringify(responseTimes, null, 2)
    );
  }
};

benchmark();

const avgResponseTime = (times: number[]) =>
  times.reduce((a, b) => a + b, 0) / times.length;
