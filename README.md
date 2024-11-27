# Speech-to-Text API Benchmarking Script

This script benchmarks the response times of four speech-to-text (STT) APIs: **Groq**, **JigsawStack**, **AssemblyAI**, and **OpenAI**. It runs each API 10 times (configurable) across for audio samples of different lengths and calculates the average response time for each.

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