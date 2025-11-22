import { Request, Response } from 'express';
import { createTranscription, fetchAllTranscriptions } from '../services/transcriptionService.js';

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
export async function getAllTranscriptions(req: Request, res: Response) {
  console.log("This is only for test");
  try {
    const records = await fetchAllTranscriptions();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
