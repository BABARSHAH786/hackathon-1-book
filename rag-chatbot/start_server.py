import subprocess
import sys
import os
import threading
import time
import requests
from pathlib import Path

def install_dependencies():
    """Install required dependencies"""
    print("Installing required dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def start_backend():
    """Start the FastAPI backend server"""
    print("Starting backend server...")
    subprocess.run([sys.executable, "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"])

def check_backend_health():
    """Check if backend is running"""
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        return response.status_code == 200
    except:
        return False

def main():
    # Change to rag-chatbot directory
    os.chdir(os.path.join(os.path.dirname(__file__), "rag-chatbot"))
    
    # Install dependencies
    install_dependencies()
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend)
    backend_thread.daemon = True
    backend_thread.start()
    
    # Wait for backend to start
    print("Waiting for backend to start...")
    timeout = 30  # 30 seconds timeout
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        if check_backend_health():
            print("Backend is running!")
            break
        time.sleep(1)
    else:
        print("Timeout: Backend failed to start")
        return
    
    print("\n" + "="*60)
    print("Docusaurus RAG Chatbot is ready!")
    print("Backend API running on http://localhost:8000")
    print("Integrate the chatbot into your Docusaurus site by adding the plugin")
    print("="*60)
    
    # Keep the main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")

if __name__ == "__main__":
    main()