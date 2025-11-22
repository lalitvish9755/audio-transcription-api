import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import axios from "axios";
import Transcription from "../models/Transcription.js";

export async function createAzureTranscription(audioUrl: string) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;

  // If no Azure keys → fallback to mock
  if (!key || !region) {
    console.log("Azure credentials missing — using mock transcription.");
    return await saveAzureRecord(audioUrl, "mock azure transcription");
  }

  try {
    // 1. Download audio file as binary
    const response = await axios.get(audioUrl, { responseType: "arraybuffer" });

    // 2. Create Push Stream for Azure
    const pushStream = sdk.AudioInputStream.createPushStream();
    pushStream.write(response.data);
    pushStream.close();

    // 3. Create audio config
    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

    // 4. Azure Speech Config
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = "en-US";

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // 5. Call Azure Speech
    const result = await new Promise<sdk.SpeechRecognitionResult>((resolve, reject) => {
      recognizer.recognizeOnceAsync(resolve, reject);
    });

    const text = result.text || "No transcription returned from Azure";

    return await saveAzureRecord(audioUrl, text);

  } catch (err) {
    console.error("Azure STT error:", err);
    return await saveAzureRecord(audioUrl, "azure transcription failed");
  }
}

async function saveAzureRecord(audioUrl: string, transcription: string) {
  const record = new Transcription({
    audioUrl,
    transcription,
    source: "azure"
  });

  await record.save();
  return record;
}
