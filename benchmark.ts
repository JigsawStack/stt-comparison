import fs from "fs";
import Groq from "groq-sdk";
import { AssemblyAI } from "assemblyai";
import { JigsawStack } from "jigsawstack";

const audioUrl =
  "https://rogilvkqloanxtvjfrkm.supabase.co/storage/v1/object/public/demo/Video%201737458382653833217.mp4"; // set your audio URL here
const aai = new AssemblyAI({ apiKey: "" });
const groq = new Groq({
  apiKey: "",
});
const jigsawstack = JigsawStack({
  apiKey: "",
});

async function runGroq() {
  console.time("STT_Groq");
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream("sample.mp4"),
      model: "whisper-large-v3-turbo",
      language: "en",
      temperature: 0.0,
    });
  } catch (error) {
    console.error("Error in Groq:", error);
  }
  console.timeEnd("STT_Groq");
}

async function runJigsawStack() {
  console.time("STT_JigsawStack");
  try {
    const transcription = await jigsawstack.audio.speech_to_text({
      url: audioUrl,
    });
  } catch (error) {
    console.error("Error in JigsawStack:", error);
  }
  console.timeEnd("STT_JigsawStack");
}

const runAssemblyAI = async () => {
  console.time("STT_AssemblyAI");
  try {
    const transcript = await aai.transcripts.transcribe({
      audio_url: audioUrl,
    });
    // console.log(transcript.text);
  } catch (error) {
    console.error("Error in AssemblyAI:", error);
  }
  console.timeEnd("STT_AssemblyAI");
};

const benchmark = async () => {
  const iterations = 10;
  const responseTimes = {
    Groq: [],
    JigsawStack: [],
    AssemblyAI: [],
  };

  for (let i = 0; i < iterations; i++) {
    console.log(`Iteration ${i + 1}`);

    // Measure Groq response time
    const groqStart = Date.now();
    await runGroq();
    const groqEnd = Date.now();
    responseTimes.Groq.push(groqEnd - groqStart);

    // Measure JigsawStack response time
    const jigsawStart = Date.now();
    await runJigsawStack();
    const jigsawEnd = Date.now();
    responseTimes.JigsawStack.push(jigsawEnd - jigsawStart);

    // Measure AssemblyAI response time
    const assemblyStart = Date.now();
    await runAssemblyAI();
    const assemblyEnd = Date.now();
    responseTimes.AssemblyAI.push(assemblyEnd - assemblyStart);
  }

  const avgResponseTime = (times) =>
    times.reduce((a, b) => a + b, 0) / times.length;

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
