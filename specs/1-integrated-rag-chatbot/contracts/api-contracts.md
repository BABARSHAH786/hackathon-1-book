# API Contract: Integrated RAG Chatbot

## POST /ask

### Description
Process a user query about textbook content and return an AI-generated response based on the book's content.

### Request
```json
{
  "query": "How does ROS 2 work?",
  "selected_text": "optional text selected by user",
  "user_id": "123"
}
```

### Response (Success 200)
```json
{
  "answer": "ROS 2 uses a decentralized nodes-based architecture...",
  "sources": ["chapter_3_chunk_12", "chapter_3_chunk_7"],
  "query_id": "query-12345",
  "confidence_score": 0.85
}
```

### Response (Error 400)
```json
{
  "error": "Invalid query format",
  "code": "INVALID_QUERY"
}
```

### Response (Error 500)
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

## POST /embed

### Description
Regenerate embeddings for textbook content after updates.

### Request
```json
{
  "chapter": "Module 2 – Gazebo Simulation",
  "force_regen": false
}
```

### Response (Success 200)
```json
{
  "status": "Embeddings regenerated successfully",
  "chapter": "Module 2 – Gazebo Simulation",
  "chunks_processed": 45,
  "timestamp": "2025-12-09T10:00:00Z"
}
```

### Response (Error 400)
```json
{
  "error": "Invalid chapter identifier",
  "code": "INVALID_CHAPTER"
}
```

## GET /user/{user_id}

### Description
Retrieve user profile and background information.

### Response (Success 200)
```json
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "software_background": "intermediate",
  "hardware_background": "beginner",
  "personalization_preferences": {
    "max_code_examples": 2,
    "prefer_visual_explanation": true
  }
}
```

## PUT /user/{user_id}

### Description
Update user profile and background information.

### Request
```json
{
  "software_background": "advanced",
  "hardware_background": "intermediate",
  "personalization_preferences": {
    "max_code_examples": 3,
    "prefer_visual_explanation": false
  }
}
```

### Response (Success 200)
```json
{
  "status": "User profile updated successfully"
}
```

## POST /personalize-chapter

### Description
Generate a personalized version of a textbook chapter based on user's background.

### Request
```json
{
  "chapter_id": "ch_003",
  "user_id": "123",
  "complexity_level": "intermediate"
}
```

### Response (Success 200)
```json
{
  "chapter_id": "ch_003",
  "user_id": "123",
  "personalized_content": "Personalized chapter content...",
  "generation_timestamp": "2025-12-09T10:00:00Z"
}
```

## POST /translate-chapter

### Description
Generate a translated version of a textbook chapter (e.g., to Urdu).

### Request
```json
{
  "chapter_id": "ch_003",
  "target_language": "ur"
}
```

### Response (Success 200)
```json
{
  "chapter_id": "ch_003",
  "translated_content": "_urdu version of chapter_",
  "target_language": "ur",
  "translation_timestamp": "2025-12-09T10:00:00Z"
}
```