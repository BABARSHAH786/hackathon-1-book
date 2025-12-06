"""
SQLAlchemy database models
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    
    # User background for personalization
    software_level = Column(String(50))  # beginner, intermediate, advanced
    hardware_level = Column(String(50))  # none, hobbyist, professional
    robotics_experience = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    chat_history = relationship("ChatHistory", back_populates="user")
    preferences = relationship("Preferences", back_populates="user", uselist=False)


class ChatHistory(Base):
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    context = Column(Text)  # Selected text if any
    sources = Column(JSON)  # Array of source files
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    # Relationships
    user = relationship("User", back_populates="chat_history")


class Preferences(Base):
    __tablename__ = "preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    
    personalization_enabled = Column(Boolean, default=False)
    preferred_language = Column(String(10), default="en")
    theme = Column(String(20), default="dark")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="preferences")
    