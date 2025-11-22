# Audio Transcription Service (Node.js + TypeScript + Express + MongoDB)

A minimal backend service built with **Node.js**, **TypeScript**, **Express**, and **MongoDB**.  
It accepts an audio URL, generates a **mock transcription**, and saves it to MongoDB.

This project follows scalable folder structure with clean separation of concerns.

---

## Project Structure (TypeScript)

```
src/
 ├── app.ts
 ├── server.ts
 ├── controllers/
 │     ├── transcriptionController.ts
 │     └── azureTranscriptionController.ts
 ├── services/
 │     ├── transcriptionService.ts
 │     └── transcriptionAzureService.ts
 ├── routes/
 │     └── transcriptionRoutes.ts
 ├── models/
 │     └── Transcription.ts
 ├── types/
 │     └── transcription.d.ts
```

---

## API Endpoints

### **POST /api/transcription**
Creates a mock transcription.

**Request**
```json
{
  "audioUrl": "https://example.com/audio.mp3"
}
```

**Response**
```json
{
  "_id": "679b29c7d21f4a12bd1219e2"
}
```

---

### **GET /api/transcriptions**
Returns:
- All transcriptions  
- OR only last 30 days (if query param used)

**Query Usage**
```
/api/transcriptions?last30days=true
```

---

## Logic

### **Transcription Mock**
No real audio processing is done; system returns:

```
"transcribed text"
```

### **Audio Download Mock**
We only log:
```
Downloading audio from: {URL}
```

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **Mongoose**
- **MongoDB**
- **dotenv**

---

## TypeScript Features Used

✔ Strong typing for:  
- Request body  
- Services  
- Models  
- Controllers

✔ Interfaces for:
- Transcription Document
- API request structures

✔ ES module imports (`import ... from`)

✔ `.ts` files compiled to `dist/` using `tsconfig.json`

---

## MongoDB Indexing Notes

Since we run queries filtered by date:

```ts
{ createdAt: { $gte: last30Days } }
```

To scale beyond **100M+ records**, recommended index is:

```
db.transcriptions.createIndex({ createdAt: 1 })
```

### Why?

- Allows fast scanning of only relevant date-range  
- Prevents full collection scan  
- Speeds up sorting (latest first)

---

## Scalability (10k+ concurrent requests)

### **1. Horizontal Scaling**
Run multiple Node clusters / containers:
- PM2 cluster mode
- Docker + Kubernetes
- AWS ECS / Lambda

### **2. Queue-Based Processing**
Offload transcription (even in future real version) to:
- SQS  
- Kafka  

Main API stays fast even under load.

### **3. Redis Caching**
Cache:
- recent transcriptions  
- heavy queries (last 30 days)

### **4. Connection Pooling**
MongoDB driver supports connection pooling → improves concurrency.

---

## How to Run

Install dependencies:
```
npm install
```

Start dev mode:
```
npm run dev
```

Build:
```
npm run build
```

Run compiled JS:
```
npm start
```

Default MongoDB:
```
mongodb://localhost:27017/audioDB
```

Health check:
```
GET /health
```

---

## Assumptions

- No real audio file download or transcription.
- No file storage.
- No authentication implemented.
- Only mock-based logic required for assignment.

---

##  License
MIT License – Free to use & modify.
