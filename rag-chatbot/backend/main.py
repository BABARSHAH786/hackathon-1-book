from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import json
import uuid
from datetime import datetime
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain_core.prompts import PromptTemplate
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.sql import func
import re
import logging

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Docusaurus RAG Chatbot API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./chat_history.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database models
class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    user_id = Column(String, index=True)
    question = Column(Text)
    answer = Column(Text)
    sources = Column(Text)  # JSON string of sources
    timestamp = Column(DateTime, server_default=func.now())

Base.metadata.create_all(bind=engine)

# Pydantic models
class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    session_id: str
    message: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, Any]]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatHistoryRequest(BaseModel):
    session_id: str
    user_id: Optional[str] = None

class ClearChatRequest(BaseModel):
    session_id: str
    user_id: Optional[str] = None

class ExportChatRequest(BaseModel):
    session_id: str
    user_id: Optional[str] = None

# Global variables
qdrant_client = None
embeddings_model = None
llm_model = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_module_color(source_path: str) -> str:
    """Determine the color class for source citations based on module"""
    if "Chapter 1" in source_path or "introduction" in source_path.lower():
        return "module-1"  # ROS 2 - Blue
    elif "Chapter 2" in source_path or "gazebo" in source_path.lower() or "unity" in source_path.lower():
        return "module-2"  # Gazebo/Unity - Green
    elif "Chapter 3" in source_path or "nvidia" in source_path.lower() or "isaac" in source_path.lower():
        return "module-3"  # NVIDIA Isaac - Purple
    elif "Chapter 4" in source_path or "vla" in source_path.lower() or "vision-language" in source_path.lower():
        return "module-4"  # VLA - Orange
    else:
        return "module-1"  # Default to blue

def init_rag_system():
    """Initialize the RAG system with Qdrant vector store"""
    global qdrant_client, embeddings_model, llm_model

    try:
        # Initialize Qdrant client
        qdrant_url = os.getenv("QDRANT_URL", "localhost")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")


        if qdrant_api_key:
            qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
        else:
            qdrant_client = QdrantClient(host=qdrant_url)

        # Initialize embeddings model
        gemini_api_key = os.getenv("GOOGLE_API_KEY")
        if not gemini_api_key:
            gemini_api_key = os.getenv("GEMINI_API_KEY")  # Fallback to GEMINI_API_KEY

        embeddings_model = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=gemini_api_key
        )

        # Initialize LLM model
        llm_model = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=gemini_api_key,
            temperature=0.1
        )

        # Load documents and create vector store if needed
        # Check if collection exists
        collections = qdrant_client.get_collections()
        if "docusaurus_docs" not in [c.name for c in collections.collections]:
            # Create collection if it doesn't exist
            qdrant_client.create_collection(
                collection_name="docusaurus_docs",
                vectors_config=VectorParams(size=768, distance=Distance.COSINE),
            )
            logger.info("Created Qdrant collection: docusaurus_docs")
    except Exception as e:
        logger.error(f"Error initializing RAG system: {e}")
        logger.info("RAG system initialization failed - server will still start but RAG features won't work until dependencies are available")
        # Don't raise the exception so the server can start anyway

@app.on_event("startup")
async def startup_event():
    """Initialize RAG system on startup"""
    init_rag_system()

    # Load documents if not already loaded
    await load_documents_if_needed()

