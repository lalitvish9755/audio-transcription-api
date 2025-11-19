import Transcription from '../models/Transcription.js';

export async function createTranscription(audioUrl: string) {
  // Mock download and transcription
  console.log(`Downloading audio from: ${audioUrl}`);
  const transcriptionText = "transcribed text";

  const record = new Transcription({
    audioUrl,
    transcription: transcriptionText
  });

  await record.save();
  return record;
}
