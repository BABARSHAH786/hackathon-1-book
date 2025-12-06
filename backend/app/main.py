"""
Main FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routes import chat
from .rag_engine import rag_engine

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Physical AI Textbook API",
    description="RAG Chatbot API for Physical AI & Humanoid Robotics Textbook",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router)

@app.on_event("startup")
async def startup_event():
    """
    Run on application startup
    """
    print("🚀 Starting Physical AI Textbook API...")
    print(f"📚 Qdrant Collection: {settings.QDRANT_COLLECTION}")
    
    # Create Qdrant collection if needed
    try:
        rag_engine.create_collection()
    except Exception as e:
        print(f"Collection setup: {e}")

@app.get("/")
async def root():
    return {
        "message": "Physical AI Textbook API",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run with: uvicorn app.main:app --reload