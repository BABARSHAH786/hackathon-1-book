# Quickstart Guide: Integrated RAG Chatbot

## Overview
This guide will help you set up and run the integrated RAG chatbot for the AI-Native textbook. The system consists of a FastAPI backend, Qdrant vector database, Neon Postgres for user data, and a Docusaurus plugin for the frontend integration.

## Prerequisites
- Python 3.11+
- Node.js 18+ (for Docusaurus)
- Access to OpenAI API (with sufficient quota for embeddings and chat)
- Access to Qdrant Cloud (free tier sufficient)
- Neon Serverless Postgres database

## Backend Setup

### 1. Environment Configuration
Create a `.env` file in the backend directory with the following:
```
OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DB_URL=your_neon_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 2. Backend Installation
```bash
# Navigate to backend directory
cd src/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

### 3. API Documentation
- Interactive API docs: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`

## Frontend Integration (Docusaurus Plugin)

### 1. Installation
```bash
# Navigate to your Docusaurus project
cd path/to/your/docusaurus/project

# Install the chatbot plugin
npm install docusaurus-chatbot-plugin
```

### 2. Configuration
In your `docusaurus.config.js`:
```javascript
module.exports = {
  // ... existing config
  plugins: [
    // ... existing plugins
    [
      'docusaurus-chatbot-plugin',
      {
        backendUrl: 'http://localhost:8000', // Update with your backend URL
        chatTitle: 'Textbook Assistant',
        chatDescription: 'Ask questions about this textbook',
      },
    ],
  ],
};
```

### 3. Building and Serving
```bash
npm run build  # Build the static site with the chatbot
npm run serve  # Serve the built site locally
```

## Embedding Pipeline

### 1. Generating Textbook Embeddings
```bash
cd embedding_pipeline

# Process and upload textbook content
python generate_embeddings.py --textbook-path /path/to/textbook --qdrant-url $QDRANT_URL
```

This script will:
- Split the textbook into 300-500 token chunks
- Generate embeddings using OpenAI's text-embedding-3-large model
- Store vectors in Qdrant with metadata (chapter, section, chunk_id)

### 2. Updating Embeddings
When textbook content changes:
```bash
python upload_embeddings.py --chapter "Chapter Title" --force-update
```

## Testing the Integration

### 1. Backend Tests
```bash
cd src/backend
python -m pytest tests/
```

### 2. Frontend Tests
```bash
cd src/frontend
npm test
```

### 3. End-to-End Test
1. Start the backend: `uvicorn main:app --reload`
2. Build and serve the Docusaurus site
3. Open the textbook in your browser
4. Interact with the chatbot widget
5. Ask a question about the textbook content
6. Verify that you receive a relevant answer with source attribution

## Deployment

### Backend Deployment (to Railway/Render/Fly.io)
```bash
# Example for Railway:
railway login
railway init
railway up
```

### Frontend Deployment (GitHub Pages or Vercel)
```bash
# Example for GitHub Pages:
GIT_USER=<Your GitHub username> CURRENT_BRANCH=main USE_SSH=true npm run deploy

# Example for Vercel:
npm install -g vercel
vercel
```

## Troubleshooting

### Common Issues

1. **OpenAI API Rate Limits**: 
   - Solution: Implement request queuing or increase your OpenAI quota.

2. **Qdrant Connection Issues**:
   - Verify your QDRANT_URL and QDRANT_API_KEY are correct.
   - Check that your IP is whitelisted if using cloud firewall.

3. **Chatbot Not Appearing in Docusaurus**:
   - Verify that the plugin is correctly added to your docusaurus.config.js.
   - Check browser console for JavaScript errors.

4. **Slow Response Times**:
   - Verify that your OpenAI and Qdrant connections are not experiencing latency.
   - Consider optimizing the embedding chunk size for your content.