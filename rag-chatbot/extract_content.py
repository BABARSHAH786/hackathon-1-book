import os
import re
from typing import List, Dict
import json
from bs4 import BeautifulSoup

def extract_markdown_content_from_build(build_path: str) -> List[Dict[str, str]]:
    """
    Extract content from Docusaurus build directory
    """
    documents = []
    
    for root, dirs, files in os.walk(build_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Parse HTML to extract text content
                soup = BeautifulSoup(content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style"]):
                    script.decompose()
                
                # Extract the main content (in Docusaurus, it's typically in specific classes)
                main_content = (
                    soup.find('main') or
                    soup.find('article') or
                    soup.find(class_='container') or
                    soup.find(class_='theme-doc-markdown') or
                    soup.find(class_='docRoot_UBD9') or
                    soup.find(class_='docItemContainer_Djhp')
                )

                # If we can't find with the main tag, try to find content by class
                if not main_content:
                    content_div = soup.find(class_='markdown')
                    if content_div:
                        main_content = content_div
                    else:
                        # If still not found, use the body
                        main_content = soup.find('body')

                if main_content:
                    # Remove navigation, sidebar, and other non-content elements
                    for element in main_content.find_all(['nav', 'aside', 'header', 'footer', 'script', 'style']):
                        element.decompose()

                    text = main_content.get_text()

                    # Clean up the text
                    lines = (line.strip() for line in text.splitlines())
                    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                    text = ' '.join(chunk for chunk in chunks if chunk)

                    # Remove excessive whitespace
                    import re
                    text = re.sub(r'\s+', ' ', text).strip()
                    
                    # Get the relative path as document ID
                    rel_path = os.path.relpath(file_path, build_path)
                    
                    documents.append({
                        'id': rel_path,
                        'content': text,
                        'source': rel_path,
                        'title': extract_title_from_html(content) or rel_path
                    })
    
    return documents

def extract_title_from_html(html_content: str) -> str:
    """
    Extract title from HTML content
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    title_tag = soup.find('title')
    if title_tag:
        return title_tag.get_text().strip()
    
    # Look for h1 tags which might contain the title
    h1_tag = soup.find('h1')
    if h1_tag:
        return h1_tag.get_text().strip()
        
    return "Untitled"

def save_documents_to_json(documents: List[Dict], output_path: str):
    """
    Save documents to a JSON file
    """
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(documents, f, ensure_ascii=False, indent=2)


def load_documents_from_json(input_path: str) -> List[Dict]:
    """
    Load documents from a JSON file
    """
    with open(input_path, 'r', encoding='utf-8') as f:
        return json.load(f)

if __name__ == "__main__":
    # Path to your Docusaurus build directory
    build_path = r"D:\book hackthon\my-book\build"
    output_path = r"D:\book hackthon\rag-chatbot\extracted_documents.json"
    
    print("Extracting content from Docusaurus build...")
    documents = extract_markdown_content_from_build(build_path)
    
    print(f"Extracted {len(documents)} documents")
    
    # Save to JSON file
    save_documents_to_json(documents, output_path)
    print(f"Documents saved to {output_path}")
    
    # Print first document as sample
    if documents:
        print("\nSample document:")
        print(f"ID: {documents[0]['id']}")
        print(f"Title: {documents[0]['title']}")
        print(f"Content preview: {documents[0]['content'][:200]}...")