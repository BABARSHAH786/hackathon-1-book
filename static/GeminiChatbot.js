// WORKIN CODE
import { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, Send, X, User, Settings } from 'lucide-react';

// Gemini ChatBot Component
export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  // Settings State
  const [settings, setSettings] = useState({
    model: 'gemini-2.5-flash',
    temperature: 0.7,
    topP: 0.95,
    reasoning: 'none'
  });

  // Your Gemini API Key
  const API_KEY = 'env';

  // Creator Info
  const CREATOR_INFO = {
    name: "Leeza Sarwar",
    profiles: {
      github: "https://github.com/LeezaSarwar",
      linkedin: "https://www.linkedin.com/in/leeza-sarwar-21ab61339/",
      twitter: "https://x.com/LeezaSarwar",
      fiverr: "https://www.fiverr.com/leeza_sarwar",
      upwork: "https://www.upwork.com/freelancers/~018898ff181d6b8282"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        text: "Hello! I'm your AI assistant powered by Gemini. Ask me anything about Physical AI, Robotics, or this course!",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [isOpen]);

  useEffect(scrollToBottom, [messages]);

  const checkCreatorQuery = (message) => {
    const creatorKeywords = [
      'who created', 'who made', 'who built',
      'your creator', 'your developer', 'who is your maker',
      'tumhe kisne banaya', 'tumhara creator'
    ];
    return creatorKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const checkImageQuery = (message) => {
    const imageKeywords = ['create image', 'generate image', 'make image', 'draw', 'illustrate'];
    return imageKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Check for creator query
      if (checkCreatorQuery(userInput)) {
        const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟

You can connect with her on:
• GitHub: ${CREATOR_INFO.profiles.github}
• LinkedIn: ${CREATOR_INFO.profiles.linkedin}
• Twitter: ${CREATOR_INFO.profiles.twitter}
• Fiverr: ${CREATOR_INFO.profiles.fiverr}
• Upwork: ${CREATOR_INFO.profiles.upwork}`;

        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: creatorResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Check for image query
      if (checkImageQuery(userInput)) {
        const imageResponse = 'This is a text-based assistant. For image generation, you can use DALL-E or Midjourney!';
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: imageResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Modify prompt based on reasoning
      let modifiedMessage = userInput;
      if (settings.reasoning === 'chain') {
        modifiedMessage = `Use chain of thought: think step by step.\n\n${userInput}`;
      } else if (settings.reasoning === 'tree') {
        modifiedMessage = `Use tree of thought: explore multiple reasoning paths.\n\n${userInput}`;
      } else if (settings.reasoning === 'both') {
        modifiedMessage = `Use both chain of thought and tree of thought.\n\n${userInput}`;
      }

      // Call Gemini API
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: modifiedMessage }]
          }],
          generationConfig: {
            temperature: settings.temperature,
            topP: settings.topP,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated');
      }

      const botResponse = data.candidates[0].content.parts[0].text;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Error: ${err.message}. Please check your API key and internet connection.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          transition: 'transform 0.2s',
          color: 'white'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '400px',
          height: '600px',
          background: '#1f1f1f',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
              <Bot size={20} />
              Gemini AI Assistant
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white'
                }}
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div style={{
              background: '#2d2d2d',
              padding: '16px',
              borderBottom: '1px solid #3c4043',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Model
                </label>
                <select
                  value={settings.model}
                  onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#1f1f1f',
                    border: '1px solid #3c4043',
                    borderRadius: '6px',
                    color: '#e3e3e3',
                    fontSize: '14px'
                  }}
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Reasoning
                </label>
                <select
                  value={settings.reasoning}
                  onChange={(e) => setSettings({ ...settings, reasoning: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#1f1f1f',
                    border: '1px solid #3c4043',
                    borderRadius: '6px',
                    color: '#e3e3e3',
                    fontSize: '14px'
                  }}
                >
                  <option value="none">None</option>
                  <option value="chain">Chain of Thought</option>
                  <option value="tree">Tree of Thought</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: msg.sender === 'user' ? '#667eea' : '#2d2d2d',
                  color: '#e3e3e3',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.7 }}>
                    {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span style={{ fontSize: '11px' }}>{msg.timestamp}</span>
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', gap: '4px', padding: '12px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#667eea',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out'
                }}></span>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#667eea',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.16s'
                }}></span>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#667eea',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.32s'
                }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            background: '#2d2d2d',
            borderTop: '1px solid #3c4043',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              
              placeholder="Ask me anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px',
                background: '#1f1f1f',
                border: '1px solid #3c4043',
                borderRadius: '8px',
                color: '#e3e3e3',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                opacity: isLoading || !input.trim() ? 0.5 : 1
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}







