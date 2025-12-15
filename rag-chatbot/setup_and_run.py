import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def extract_content():
    """Run the content extraction script"""
    print("Extracting content from Docusaurus build...")
    result = subprocess.run([sys.executable, "extract_content.py"], capture_output=True, text=True)
    
    if result.returncode != 0:
        print("Error extracting content:")
        print(result.stderr)
        return False
    else:
        print("Content extraction completed successfully!")
        print(result.stdout)
        return True

def run_chatbot():
    """Run the RAG chatbot"""
    print("Starting RAG chatbot...")
    subprocess.run([sys.executable, "-m", "streamlit", "run", "rag_chatbot.py", "--server.port", "8501"])

if __name__ == "__main__":
    print("Setting up Docusaurus RAG Chatbot...")
    
    # Install requirements
    install_requirements()
    
    # Extract content
    if extract_content():
        # Run chatbot
        run_chatbot()
    else:
        print("Failed to extract content. Please check the extract_content.py script.")