import os
import json
from typing import List, Dict
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
import streamlit as st

class DocusaurusRAG:
    def __init__(self, documents_path: str, openai_api_key: str = None):
        self.documents_path = documents_path
        self.embeddings = OpenAIEmbeddings(
            openai_api_key=openai_api_key or os.getenv("OPENAI_API_KEY")
        )
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            openai_api_key=openai_api_key or os.getenv("OPENAI_API_KEY"),
            temperature=0.1
        )
        self.vector_store = None
        self.qa_chain = None
        
        # Load documents
        self.documents = self.load_documents()
        
        # Process documents
        self.process_documents()
        
    def load_documents(self) -> List[Document]:
        """Load documents from JSON file"""
        with open(self.documents_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        documents = []
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
        
        return documents
    
    def process_documents(self):
        """Process documents: split and create vector store"""
        # Split documents
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=["\n\n", "\n", " ", ""]
        )
        
        split_docs = text_splitter.split_documents(self.documents)
        print(f"Split documents into {len(split_docs)} chunks")
        
        # Create vector store
        self.vector_store = FAISS.from_documents(split_docs, self.embeddings)
        
        # Create retrieval chain
        template = """Use the following pieces of context to answer the question at the end. 
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Keep the answer as concise as possible.
        
        {context}

        Question: {question}
        Helpful Answer:"""
        
        QA_CHAIN_PROMPT = PromptTemplate(
            input_variables=["context", "question"],
            template=template
        )
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(
                search_kwargs={"k": 4}  # Return top 4 most similar chunks
            ),
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
    
    def query(self, question: str) -> Dict:
        """Query the RAG system"""
        result = self.qa_chain({"query": question})
        
        return {
            "answer": result["result"],
            "source_documents": [doc.metadata for doc in result["source_documents"]]
        }

def main():
    st.title("📚 Docusaurus Book RAG Chatbot")
    st.write("Ask questions about your Docusaurus documentation")
    
    # Sidebar for API key and model selection
    with st.sidebar:
        st.header("Configuration")
        openai_api_key = st.text_input("OpenAI API Key", type="password")
        
        if not openai_api_key:
            st.warning("Please enter your OpenAI API key to continue")
    
    # Load documents if API key is provided
    if openai_api_key:
        try:
            # Initialize RAG system
            if 'rag_system' not in st.session_state:
                documents_path = r"D:\book hackthon\rag-chatbot\extracted_documents.json"
                st.session_state.rag_system = DocusaurusRAG(documents_path, openai_api_key)
                st.success("RAG system initialized successfully!")
        except Exception as e:
            st.error(f"Error initializing RAG system: {str(e)}")
            return
    
    # Chat interface
    if "messages" not in st.session_state:
        st.session_state.messages = []
    
    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    # Chat input
    if prompt := st.chat_input("Ask a question about the documentation..."):
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Get response from RAG system
        if 'rag_system' in st.session_state:
            with st.chat_message("assistant"):
                with st.spinner("Searching documentation and generating answer..."):
                    try:
                        response = st.session_state.rag_system.query(prompt)
                        answer = response["answer"]
                        
                        # Display answer
                        st.markdown(answer)
                        
                        # Show sources if available
                        if response["source_documents"]:
                            with st.expander("View sources"):
                                for i, source in enumerate(response["source_documents"][:2]):  # Show top 2 sources
                                    st.write(f"**Source {i+1}:** {source.get('title', 'Unknown title')}")
                                    st.write(f"File: {source.get('source', 'Unknown source')}")
                                    st.divider()
                        
                        # Add assistant response to chat history
                        st.session_state.messages.append({"role": "assistant", "content": answer})
                    except Exception as e:
                        error_msg = f"Error processing query: {str(e)}"
                        st.error(error_msg)
                        st.session_state.messages.append({"role": "assistant", "content": error_msg})
        else:
            st.error("RAG system not initialized. Please provide a valid OpenAI API key.")

if __name__ == "__main__":
    main()