import { Schema, model } from 'mongoose';

const transcriptionSchema = new Schema({
  audioUrl: { type: String, required: true },
  transcription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  source: { type: String, default: 'mock' } // optional for Azure
});

export default model('Transcription', transcriptionSchema);
