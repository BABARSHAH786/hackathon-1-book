"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Chat Schemas
class ChatRequest(BaseModel):
    query: str
    user_id: Optional[int] = None
    context: Optional[str] = None  # For text selection Q&A

class ChatResponse(BaseModel):
    response: str
    sources: List[dict]
    
class ChatHistoryItem(BaseModel):
    id: int
    message: str
    response: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    software_level: str
    hardware_level: str
    robotics_experience: bool

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    software_level: str
    hardware_level: str
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str