# Deployment Guide

## MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user.
3. Add your IP or Render IP allowlist.
4. Copy the connection string into `server/.env`.

## Backend on Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `AI_RECOMMENDATION_URL`, `AI_SEARCH_URL`, `AI_CHATBOT_URL`

## AI Services on Render

Create three Python web services:

- `ai-services/recommendation-engine`, start `uvicorn main:app --host 0.0.0.0 --port $PORT`
- `ai-services/semantic-search`, start `uvicorn main:app --host 0.0.0.0 --port $PORT`
- `ai-services/chatbot-service`, start `uvicorn main:app --host 0.0.0.0 --port $PORT`

For chatbot, set `GEMINI_API_KEY`.

## Frontend on Vercel

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

