import { Router } from 'express';
import { handleTranscription,getAllTranscriptions } from '../controllers/transcriptionController.js';
import { handleAzureTranscription } from '../controllers/azureTranscriptionController.js';

const router = Router();
router.post('/transcription', handleTranscription);
router.get('/transcriptions', getAllTranscriptions);
router.post('/azure-transcription', handleAzureTranscription);
export default router;
