"""
Script to ingest documents into Qdrant
Run this once after setting up Qdrant
"""
import sys
sys.path.append('.')

from app.rag_engine import rag_engine

if __name__ == "__main__":
    print("🔄 Starting document ingestion...")
    
    # Path to your Docusaurus docs folder
    docs_path = "../my-book/docs"
    
    # Create collection
    rag_engine.create_collection()
    
    # Ingest documents
    rag_engine.ingest_documents(docs_path)
    
    print("✅ Document ingestion complete!")