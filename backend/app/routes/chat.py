"""
Chat endpoints for RAG chatbot
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import ChatRequest, ChatResponse, ChatHistoryItem
from ..models import ChatHistory
from ..rag_engine import rag_engine
from typing import List

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Main chat endpoint
    Processes user query and returns AI response with sources
    """
    try:
        # Generate response using RAG
        response_text, sources = rag_engine.generate_response(
            query=request.query,
            context=request.context
        )
        
        # Save to database if user is logged in
        if request.user_id:
            chat_record = ChatHistory(
                user_id=request.user_id,
                message=request.query,
                response=response_text,
                context=request.context,
                sources=sources
            )
            db.add(chat_record)
            db.commit()
        
        return ChatResponse(
            response=response_text,
            sources=sources
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[ChatHistoryItem])
async def get_chat_history(
    user_id: int,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Get chat history for a user
    """
    history = db.query(ChatHistory)\
        .filter(ChatHistory.user_id == user_id)\
        .order_by(ChatHistory.created_at.desc())\
        .limit(limit)\
        .all()
    
    return history