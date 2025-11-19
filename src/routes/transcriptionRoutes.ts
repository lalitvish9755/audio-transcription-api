import { Router } from 'express';
import { handleTranscription } from '../controllers/transcriptionController.js';

const router = Router();
router.post('/transcription', handleTranscription);

export default router;
