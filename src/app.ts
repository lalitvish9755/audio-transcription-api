import express from 'express';
import transcriptionRoutes from './routes/transcriptionRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', transcriptionRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
