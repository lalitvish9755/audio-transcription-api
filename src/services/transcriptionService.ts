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

export async function fetchAllTranscriptions() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const record = await Transcription.find({ createdAt: { $gte: thirtyDaysAgo } }).sort({createdAt:-1}); // newest first
  return record;
}
