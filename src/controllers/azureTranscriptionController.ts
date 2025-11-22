import { Request, Response } from "express";
import { createAzureTranscription } from "../services/transcriptionAzureService.js";

export async function handleAzureTranscription(req: Request, res: Response) {
  try {
    const { audioUrl } = req.body;

    if (!audioUrl)
      return res.status(400).json({ error: "audioUrl is required" });

    const record = await createAzureTranscription(audioUrl);

    res.json({
      _id: record._id,
      text: record.transcription,
      source: record.source,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
