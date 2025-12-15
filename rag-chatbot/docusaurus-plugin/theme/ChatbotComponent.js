import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
  const { colorMode } = useColorMode();
  const [isClient, setIsClient] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);
    const storedSessionId = localStorage.getItem('chat-session-id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat-session-id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    if (isClient) {
      scrollToBottom();
    }
  }, [messages, isClient]);

  // Handle text selection
  useEffect(() => {
    if (!isClient) return;

    const handleSelection = () => {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 0) {
        setSelectedText(selectedText);
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, [isClient]);

  // Show floating button when text is selected
  useEffect(() => {
    if (selectedText && isClient) {
      showFloatingButton();
    }
  }, [selectedText, isClient]);

  const showFloatingButton = () => {
    // Create or update floating button
    let floatingBtn = document.getElementById('text-selection-chat-btn');
    
    if (!floatingBtn) {
      floatingBtn = document.createElement('div');
      floatingBtn.id = 'text-selection-chat-btn';
      floatingBtn.innerHTML = '💬 Ask about selection';
      floatingBtn.style.cssText = `
        position: fixed;
        z-index: 10000;
        padding: 8px 12px;
        background: #1a73e8;
        color: white;
        border-radius: 16px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        user-select: none;
        transition: all 0.2s ease;
        max-width: 150px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
      
      floatingBtn.addEventListener('click', () => {
        handleFloatingButtonClick();
      });
      
      document.body.appendChild(floatingBtn);
    }
    
    // Position the button near the selection
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      floatingBtn.style.left = `${rect.left + window.scrollX + rect.width / 2 - 75}px`;
      floatingBtn.style.top = `${rect.top + window.scrollY - 40}px`;
      floatingBtn.style.display = 'block';
    }
  };

  const handleFloatingButtonClick = () => {
    if (selectedText) {
      setIsOpen(true);
      setInputValue(`"${selectedText}"`);
      setSelectedText('');
      
      // Hide the floating button
      const floatingBtn = document.getElementById('text-selection-chat-btn');
      if (floatingBtn) {
        floatingBtn.style.display = 'none';
      }
      
      // Clear selection
      window.getSelection().removeAllRanges();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !sessionId) return;

    const userMessage = { role: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: inputValue
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        sources: data.sources || [],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setShowConfirmation(true);
  };

  const confirmClearChat = async () => {
    if (!sessionId) return;
    
    try {
      await fetch('http://localhost:8000/clear-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });
      
      setMessages([]);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error clearing chat:', error);
      setShowConfirmation(false);
    }
  };

  const exportChat = async () => {
    if (!sessionId) return;
    
    try {
      const response = await fetch('http://localhost:8000/export-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });

      if (!response.ok) throw new Error('Export failed');

      const data = await response.json();
      
      // Create and download markdown file
      const blob = new Blob([data.markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chat:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatSources = (sources) => {
    if (!sources || sources.length === 0) return null;
    
    return (
      <div className="sources-container">
        <div className="sources-title">Sources:</div>
        {sources.map((source, index) => (
          <span
            key={index}
            className={`source-pill ${source.color}`}
            title={source.raw_source}
          >
            {source.formatted_source}
          </span>
        ))}
      </div>
    );
  };

  if (!isClient) {
    return null; // Don't render on server
  }

  return (
    <>
      {/* Floating button for text selection - handled by useEffect */}
      
      {/* Chat interface */}
      <div className={`chatbot-container ${isOpen ? 'open' : 'closed'} ${colorMode}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">📚 Book Assistant</div>
          <div className="chatbot-controls">
            <button 
              onClick={exportChat} 
              className="chat-btn export-btn"
              title="Export chat history"
            >
              📥
            </button>
            <button 
              onClick={clearChat} 
              className="chat-btn clear-btn"
              title="Clear chat"
            >
              🗑️
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="chat-btn close-btn"
              title="Close chat"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="chatbot-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h3>Hello! 👋</h3>
              <p>Ask me anything about the Physical AI & Humanoid Robotics book.</p>
              <p>Select text on any page and click the "Ask about selection" button to get context-aware answers!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {message.role === 'assistant' && '🤖 '}
                  {message.content}
                </div>
                {message.sources && formatSources(message.sources)}
              </div>
            ))
          )}
          {isLoading && (
            <div className="message assistant-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input">
          <textarea
            ref={chatInputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about the book..."
            rows={1}
            className="chat-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="send-btn"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
      
      {/* Floating chat button */}
      {!isOpen && (
        <button 
          className={`chat-float-btn ${colorMode}`}
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
      
      {/* Confirmation modal for clearing chat */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to clear the chat history?</p>
            <div className="modal-buttons">
              <button onClick={confirmClearChat} className="confirm-btn">Yes</button>
              <button onClick={() => setShowConfirmation(false)} className="cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;