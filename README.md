# Speech-to-Text API Benchmarking Script

This script benchmarks the response times of four speech-to-text (STT) APIs: **Groq**, **JigsawStack**, **AssemblyAI**, and **OpenAI**. It runs each API 10 times (configurable) across for audio samples of different lengths and calculates the average response time for each.

[Check this out for the full results and breakdown of the benchmark](https://jigsawstack.com/blog/jigsawstack-vs-groq-vs-assemblyai-vs-openai-speech-to-text-benchmark-comparison)

## Benchmark overview

| **Criteria** | **JigsawStack** | **Groq** | **AssemblyAI** | **OpenAI** |
| --- | --- | --- | --- | --- |
| **Model** | Insanely-fast-whisper | Whisper-large-v3-turbo | Universal-1 | Whisper-2 |
| **Latency (5s audio)** | 765ms | 631ms | 4s | 12s |
| **Latency (3m video)** | 2.7s | 3.5s | 7.8s | 10s |
| **Latency (30m video)** | 11s | 12s | 29s | 91s |
| **Latency (1hr 35m video)** | 27s | Error out | 42s | Error out |
| **Word Error Rate (WER)** | 10.30% | 12% | 8.70% | 10.60% |
| **Diarization Support** | Yes | No | Yes | No |
| **Timestamp** | Sentence level | Sentence level | Word level | Sentence level |
| **Large File** | Up to 100MB | Up to 25MB | 5GB | Up to 25MB |
| **Automatic** | Yes | Yes | Yes | Yes |
| **Streaming Support** | No | No | Yes | No |
| **Pricing** | $0.05/hr | $0.04/hr | $0.37/hr | $0.36/hr |
| **Best For** | Speed, Low cost, Production apps | Low cost and lightweight app | Real-time transcription apps |  |

## Prerequisites

Before running this script, ensure you have the following:

- **Node.js** (v16 or higher)
- API keys for:
  - **Groq SDK**
  - **AssemblyAI**
  - **JigsawStack**
  - **OpenAI**

## Installation

1. **Clone the repository** (or download the script if provided directly):
   ```bash
   git clone https://github.com/JigsawStack/stt-comparison.git
   ```

2. **Install dependencies**:
   ```bash
   yarn
   ```
   or
   ```bash
   npm install
   ```

## Configuration

### Set API keys** for each of the services:

Use the `.env.example` file to create a `.env` file and replace the placeholders with your actual API keys:


## Running the Script

To run the benchmarking script, execute the following command:

```bash
tsx benchmark.ts
```

The script will run each API request 10 times (or the specified number of iterations) and print out average response times in milliseconds for each service.

## Output

The script logs each API’s average response time. Example output:

```
Iteration 1
...
Average response time for Groq: 3512.3759947 ms
Average response time for JigsawStack: 2749.9410608999997 ms
Average response time for AssemblyAI: 7808.462181100001 ms
Average response time for Openai:  10407.212865700001 ms
```

## Audio Samples

Here are the audio samples used in the benchmark

- [Sample 1](https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_short_audio_sample_1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF9zaG9ydF9hdWRpb19zYW1wbGVfMS5tcDQiLCJpYXQiOjE3MzIyMDIzMDYsImV4cCI6MzE1NTMwMDY2NjMwNn0.I0-T5I-nkdeykmizHmq1Ut_Jjs66DxzApv2XbrV9MyM&t=2024-11-21T15%3A18%3A26.030Z)

- [Sample 2](https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_very_short_audio_sample_2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF92ZXJ5X3Nob3J0X2F1ZGlvX3NhbXBsZV8yLm1wMyIsImlhdCI6MTczMjIwMzIwNywiZXhwIjozMTU1MzAwNjY3MjA3fQ._R0cLbrIx_FUR3CMRYaUMj616diA_1fjWUcVq2vAONg&t=2024-11-21T15%3A33%3A27.154Z)

- [Sample 3](https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_long_audio_sample_3.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF9sb25nX2F1ZGlvX3NhbXBsZV8zLm1wMyIsImlhdCI6MTczMjIwMjM0NywiZXhwIjozMTU1MzAwNjY2MzQ3fQ.KX1NxaFIfVRdWFsp1sToQNreRLzWIThJHYGyR6xcGbs&t=2024-11-21T15%3A19%3A07.592Z)

- [Sample 4](https://uuvhpoxkzjnrvvajhnyb.supabase.co/storage/v1/object/sign/default/preview/stt-examples/stt_mid_audio_sample_4.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZWZhdWx0L3ByZXZpZXcvc3R0LWV4YW1wbGVzL3N0dF9taWRfYXVkaW9fc2FtcGxlXzQubXAzIiwiaWF0IjoxNzMyMzE0NTI4LCJleHAiOjMxNTUzMDA3Nzg1Mjh9.GR75hn3x5J67Ar00I_PApUKht2BN9IZHzOKEXIOsF_U&t=2024-11-22T22%3A28%3A48.351Z)