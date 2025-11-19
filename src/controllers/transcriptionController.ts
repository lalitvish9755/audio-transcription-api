import { Request, Response } from 'express';
import { createTranscription } from '../services/transcriptionService.js';

export async function handleTranscription(req: Request, res: Response) {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) return res.status(400).json({ error: 'audioUrl is required' });

    const record = await createTranscription(audioUrl);
    res.json({ _id: record._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