async def load_documents_if_needed():
    """Load documents from JSON if vector store is empty"""
    try:
        # Check if the collection has points
        collection_info = qdrant_client.get_collection("docusaurus_docs")
        if collection_info.points_count == 0:
            # Load documents from JSON file
            documents_path = os.path.join(os.path.dirname(__file__), "..", "extracted_documents.json")
            with open(documents_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Process documents and add to vector store
            documents = []
            points = []

            for item in data:
                doc = Document(
                    page_content=item['content'],
                    metadata={
                        'source': item['source'],
                        'title': item['title'],
                        'id': item['id']
                    }
                )
                documents.append(doc)

                # Create embedding for the document
                embedding = embeddings_model.embed_query(item['content'])

                # Create point for Qdrant
                point = PointStruct(
                    id=uuid.uuid4().int,
                    vector=embedding,
                    payload={
                        "content": item['content'],
                        "source": item['source'],
                        "title": item['title'],
                        "id": item['id']
                    }
                )
                points.append(point)

            # Upload to Qdrant
            qdrant_client.upsert(collection_name="docusaurus_docs", points=points)
            logger.info(f"Uploaded {len(points)} documents to Qdrant")
    except Exception as e:
        logger.error(f"Error loading documents: {e}")

def search_documents(query: str, top_k: int = 4):
    """Search for relevant documents in the vector store"""
    try:
        query_embedding = embeddings_model.embed_query(query)

        search_results = qdrant_client.search(
            collection_name="docusaurus_docs",
            query_vector=query_embedding,
            limit=top_k
        )

        results = []
        for result in search_results:
            results.append({
                "content": result.payload["content"],
                "source": result.payload["source"],
                "title": result.payload["title"],
                "id": result.payload["id"],
                "score": result.score
            })

        return results
    except Exception as e:
        logger.error(f"Error searching documents: {e}")
        return []

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Handle chat requests with RAG"""
    try:
        # Search for relevant documents
        search_results = search_documents(request.message, top_k=4)

        # Format context from search results
        context_parts = []
        sources = []

        for result in search_results:
            context_parts.append(result["content"])
            # Format source for citation
            source_info = {
                "title": result["title"],
                "source": result["source"],
                "color": get_module_color(result["source"]),
                "id": result["id"]
            }
            sources.append(source_info)

        context = "\n\n".join(context_parts)

        # Create prompt template
        template = """Use the following pieces of context to answer the question at the end.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Keep the answer as concise as possible and include relevant citations in the format [Source: module-name | section-title].

        {context}

        Question: {question}
        Helpful Answer:"""

        QA_CHAIN_PROMPT = PromptTemplate(
            input_variables=["context", "question"],
            template=template
        )

        # Generate response using LLM
        response_text = llm_model.invoke(template.format(context=context, question=request.message))
        response = response_text.content

        # Parse and format citations in the response
        formatted_sources = []
        for result in search_results:
            # Extract the relevant part of the source path to create a human-readable citation
            clean_source = result["source"].replace("docs\\", "").replace("\\", " » ")
            formatted_sources.append({
                "title": result["title"],
                "formatted_source": clean_source,
                "raw_source": result["source"],
                "color": get_module_color(result["source"]),
                "id": result["id"]
            })

        # Add citations to the response
        if formatted_sources:
            response += "\n\n**Sources:**\n"
            for i, source in enumerate(formatted_sources[:2]):  # Show top 2 sources
                response += f"• [Source: {source['formatted_source']}]({source['raw_source']})\n"

        # Save to chat history
        db = next(get_db())
        try:
            chat_entry = ChatHistory(
                session_id=request.session_id,
                user_id=request.user_id or "anonymous",
                question=request.message,
                answer=response,
                sources=json.dumps(formatted_sources)
            )
            db.add(chat_entry)
            db.commit()
        finally:
            db.close()

        return ChatResponse(response=response, sources=formatted_sources)

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat-history")
async def get_chat_history(request: ChatHistoryRequest):
    """Get chat history for a session"""
    db = next(get_db())
    try:
        history = db.query(ChatHistory).filter(
            ChatHistory.session_id == request.session_id
        )

        if request.user_id:
            history = history.filter(ChatHistory.user_id == request.user_id)

        history = history.order_by(ChatHistory.timestamp).all()

        chat_messages = []
        for entry in history:
            chat_messages.append({
                "role": "user",
                "content": entry.question,
                "timestamp": entry.timestamp.isoformat()
            })
            chat_messages.append({
                "role": "assistant",
                "content": entry.answer,
                "timestamp": entry.timestamp.isoformat(),
                "sources": json.loads(entry.sources) if entry.sources else []
            })

        return {"messages": chat_messages}
    finally:
        db.close()

@app.post("/clear-chat")
async def clear_chat(request: ClearChatRequest):
    """Clear chat history for a session"""
    db = next(get_db())
    try:
        db.query(ChatHistory).filter(
            ChatHistory.session_id == request.session_id
        ).delete()
        db.commit()
        return {"message": "Chat history cleared successfully"}
    finally:
        db.close()

@app.post("/export-chat")
async def export_chat(request: ExportChatRequest):
    """Export chat history as markdown"""
    db = next(get_db())
    try:
        history = db.query(ChatHistory).filter(
            ChatHistory.session_id == request.session_id
        )

        if request.user_id:
            history = history.filter(ChatHistory.user_id == request.user_id)

        history = history.order_by(ChatHistory.timestamp).all()

        markdown_content = "# Chat History Export\n\n"
        markdown_content += f"Session ID: {request.session_id}\n"
        markdown_content += f"Export Date: {datetime.utcnow().isoformat()}\n\n"

        for entry in history:
            markdown_content += f"## User\n{entry.question}\n\n"
            markdown_content += f"## Assistant\n{entry.answer}\n\n"

        return {"markdown": markdown_content}
    finally:
        db.close()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Docusaurus RAG Chatbot API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)