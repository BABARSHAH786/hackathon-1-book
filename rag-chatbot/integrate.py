import os
import shutil
import json
from pathlib import Path

def integrate_chatbot():
    """Integrate the RAG chatbot with the Docusaurus book"""
    print("Integrating RAG chatbot with Docusaurus book...")
    
    # Ensure the plugin is in the correct location
    plugin_src = Path("rag-chatbot/docusaurus-plugin")
    plugin_dest = Path("my-book/plugins/docusaurus-plugin-rag-chatbot")
    
    # Create plugins directory if it doesn't exist
    plugin_dest.parent.mkdir(exist_ok=True)
    
    # Copy the plugin
    if plugin_dest.exists():
        shutil.rmtree(plugin_dest)
    shutil.copytree(plugin_src, plugin_dest)
    
    print(f"Plugin copied to {plugin_dest}")
    
    # Update package.json to include the plugin
    package_json_path = Path("my-book/package.json")
    if package_json_path.exists():
        with open(package_json_path, 'r') as f:
            package_json = json.load(f)
        
        # Add the plugin to dependencies if not already there
        if "docusaurus-plugin-rag-chatbot" not in package_json.get("dependencies", {}):
            package_json.setdefault("dependencies", {})["docusaurus-plugin-rag-chatbot"] = "file:../rag-chatbot/docusaurus-plugin"
        
        with open(package_json_path, 'w') as f:
            json.dump(package_json, f, indent=2)
        
        print("Updated package.json with plugin dependency")
    
    # Make sure the backend is set up
    os.makedirs("rag-chatbot/backend", exist_ok=True)
    
    print("\nIntegration complete!")
    print("To use the chatbot:")
    print("1. Start the backend: python -m uvicorn rag-chatbot.backend.main:app --host 0.0.0.0 --port 8000")
    print("2. In a new terminal, build and start your Docusaurus site: cd my-book && npm run build && npm run serve")
    print("3. Visit your site and use the chatbot in the bottom-right corner")

def setup_env():
    """Create environment file with default settings"""
    env_content = """# RAG Chatbot Environment Variables
GEMINI_API_KEY=your-gemini-api-key-here
QDRANT_URL=localhost
QDRANT_API_KEY=your-qdrant-api-key-here
DATABASE_URL=postgresql://username:password@localhost/chat_history
"""
    
    with open("rag-chatbot/.env", "w") as f:
        f.write(env_content)
    
    print("Created .env file with default environment variables")
    print("Remember to add your actual API keys!")

if __name__ == "__main__":
    os.chdir("..")  # Change to the main project directory
    
    setup_env()
    integrate_chatbot()