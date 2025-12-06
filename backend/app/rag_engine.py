"""
RAG (Retrieval-Augmented Generation) Engine
Handles document ingestion, embedding, and retrieval
"""
import os
from typing import List, Dict
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from langchain.text_splitter import RecursiveCharacterTextSplitter
from .config import settings

class RAGEngine:
    def __init__(self):
        # Initialize OpenAI client
        self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Initialize Qdrant client
        self.qdrant_client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
        
        self.collection_name = settings.QDRANT_COLLECTION
        
        # Text splitter for chunking documents
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP,
            length_function=len,
        )
    
    def create_collection(self):
        """
        Create Qdrant collection if it doesn't exist
        """
        try:
            self.qdrant_client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=settings.EMBEDDING_DIMENSION,
                    distance=Distance.COSINE
                )
            )
            print(f"Collection '{self.collection_name}' created successfully")
        except Exception as e:
            print(f"Collection might already exist: {e}")
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding for given text using OpenAI
        """
        response = self.openai_client.embeddings.create(
            model=settings.EMBEDDING_MODEL,
            input=text
        )
        return response.data[0].embedding
    
    def ingest_documents(self, docs_path: str):
        """
        Ingest markdown documents from docs folder
        Splits into chunks, generates embeddings, stores in Qdrant
        """
        points = []
        point_id = 0
        
        # Walk through docs directory
        for root, dirs, files in os.walk(docs_path):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    
                    # Read file content
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Skip frontmatter
                    if content.startswith('---'):
                        parts = content.split('---', 2)
                        if len(parts) >= 3:
                            content = parts[2].strip()
                    
                    # Split into chunks
                    chunks = self.text_splitter.split_text(content)
                    
                    # Extract metadata
                    relative_path = os.path.relpath(file_path, docs_path)
                    module = relative_path.split(os.sep)[0] if os.sep in relative_path else "root"
                    
                    # Process each chunk
                    for i, chunk in enumerate(chunks):
                        # Generate embedding
                        embedding = self.generate_embedding(chunk)
                        
                        # Create point
                        point = PointStruct(
                            id=point_id,
                            vector=embedding,
                            payload={
                                "text": chunk,
                                "source_file": relative_path,
                                "module": module,
                                "chunk_index": i,
                                "file_name": file
                            }
                        )
                        
                        points.append(point)
                        point_id += 1
                        
                        print(f"Processed: {relative_path} - Chunk {i+1}/{len(chunks)}")
        
        # Upload to Qdrant in batches
        batch_size = 100
        for i in range(0, len(points), batch_size):
            batch = points[i:i+batch_size]
            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=batch
            )
            print(f"Uploaded batch {i//batch_size + 1}/{(len(points)-1)//batch_size + 1}")
        
        print(f"Ingestion complete! Total chunks: {len(points)}")
    
    def search_similar(self, query: str, top_k: int = 5) -> List[Dict]:
        """
        Search for similar chunks in Qdrant
        """
        # Generate query embedding
        query_embedding = self.generate_embedding(query)
        
        # Search in Qdrant
        search_results = self.qdrant_client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=top_k
        )
        
        # Format results
        results = []
        for hit in search_results:
            results.append({
                "text": hit.payload.get("text"),
                "source": hit.payload.get("source_file"),
                "module": hit.payload.get("module"),
                "score": hit.score
            })
        
        return results
    
    def generate_response(self, query: str, context: str = None) -> tuple[str, List[Dict]]:
        """
        Generate response using RAG
        
        Args:
            query: User's question
            context: Selected text (optional)
        
        Returns:
            (response_text, sources)
        """
        # Search for relevant chunks
        if context:
            # If user selected text, use it as additional context
            search_query = f"{context}\n\nQuestion: {query}"
        else:
            search_query = query
        
        similar_chunks = self.search_similar(search_query, top_k=settings.TOP_K_RESULTS)
        
        # Build context from retrieved chunks
        context_text = "\n\n".join([
            f"[Source: {chunk['source']}]\n{chunk['text']}"
            for chunk in similar_chunks
        ])
        
        # Build prompt
        system_prompt = """You are an expert tutor for Physical AI and Humanoid Robotics. 
You help students understand concepts from the textbook.

Rules:
1. Answer based on the provided context from the textbook
2. Be clear, concise, and educational
3. Use examples when helpful
4. If the context doesn't contain the answer, say so honestly
5. Reference specific concepts from the textbook when applicable"""

        user_prompt = f"""Context from the textbook:
{context_text}

Student's question: {query}

Please provide a helpful answer based on the context above."""
        
        # Generate response with OpenAI
        response = self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        answer = response.choices[0].message.content
        
        # Format sources
        sources = [
            {
                "source": chunk["source"],
                "module": chunk["module"],
                "score": round(chunk["score"], 3)
            }
            for chunk in similar_chunks
        ]
        
        return answer, sources

# Global RAG engine instance
rag_engine = RAGEngine()