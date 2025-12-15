# Docusaurus RAG Chatbot Plugin

A Docusaurus plugin that integrates a RAG (Retrieval-Augmented Generation) chatbot with your documentation site, featuring text selection functionality and source citations.

## Features

- **Real-time chat with Gemini AI**: Users can ask questions about your documentation
- **Text selection Q&A**: Select any text on the page and ask questions about it
- **Source citations**: Responses include clickable citations to the original documentation
- **Message history with timestamps**: Complete chat history tracking
- **Export functionality**: Export chat history as markdown
- **Responsive design**: Works on desktop, tablet, and mobile
- **Theme support**: Automatically adapts to light/dark mode
- **Persistent sessions**: Chat history persists across page refreshes

## Installation

1. Install the plugin:
```bash
npm install docusaurus-plugin-rag-chatbot
```

2. Add the plugin to your `docusaurus.config.js`:
```javascript
module.exports = {
  plugins: [
    'docusaurus-plugin-rag-chatbot',
    // ... other plugins
  ],
};
```

3. Make sure your backend API is running (see Backend Setup below)

## Backend Setup

The plugin requires a backend API to handle RAG processing. The expected API endpoints are:

- `POST /chat` - Process user messages and return AI responses
- `POST /chat-history` - Get chat history for a session
- `POST /clear-chat` - Clear chat history
- `POST /export-chat` - Export chat history as markdown

The plugin expects the backend to be running on `http://localhost:8000` by default. You can modify the URLs in `ChatbotComponent.js` if needed.

## Usage

Once installed, the chatbot will appear as a floating button on all pages. Users can:

- Click the floating button to open the chat
- Select text on any page to ask questions about it
- Ask questions about the documentation
- Export their chat history
- Clear their chat history

## Configuration

The plugin currently uses these default settings:
- Backend API URL: `http://localhost:8000`
- Session IDs are stored in localStorage
- Default theme adapts to Docusaurus theme

## Styling

The chatbot uses CSS variables that can be customized in your Docusaurus theme. The plugin includes default styling that matches Docusaurus's design system.

## Development

To modify the plugin:

1. Clone the repository
2. Make changes to the files in the `theme/` directory
3. Test by running a Docusaurus site with the plugin installed

## API Integration

The backend API should implement:

### Chat Endpoint
```
POST /chat
Content-Type: application/json

{
  "session_id": "unique_session_id",
  "message": "user's question",
  "user_id": "optional_user_id"
}

Response:
{
  "response": "AI response",
  "sources": [
    {
      "title": "Document title",
      "formatted_source": "Formatted source path",
      "raw_source": "Raw path",
      "color": "module-color-class",
      "id": "unique_id"
    }
  ]
}
```

### Chat History
```
POST /chat-history
{
  "session_id": "unique_session_id",
  "user_id": "optional_user_id"
}

Response:
{
  "messages": [
    {
      "role": "user|assistant",
      "content": "message content",
      "timestamp": "ISO timestamp",
      "sources": [] // only for assistant messages
    }
  ]
}
```

## License

MIT