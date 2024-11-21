import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import Groq from "groq-sdk";
import { AssemblyAI } from "assemblyai";
import { JigsawStack } from "jigsawstack";

const audioUrl =
  "https://rogilvkqloanxtvjfrkm.supabase.co/storage/v1/object/public/demo/Video%201737458382653833217.mp4"; // set your audio URL here

const aai = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});
const jigsawstack = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_API_KEY!,
});

const runGroq = async () => {
  console.time("STT_Groq");
  try {
    await groq.audio.transcriptions.create({
      file: fs.createReadStream("sample-1.mp4"),
      model: "whisper-large-v3-turbo",
      language: "en",
      temperature: 0.0,
    });
  } catch (error) {
    console.error("Error in Groq:", error);
  }
  console.timeEnd("STT_Groq");
};

const runJigsawStack = async () => {
  console.time("STT_JigsawStack");
  try {
    await jigsawstack.audio.speech_to_text({
      url: audioUrl,
    });
  } catch (error) {
    console.error("Error in JigsawStack:", error);
  }
  console.timeEnd("STT_JigsawStack");
};

const runAssemblyAI = async () => {
  console.time("STT_AssemblyAI");
  try {
    await aai.transcripts.transcribe({
      audio_url: audioUrl,
    });
  } catch (error) {
    console.error("Error in AssemblyAI:", error);
  }
  console.timeEnd("STT_AssemblyAI");
};

const avgResponseTime = (times: number[]) =>
  times.reduce((a, b) => a + b, 0) / times.length;

const sst = async (func: () => Promise<void>) => {
  const start = performance.now();
  await func();
  const end = performance.now();
  return end - start;
};

const benchmark = async () => {
  const iterations = 10;
  const responseTimes: {
    Groq: number[];
    JigsawStack: number[];
    AssemblyAI: number[];
  } = {
    Groq: [],
    JigsawStack: [],
    AssemblyAI: [],
  };

  for (let i = 0; i < iterations; i++) {
    console.log(`Iteration ${i + 1}`);

    // Measure Groq response time
    const [groqTime, JigsawStackTime, assemblyTime] = await Promise.all([
      sst(runGroq),
      sst(runJigsawStack),
      sst(runAssemblyAI),
    ]);

    responseTimes.Groq.push(groqTime);
    responseTimes.JigsawStack.push(JigsawStackTime);
    responseTimes.AssemblyAI.push(assemblyTime);
  }

  console.log(
    `Average response time for Groq: ${avgResponseTime(responseTimes.Groq)} ms`
  );
  console.log(
    `Average response time for JigsawStack: ${avgResponseTime(
      responseTimes.JigsawStack
    )} ms`
  );
  console.log(
    `Average response time for AssemblyAI: ${avgResponseTime(
      responseTimes.AssemblyAI
    )} ms`
  );
};

benchmark();
