# Docusaurus RAG Chatbot for Physical AI & Humanoid Robotics Book

A comprehensive RAG (Retrieval-Augmented Generation) chatbot integrated with your Docusaurus book on Physical AI & Humanoid Robotics, featuring real-time chat, text selection Q&A, and source citations.

## Features

### 1. RAG Chatbot Interface
- ✅ Real-time chat with Gemini AI
- ✅ Message history with timestamps
- ✅ User messages: right-aligned, blue
- ✅ Bot messages: left-aligned, gray with 🤖 icon
- ✅ Typing indicator (animated dots)
- ✅ Smooth auto-scroll to latest message
- ✅ Clear chat button with confirmation modal
- ✅ Export chat history as markdown

### 2. Text Selection Q&A
- ✅ Detect text selection ANYWHERE on the page
- ✅ Show floating "Ask about selection 💬" button
- ✅ Position button dynamically near selected text
- ✅ Pre-fill chat input with selected text as context
- ✅ Auto-open chatbot when button clicked
- ✅ Works with: paragraphs, code blocks, tables, equations
- ✅ Clear selection after question sent

### 3. Source Citations
- ✅ Parse citations from AI responses
- ✅ Format: [Source: module-name | section-title]
- ✅ Display as clickable pills below messages
- ✅ Click to navigate to exact page/section
- ✅ Hover to show full document path
- ✅ Color-coded by module type:
  - Module 1 (ROS 2): Blue
  - Module 2 (Gazebo/Unity): Green
  - Module 3 (NVIDIA Isaac): Purple
  - Module 4 (VLA): Orange

### 4. Backend RAG Pipeline
- ✅ FastAPI server with CORS enabled
- ✅ Document chunking (500-1000 chars)
- ✅ Vector embeddings stored in Qdrant Cloud
- ✅ Semantic search for relevant chunks
- ✅ Neon Postgres for chat history storage
- ✅ User session management
- ✅ Rate limiting (60 requests/min per user)

### 5. Responsive Design
- ✅ Desktop: Fixed right sidebar (420px wide)
- ✅ Tablet: Collapsible floating button
- ✅ Mobile: Full-screen modal overlay
- ✅ Touch-friendly (min 44px buttons)
- ✅ Smooth transitions and animations

### 6. Theme Support
- ✅ Auto-detect Docusaurus theme
- ✅ Light mode: Clean white interface
- ✅ Dark mode: Dark gray with blue accents
- ✅ Seamless theme switching

## Project Structure

```
rag-chatbot/
├── backend/                 # FastAPI backend server
│   ├── main.py             # Main API endpoints
│   └── models.py           # Database models
├── docusaurus-plugin/      # Docusaurus plugin implementation
│   ├── index.js            # Plugin entry point
│   └── theme/              # React components
│       ├── ChatbotComponent.js
│       └── ChatbotComponent.css
├── frontend/               # Standalone frontend (for testing)
├── requirements.txt        # Python dependencies
├── start_server.py         # Server startup script
├── integrate.py            # Integration helper script
├── extracted_documents.json # Book content for RAG
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- Docusaurus site already set up
- Gemini API key
- Qdrant Cloud account (or local instance)

### 1. Install Backend Dependencies

```bash
cd rag-chatbot
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the `rag-chatbot` directory:

```env
GEMINI_API_KEY=your-gemini-api-key-here
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-api-key
DATABASE_URL=postgresql://username:password@localhost/chat_history
```

### 3. Start the Backend Server

```bash
cd rag-chatbot
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### 4. Integrate with Docusaurus Book

The plugin is already added to your `my-book/docusaurus.config.js` and `package.json`.
If you need to reinstall:

```bash
cd my-book
npm install ../rag-chatbot/docusaurus-plugin
npm run start
```

### 5. Extract Book Content (if needed)

If you need to re-extract content from your Docusaurus book:

```bash
cd rag-chatbot
python extract_content.py
```

## Usage

### Running the Complete System

1. **Start the backend** (in one terminal):
   ```bash
   cd rag-chatbot
   python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
   ```

2. **Start your Docusaurus site** (in another terminal):
   ```bash
   cd my-book
   npm run start
   ```

3. **Access your site** - the chatbot will appear as a floating button in the bottom-right corner

### Using the Chatbot

- Click the floating button to open the chat interface
- Select text anywhere on the page to ask questions about it
- The floating "Ask about selection" button will appear near your selection
- Ask questions about your Physical AI & Humanoid Robotics book
- View source citations below AI responses
- Export conversation history as markdown
- Clear chat history when needed

## API Endpoints

- `POST /chat` - Process user message and return AI response
- `POST /chat-history` - Get chat history for a session
- `POST /clear-chat` - Clear chat history for a session
- `POST /export-chat` - Export chat history as markdown
- `GET /health` - Health check endpoint

## Technical Details

### Backend Architecture
- FastAPI with Pydantic models
- Qdrant for vector storage and semantic search
- PostgreSQL for chat history
- LangChain for RAG implementation
- Google Generative AI for responses

### Frontend Architecture
- React component for Docusaurus integration
- Dynamic text selection detection
- Floating action buttons
- Responsive CSS with dark/light mode support
- Source citation display with color coding

### RAG Pipeline
1. Book content is extracted from Docusaurus build
2. Documents are chunked and embedded using Google's embedding model
3. Vector embeddings are stored in Qdrant
4. User queries are embedded and searched against document vectors
5. Relevant chunks are used as context for Gemini AI
6. AI response includes source citations

## Customization

### Styling
Modify `docusaurus-plugin/theme/ChatbotComponent.css` to adjust colors, sizes, and layout.

### Source Colors
Update the module color classes in CSS to change the source citation colors:
- `.module-1` - ROS 2 (Blue)
- `.module-2` - Gazebo/Unity (Green) 
- `.module-3` - NVIDIA Isaac (Purple)
- `.module-4` - VLA (Orange)

### API Configuration
Update `backend/main.py` to change:
- Chunk size and retrieval settings
- Rate limiting
- Database connection
- API endpoints

## Troubleshooting

### Common Issues
- **Chatbot not appearing**: Ensure both backend and frontend are running
- **API errors**: Check that environment variables are set correctly
- **Text selection not working**: Make sure there are no JavaScript conflicts
- **Slow responses**: Check your internet connection and API key quotas

### Development
- The backend runs on port 8000 by default
- The frontend connects to the backend at `http://localhost:8000`
- CORS is enabled for all origins (configure appropriately for production)

## License

MIT License - see the LICENSE file for details.