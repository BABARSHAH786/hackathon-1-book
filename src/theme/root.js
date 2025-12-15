
// working code with all page chatbot working
// import React, { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X, User, Settings } from 'lucide-react';

// // ==================== GEMINI CHATBOT COMPONENT ====================
// function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const messagesEndRef = useRef(null);

//   const [settings, setSettings] = useState({
//     model: 'gemini-2.5-flash',
//     temperature: 0.7,
//     topP: 0.95,
//     reasoning: 'none'
//   });

//   const API_KEY = 'AIzaSyDedZHxU__inYefA6yLo8fEZYNy0hX8yxQ';

//   const CREATOR_INFO = {
//     name: "Leeza Sarwar",
//     profiles: {
//       github: "https://github.com/LeezaSarwar",
//       linkedin: "https://www.linkedin.com/in/leeza-sarwar-21ab61339/",
//       twitter: "https://x.com/LeezaSarwar",
//       fiverr: "https://www.fiverr.com/leeza_sarwar",
//       upwork: "https://www.upwork.com/freelancers/~018898ff181d6b8282"
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Hello! I'm your AI assistant powered by Gemini 🤖 Ask me anything about Physical AI, Robotics, or this course!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen]);

//   useEffect(scrollToBottom, [messages]);

//   const checkCreatorQuery = (message) => {
//     const creatorKeywords = ['who created', 'who made', 'your creator', 'your developer'];
//     return creatorKeywords.some(keyword => message.toLowerCase().includes(keyword));
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMsg = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages(prev => [...prev, userMsg]);
//     const userInput = input;
//     setInput('');
//     setIsLoading(true);

//     try {
//       if (checkCreatorQuery(userInput)) {
//         const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟\n\nConnect with her:\n• GitHub: ${CREATOR_INFO.profiles.github}\n• LinkedIn: ${CREATOR_INFO.profiles.linkedin}`;
//         setTimeout(() => {
//           setMessages(prev => [...prev, {
//             id: Date.now() + 1,
//             text: creatorResponse,
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//           }]);
//           setIsLoading(false);
//         }, 500);
//         return;
//       }

//       let modifiedMessage = userInput;
//       if (settings.reasoning === 'chain') {
//         modifiedMessage = `Think step by step:\n\n${userInput}`;
//       }

//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ role: 'user', parts: [{ text: modifiedMessage }] }],
//           generationConfig: {
//             temperature: settings.temperature,
//             topP: settings.topP,
//             maxOutputTokens: 2048,
//           }
//         })
//       });

//       if (!response.ok) throw new Error(`API Error: ${response.status}`);

//       const data = await response.json();
//       const botResponse = data.candidates[0].content.parts[0].text;

//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: botResponse,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);

//     } catch (err) {
//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: `Error: ${err.message}`,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: '60px',
//           height: '60px',
//           borderRadius: '50%',
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           border: 'none',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
//           transition: 'transform 0.2s',
//           color: 'white'
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//       >
//         {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           bottom: '80px',
//           right: '0',
//           width: '400px',
//           height: '600px',
//           background: 'var(--ifm-background-color)',
//           borderRadius: '16px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           border: '1px solid var(--ifm-color-emphasis-200)'
//         }}>
//           <div style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             padding: '16px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             color: 'white'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
//               <Bot size={20} />
//               Gemini AI Assistant
//             </div>
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <button
//                 onClick={() => setShowSettings(!showSettings)}
//                 style={{
//                   background: 'rgba(255,255,255,0.2)',
//                   border: 'none',
//                   borderRadius: '6px',
//                   padding: '6px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   color: 'white'
//                 }}
//               >
//                 <Settings size={16} />
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 style={{
//                   background: 'rgba(255,255,255,0.2)',
//                   border: 'none',
//                   borderRadius: '6px',
//                   padding: '6px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   color: 'white'
//                 }}
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>

//           {showSettings && (
//             <div style={{
//               background: 'var(--ifm-color-emphasis-100)',
//               padding: '16px',
//               borderBottom: '1px solid var(--ifm-color-emphasis-200)'
//             }}>
//               <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
//                 Model
//               </label>
//               <select
//                 value={settings.model}
//                 onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   background: 'var(--ifm-background-color)',
//                   border: '1px solid var(--ifm-color-emphasis-300)',
//                   borderRadius: '6px',
//                   color: 'var(--ifm-font-color-base)',
//                   marginBottom: '12px'
//                 }}
//               >
//                 <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
//                 <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
//               </select>

//               <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
//                 Temperature: {settings.temperature}
//               </label>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={settings.temperature}
//                 onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
//                 style={{ width: '100%' }}
//               />
//             </div>
//           )}

//           <div style={{
//             flex: 1,
//             overflowY: 'auto',
//             padding: '16px',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '12px'
//           }}>
//             {messages.map(msg => (
//               <div
//                 key={msg.id}
//                 style={{
//                   display: 'flex',
//                   justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
//                 }}
//               >
//                 <div style={{
//                   maxWidth: '80%',
//                   padding: '12px 16px',
//                   borderRadius: '12px',
//                   background: msg.sender === 'user' ? '#667eea' : 'var(--ifm-color-emphasis-200)',
//                   color: msg.sender === 'user' ? 'white' : 'var(--ifm-font-color-base)',
//                   fontSize: '14px',
//                   lineHeight: '1.5',
//                   whiteSpace: 'pre-wrap',
//                   wordBreak: 'break-word'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.7 }}>
//                     {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
//                     <span style={{ fontSize: '11px' }}>{msg.timestamp}</span>
//                   </div>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {isLoading && (
//               <div style={{ display: 'flex', gap: '4px', padding: '12px' }}>
//                 <span style={{
//                   width: '8px',
//                   height: '8px',
//                   background: '#667eea',
//                   borderRadius: '50%',
//                   animation: 'bounce 1.4s infinite ease-in-out'
//                 }}></span>
//                 <span style={{
//                   width: '8px',
//                   height: '8px',
//                   background: '#667eea',
//                   borderRadius: '50%',
//                   animation: 'bounce 1.4s infinite ease-in-out',
//                   animationDelay: '0.16s'
//                 }}></span>
//                 <span style={{
//                   width: '8px',
//                   height: '8px',
//                   background: '#667eea',
//                   borderRadius: '50%',
//                   animation: 'bounce 1.4s infinite ease-in-out',
//                   animationDelay: '0.32s'
//                 }}></span>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div style={{
//             padding: '16px',
//             background: 'var(--ifm-color-emphasis-100)',
//             borderTop: '1px solid var(--ifm-color-emphasis-200)',
//             display: 'flex',
//             gap: '8px'
//           }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '12px',
//                 background: 'var(--ifm-background-color)',
//                 border: '1px solid var(--ifm-color-emphasis-300)',
//                 borderRadius: '8px',
//                 color: 'var(--ifm-font-color-base)',
//                 fontSize: '14px',
//                 outline: 'none'
//               }}
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={isLoading || !input.trim()}
//               style={{
//                 padding: '12px 16px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 borderRadius: '8px',
//                 cursor: isLoading ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 color: 'white',
//                 opacity: isLoading || !input.trim() ? 0.5 : 1
//               }}
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes bounce {
//           0%, 80%, 100% { transform: scale(0); }
//           40% { transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

// // Root wrapper component
// export default function Root({ children }) {
//   return (
//     <>
//       {children}
//       <GeminiChatbot />
//     </>
//   );
// }







// import React, { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X, User, Settings, Copy, Sparkles } from 'lucide-react';





// // ==================== GEMINI CHATBOT WITH COPY-TO-ASK ====================
// function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showCopyNotification, setShowCopyNotification] = useState(false);
//   const messagesEndRef = useRef(null);

//   const [settings, setSettings] = useState({
//     model: 'gemini-2.5-flash',
//     temperature: 0.7,
//     topP: 0.95,
//     reasoning: 'none'
//   });

//   const API_KEY = 'AIzaSyDedZHxU__inYefA6yLo8fEZYNy0hX8yxQ';

//   const CREATOR_INFO = {
//     name: "Leeza Sarwar",
//     profiles: {
//       github: "https://github.com/LeezaSarwar",
//       linkedin: "https://www.linkedin.com/in/leeza-sarwar-21ab61339/",
//       twitter: "https://x.com/LeezaSarwar",
//       fiverr: "https://www.fiverr.com/leeza_sarwar",
//       upwork: "https://www.upwork.com/freelancers/~018898ff181d6b8282"
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // COPY EVENT LISTENER - MAGIC HAPPENS HERE!
//   useEffect(() => {
//     const handleCopy = async (e) => {
//       try {
//         const copiedText = window.getSelection().toString().trim();
        
//         if (copiedText && copiedText.length > 10) {
//           // Show notification
//           setShowCopyNotification(true);
//           setTimeout(() => setShowCopyNotification(false), 3000);
          
//           // Open chatbot and set input
//           setIsOpen(true);
//           setInput(`Explain this from the book:\n\n"${copiedText}"`);
          
//           // Optional: Auto-focus input field
//           setTimeout(() => {
//             const inputField = document.querySelector('input[placeholder*="Ask me anything"]');
//             if (inputField) {
//               inputField.focus();
//               inputField.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//             }
//           }, 300);
//         }
//       } catch (err) {
//         console.log('Copy handler error:', err);
//       }
//     };

//     document.addEventListener('copy', handleCopy);
    
//     return () => {
//       document.removeEventListener('copy', handleCopy);
//     };
//   }, []);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Hello! I'm your AI assistant powered by Gemini 🤖\n\n💡 Pro Tip: Copy any text from the book (Ctrl+C) and it will automatically appear here for explanation!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen]);

//   useEffect(scrollToBottom, [messages]);

//   const checkCreatorQuery = (message) => {
//     const creatorKeywords = ['who created', 'who made', 'your creator', 'your developer', 'tumhe kisne banaya'];
//     return creatorKeywords.some(keyword => message.toLowerCase().includes(keyword));
//   };

//   const handleSendMessage = async (customMessage = null) => {
//     const messageText = customMessage || input.trim();
//     if (!messageText || isLoading) return;

//     const userMsg = {
//       id: Date.now(),
//       text: messageText,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       if (checkCreatorQuery(messageText)) {
//         const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟\n\nConnect with her:\n• GitHub: ${CREATOR_INFO.profiles.github}\n• LinkedIn: ${CREATOR_INFO.profiles.linkedin}\n• Twitter: ${CREATOR_INFO.profiles.twitter}\n• Fiverr: ${CREATOR_INFO.profiles.fiverr}`;
//         setTimeout(() => {
//           setMessages(prev => [...prev, {
//             id: Date.now() + 1,
//             text: creatorResponse,
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//           }]);
//           setIsLoading(false);
//         }, 500);
//         return;
//       }

//       let modifiedMessage = messageText;
//       if (settings.reasoning === 'chain') {
//         modifiedMessage = `Think step by step:\n\n${messageText}`;
//       }

//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ role: 'user', parts: [{ text: modifiedMessage }] }],
//           generationConfig: {
//             temperature: settings.temperature,
//             topP: settings.topP,
//             maxOutputTokens: 2048,
//           }
//         })
//       });

//       if (!response.ok) throw new Error(`API Error: ${response.status}`);

//       const data = await response.json();
//       const botResponse = data.candidates[0].content.parts[0].text;

//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: botResponse,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);

//     } catch (err) {
//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: `Error: ${err.message}`,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <>
//       {/* Copy Notification */}
//       {showCopyNotification && (
//         <div style={{
//           position: 'fixed',
//           top: '20px',
//           right: '20px',
//           zIndex: 99999,
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           padding: '16px 24px',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(102, 126, 234, 0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '12px',
//           animation: 'slideInRight 0.3s ease-out',
//           fontWeight: '500',
//           fontSize: '14px'
//         }}>
//           <Sparkles size={20} />
//           Text copied! Check the chatbot 🎉
//         </div>
//       )}

//       {/* Chatbot */}
//       <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           style={{
//             width: '60px',
//             height: '60px',
//             borderRadius: '50%',
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
//             transition: 'transform 0.2s',
//             color: 'white',
//             position: 'relative'
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//         >
//           {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
//           {input && !isOpen && (
//             <span style={{
//               position: 'absolute',
//               top: '-5px',
//               right: '-5px',
//               width: '20px',
//               height: '20px',
//               background: '#ef4444',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '12px',
//               fontWeight: 'bold',
//               animation: 'pulse 2s infinite'
//             }}>
//               1
//             </span>
//           )}
//         </button>

//         {isOpen && (
//           <div style={{
//             position: 'absolute',
//             bottom: '80px',
//             right: '0',
//             width: '400px',
//             height: '600px',
//             background: 'var(--ifm-background-color)',
//             borderRadius: '16px',
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             border: '1px solid var(--ifm-color-emphasis-200)'
//           }}>
//             <div style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               padding: '16px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               color: 'white'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
//                 <Bot size={20} />
//                 Gemini AI Assistant
//               </div>
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 <button
//                   onClick={() => setShowSettings(!showSettings)}
//                   style={{
//                     background: 'rgba(255,255,255,0.2)',
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '6px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     color: 'white'
//                   }}
//                 >
//                   <Settings size={16} />
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   style={{
//                     background: 'rgba(255,255,255,0.2)',
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '6px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     color: 'white'
//                   }}
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             </div>

//             {showSettings && (
//               <div style={{
//                 background: 'var(--ifm-color-emphasis-100)',
//                 padding: '16px',
//                 borderBottom: '1px solid var(--ifm-color-emphasis-200)'
//               }}>
//                 <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
//                   Model
//                 </label>
//                 <select
//                   value={settings.model}
//                   onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px',
//                     background: 'var(--ifm-background-color)',
//                     border: '1px solid var(--ifm-color-emphasis-300)',
//                     borderRadius: '6px',
//                     color: 'var(--ifm-font-color-base)',
//                     marginBottom: '12px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash</option>
//                   <option value="gemini-2.5-pro">🧠 Gemini 2.5 Pro</option>
//                 </select>

//                 <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
//                   Temperature: {settings.temperature}
//                 </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={settings.temperature}
//                   onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
//                   style={{ width: '100%', cursor: 'pointer' }}
//                 />
//               </div>
//             )}

//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               padding: '16px',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px'
//             }}>
//               {messages.map(msg => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     display: 'flex',
//                     justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
//                   }}
//                 >
//                   <div style={{
//                     maxWidth: '80%',
//                     padding: '12px 16px',
//                     borderRadius: '12px',
//                     background: msg.sender === 'user' ? '#667eea' : 'var(--ifm-color-emphasis-200)',
//                     color: msg.sender === 'user' ? 'white' : 'var(--ifm-font-color-base)',
//                     fontSize: '14px',
//                     lineHeight: '1.5',
//                     whiteSpace: 'pre-wrap',
//                     wordBreak: 'break-word'
//                   }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.7 }}>
//                       {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
//                       <span style={{ fontSize: '11px' }}>{msg.timestamp}</span>
//                     </div>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}

//               {isLoading && (
//                 <div style={{ display: 'flex', gap: '4px', padding: '12px' }}>
//                   <span style={{
//                     width: '8px',
//                     height: '8px',
//                     background: '#667eea',
//                     borderRadius: '50%',
//                     animation: 'bounce 1.4s infinite ease-in-out'
//                   }}></span>
//                   <span style={{
//                     width: '8px',
//                     height: '8px',
//                     background: '#667eea',
//                     borderRadius: '50%',
//                     animation: 'bounce 1.4s infinite ease-in-out',
//                     animationDelay: '0.16s'
//                   }}></span>
//                   <span style={{
//                     width: '8px',
//                     height: '8px',
//                     background: '#667eea',
//                     borderRadius: '50%',
//                     animation: 'bounce 1.4s infinite ease-in-out',
//                     animationDelay: '0.32s'
//                   }}></span>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             <div style={{
//               padding: '16px',
//               background: 'var(--ifm-color-emphasis-100)',
//               borderTop: '1px solid var(--ifm-color-emphasis-200)',
//               display: 'flex',
//               gap: '8px'
//             }}>
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything... (or copy text from book)"
//                 disabled={isLoading}
//                 style={{
//                   flex: 1,
//                   padding: '12px',
//                   background: 'var(--ifm-background-color)',
//                   border: '1px solid var(--ifm-color-emphasis-300)',
//                   borderRadius: '8px',
//                   color: 'var(--ifm-font-color-base)',
//                   fontSize: '14px',
//                   outline: 'none'
//                 }}
//               />
//               <button
//                 onClick={() => handleSendMessage()}
//                 disabled={isLoading || !input.trim()}
//                 style={{
//                   padding: '12px 16px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: isLoading ? 'not-allowed' : 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   color: 'white',
//                   opacity: isLoading || !input.trim() ? 0.5 : 1
//                 }}
//               >
//                 <Send size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes bounce {
//           0%, 80%, 100% { transform: scale(0); }
//           40% { transform: scale(1); }
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.7; transform: scale(1.1); }
//         }
        
//         @keyframes slideInRight {
//           from { 
//             opacity: 0; 
//             transform: translateX(100px);
//           }
//           to { 
//             opacity: 1; 
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// // Root wrapper component
// export default function Root({ children }) {
//   return (
//     <>
//       {children}
//       <GeminiChatbot />
//     </>
//   );
// }






// import React, { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X, User, Settings, Sparkles } from 'lucide-react';

// function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [selectedText, setSelectedText] = useState('');
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
//   const messagesEndRef = useRef(null);

//   const [settings, setSettings] = useState({
//     model: 'gemini-2.5-flash',
//     temperature: 0.7,
//     topP: 0.95,
//     reasoning: 'none'
//   });

//   const API_KEY = 'AIzaSyDedZHxU__inYefA6yLo8fEZYNy0hX8yxQ';

//   const CREATOR_INFO = {
//     name: "Leeza Sarwar",
//     profiles: {
//       github: "https://github.com/LeezaSarwar",
//       linkedin: "https://www.linkedin.com/in/leeza-sarwar-21ab61339/",
//       twitter: "https://x.com/LeezaSarwar",
//       fiverr: "https://www.fiverr.com/leeza_sarwar",
//       upwork: "https://www.upwork.com/freelancers/~018898ff181d6b8282"
//     }
//   };

//   // SIMPLE TEXT SELECTION - GUARANTEED TO WORK
//   useEffect(() => {
//     let timeoutId;

//     const handleSelection = () => {
//       if (timeoutId) clearTimeout(timeoutId);
      
//       timeoutId = setTimeout(() => {
//         const sel = window.getSelection();
//         const txt = sel.toString().trim();
        
//         console.log('=== SELECTION DEBUG ===');
//         console.log('Text:', txt);
//         console.log('Length:', txt.length);
        
//         if (txt.length >= 10) {
//           try {
//             const range = sel.getRangeAt(0);
//             const rect = range.getBoundingClientRect();
            
//             console.log('Rectangle:', rect);
            
//             if (rect.width > 0 && rect.height > 0) {
//               const x = rect.left + rect.width / 2;
//               const y = rect.top + window.scrollY - 70;
              
//               console.log('Position:', { x, y });
//               console.log('Showing tooltip!');
              
//               setSelectedText(txt);
//               setTooltipPos({ x, y });
//               setShowTooltip(true);
//             }
//           } catch (e) {
//             console.error('Error:', e);
//           }
//         } else {
//           setShowTooltip(false);
//         }
//       }, 200);
//     };

//     const hideTooltip = (e) => {
//       const isTooltipClick = e.target.closest('.tooltip-button');
//       if (!isTooltipClick) {
//         setTimeout(() => {
//           const stillSelected = window.getSelection().toString().trim();
//           if (!stillSelected) {
//             setShowTooltip(false);
//           }
//         }, 100);
//       }
//     };

//     console.log('=== ATTACHING LISTENERS ===');
//     document.addEventListener('mouseup', handleSelection);
//     document.addEventListener('touchend', handleSelection);
//     document.addEventListener('mousedown', hideTooltip);

//     return () => {
//       console.log('=== REMOVING LISTENERS ===');
//       if (timeoutId) clearTimeout(timeoutId);
//       document.removeEventListener('mouseup', handleSelection);
//       document.removeEventListener('touchend', handleSelection);
//       document.removeEventListener('mousedown', hideTooltip);
//     };
//   }, []);

//   const handleAskAI = () => {
//     console.log('Ask AI clicked!');
//     setShowTooltip(false);
//     setIsOpen(true);
//     setInput(`Explain this from the book:\n\n"${selectedText}"`);
//     window.getSelection().removeAllRanges();
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Hello! I'm your AI assistant 🤖\n\nSelect any text and click 'Ask with AI' to get explanations!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen]);

//   useEffect(scrollToBottom, [messages]);

//   const checkCreatorQuery = (message) => {
//     const keywords = ['who created', 'who made', 'your creator', 'your developer', 'tumhe kisne banaya'];
//     return keywords.some(k => message.toLowerCase().includes(k));
//   };

//   const handleSendMessage = async (customMessage = null) => {
//     const messageText = customMessage || input.trim();
//     if (!messageText || isLoading) return;

//     const userMsg = {
//       id: Date.now(),
//       text: messageText,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       if (checkCreatorQuery(messageText)) {
//         const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟\n\nConnect with her:\n• GitHub: ${CREATOR_INFO.profiles.github}\n• LinkedIn: ${CREATOR_INFO.profiles.linkedin}`;
//         setTimeout(() => {
//           setMessages(prev => [...prev, {
//             id: Date.now() + 1,
//             text: creatorResponse,
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//           }]);
//           setIsLoading(false);
//         }, 500);
//         return;
//       }

//       let modifiedMessage = messageText;
//       if (settings.reasoning === 'chain') {
//         modifiedMessage = `Think step by step:\n\n${messageText}`;
//       }

//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ role: 'user', parts: [{ text: modifiedMessage }] }],
//           generationConfig: {
//             temperature: settings.temperature,
//             topP: settings.topP,
//             maxOutputTokens: 2048,
//           }
//         })
//       });

//       if (!response.ok) throw new Error(`API Error: ${response.status}`);

//       const data = await response.json();
//       const botResponse = data.candidates[0].content.parts[0].text;

//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: botResponse,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);

//     } catch (err) {
//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: `Error: ${err.message}`,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   console.log('=== RENDER STATE ===');
//   console.log('showTooltip:', showTooltip);
//   console.log('selectedText:', selectedText);
//   console.log('tooltipPos:', tooltipPos);

//   return (
//     <>
//       {/* TOOLTIP - ALWAYS CHECK CONSOLE */}
//       {showTooltip && (
//         <div
//           style={{
//             position: 'fixed',
//             left: `${tooltipPos.x}px`,
//             top: `${tooltipPos.y}px`,
//             transform: 'translate(-50%, 0)',
//             zIndex: 999999,
//             pointerEvents: 'auto'
//           }}
//         >
//           <button
//             className="tooltip-button"
//             onClick={handleAskAI}
//             style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               padding: '12px 24px',
//               borderRadius: '12px',
//               fontSize: '14px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               boxShadow: '0 8px 24px rgba(102, 126, 234, 0.7)',
//               transition: 'all 0.2s',
//               animation: 'bounce 0.5s ease-out'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//           >
//             <Sparkles size={18} />
//             Ask with AI
//           </button>
//         </div>
//       )}

//       {/* CHATBOT */}
//       <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           style={{
//             width: '60px',
//             height: '60px',
//             borderRadius: '50%',
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
//             transition: 'transform 0.2s',
//             color: 'white'
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//         >
//           {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
//         </button>

//         {isOpen && (
//           <div style={{
//             position: 'absolute',
//             bottom: '80px',
//             right: '0',
//             width: '400px',
//             height: '600px',
//             background: 'var(--ifm-background-color)',
//             borderRadius: '16px',
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             border: '1px solid var(--ifm-color-emphasis-200)'
//           }}>
//             <div style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               padding: '16px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               color: 'white'
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
//                 <Bot size={20} />
//                 Gemini AI Assistant
//               </div>
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 <button
//                   onClick={() => setShowSettings(!showSettings)}
//                   style={{
//                     background: 'rgba(255,255,255,0.2)',
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '6px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     color: 'white'
//                   }}
//                 >
//                   <Settings size={16} />
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   style={{
//                     background: 'rgba(255,255,255,0.2)',
//                     border: 'none',
//                     borderRadius: '6px',
//                     padding: '6px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     color: 'white'
//                   }}
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             </div>

//             {showSettings && (
//               <div style={{
//                 background: 'var(--ifm-color-emphasis-100)',
//                 padding: '16px',
//                 borderBottom: '1px solid var(--ifm-color-emphasis-200)'
//               }}>
//                 <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
//                   Model
//                 </label>
//                 <select
//                   value={settings.model}
//                   onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px',
//                     background: 'var(--ifm-background-color)',
//                     border: '1px solid var(--ifm-color-emphasis-300)',
//                     borderRadius: '6px',
//                     color: 'var(--ifm-font-color-base)',
//                     marginBottom: '12px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash</option>
//                   <option value="gemini-2.5-pro">🧠 Gemini 2.5 Pro</option>
//                 </select>

//                 <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
//                   Temperature: {settings.temperature}
//                 </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={settings.temperature}
//                   onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
//                   style={{ width: '100%', cursor: 'pointer' }}
//                 />
//               </div>
//             )}

//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               padding: '16px',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px'
//             }}>
//               {messages.map(msg => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     display: 'flex',
//                     justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
//                   }}
//                 >
//                   <div style={{
//                     maxWidth: '80%',
//                     padding: '12px 16px',
//                     borderRadius: '12px',
//                     background: msg.sender === 'user' ? '#667eea' : 'var(--ifm-color-emphasis-200)',
//                     color: msg.sender === 'user' ? 'white' : 'var(--ifm-font-color-base)',
//                     fontSize: '14px',
//                     lineHeight: '1.5',
//                     whiteSpace: 'pre-wrap',
//                     wordBreak: 'break-word'
//                   }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.7 }}>
//                       {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
//                       <span style={{ fontSize: '11px' }}>{msg.timestamp}</span>
//                     </div>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}

//               {isLoading && (
//                 <div style={{ display: 'flex', gap: '4px', padding: '12px' }}>
//                   <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
//                   <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.16s' }}></span>
//                   <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.32s' }}></span>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             <div style={{
//               padding: '16px',
//               background: 'var(--ifm-color-emphasis-100)',
//               borderTop: '1px solid var(--ifm-color-emphasis-200)',
//               display: 'flex',
//               gap: '8px'
//             }}>
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything..."
//                 disabled={isLoading}
//                 style={{
//                   flex: 1,
//                   padding: '12px',
//                   background: 'var(--ifm-background-color)',
//                   border: '1px solid var(--ifm-color-emphasis-300)',
//                   borderRadius: '8px',
//                   color: 'var(--ifm-font-color-base)',
//                   fontSize: '14px',
//                   outline: 'none'
//                 }}
//               />
//               <button
//                 onClick={() => handleSendMessage()}
//                 disabled={isLoading || !input.trim()}
//                 style={{
//                   padding: '12px 16px',
//                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: isLoading ? 'not-allowed' : 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   color: 'white',
//                   opacity: isLoading || !input.trim() ? 0.5 : 1
//                 }}
//               >
//                 <Send size={18} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes bounce {
//           0%, 80%, 100% { transform: scale(0); }
//           40% { transform: scale(1); }
//         }
//       `}</style>
//     </>
//   );
// }

// export default function Root({ children }) {
//   console.log('=== ROOT COMPONENT MOUNTED ===');
//   return (
//     <>
//       {children}
//       <GeminiChatbot />
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, Send, X, User, Settings, Sparkles } from 'lucide-react';

function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

  const [settings, setSettings] = useState({
    model: 'gemini-2.5-flash',
    temperature: 0.7,
    topP: 0.95,
    reasoning: 'none'
  });

  const API_KEY = 'AIzaSyDedZHxU__inYefA6yLo8fEZYNy0hX8yxQ';

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

  // SIMPLE TEXT SELECTION - GUARANTEED TO WORK
  useEffect(() => {
    let timeoutId;

    const handleSelection = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const sel = window.getSelection();
        const txt = sel.toString().trim();
        
        console.log('=== SELECTION DEBUG ===');
        console.log('Text:', txt);
        console.log('Length:', txt.length);
        
        if (txt.length >= 10) {
          try {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            console.log('Rectangle:', rect);
            
            if (rect.width > 0 && rect.height > 0) {
              const x = rect.left + rect.width / 2;
              const y = rect.top + window.scrollY - 70;
              
              console.log('Position:', { x, y });
              console.log('Showing tooltip!');
              
              setSelectedText(txt);
              setTooltipPos({ x, y });
              setShowTooltip(true);
            }
          } catch (e) {
            console.error('Error:', e);
          }
        } else {
          setShowTooltip(false);
        }
      }, 200);
    };

    const hideTooltip = (e) => {
      const isTooltipClick = e.target.closest('.tooltip-button');
      if (!isTooltipClick) {
        setTimeout(() => {
          const stillSelected = window.getSelection().toString().trim();
          if (!stillSelected) {
            setShowTooltip(false);
          }
        }, 100);
      }
    };

    console.log('=== ATTACHING LISTENERS ===');
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    document.addEventListener('mousedown', hideTooltip);

    return () => {
      console.log('=== REMOVING LISTENERS ===');
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
      document.removeEventListener('mousedown', hideTooltip);
    };
  }, []);

  const handleAskAI = () => {
    console.log('Ask AI clicked!');
    setShowTooltip(false);
    setIsOpen(true);
    setInput(`Explain this from the book:\n\n"${selectedText}"`);
    window.getSelection().removeAllRanges();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        text: "Hello! I'm your AI assistant 🤖\n\nSelect any text and click 'Ask with AI' to get explanations!",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [isOpen]);

  useEffect(scrollToBottom, [messages]);

  const checkCreatorQuery = (message) => {
    const keywords = ['who created', 'who made', 'your creator', 'your developer', 'tumhe kisne banaya'];
    return keywords.some(k => message.toLowerCase().includes(k));
  };

  const handleSendMessage = async (customMessage = null) => {
    const messageText = customMessage || input.trim();
    if (!messageText || isLoading) return;

    const userMsg = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (checkCreatorQuery(messageText)) {
        const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟\n\nConnect with her:\n• GitHub: ${CREATOR_INFO.profiles.github}\n• LinkedIn: ${CREATOR_INFO.profiles.linkedin}`;
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

      let modifiedMessage = messageText;
      if (settings.reasoning === 'chain') {
        modifiedMessage = `Think step by step:\n\n${messageText}`;
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: modifiedMessage }] }],
          generationConfig: {
            temperature: settings.temperature,
            topP: settings.topP,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
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
        text: `Error: ${err.message}`,
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

  console.log('=== RENDER STATE ===');
  console.log('showTooltip:', showTooltip);
  console.log('selectedText:', selectedText);
  console.log('tooltipPos:', tooltipPos);

  return (
    <>
      {/* TOOLTIP - ALWAYS CHECK CONSOLE */}
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, 0)',
            zIndex: 999999,
            pointerEvents: 'auto'
          }}
        >
          <button
            className="tooltip-button"
            onClick={handleAskAI}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.7)',
              transition: 'all 0.2s',
              animation: 'bounce 0.5s ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Sparkles size={18} />
            Ask with AI
          </button>
        </div>
      )}

      {/* CHATBOT */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
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

        {isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            width: '400px',
            height: '600px',
            background: 'var(--ifm-background-color)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--ifm-color-emphasis-200)'
          }}>
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
                    color: 'white'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {showSettings && (
              <div style={{
                background: 'var(--ifm-color-emphasis-100)',
                padding: '16px',
                borderBottom: '1px solid var(--ifm-color-emphasis-200)'
              }}>
                <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Model
                </label>
                <select
                  value={settings.model}
                  onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'var(--ifm-background-color)',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    color: 'var(--ifm-font-color-base)',
                    marginBottom: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash</option>
                  <option value="gemini-2.5-pro">🧠 Gemini 2.5 Pro</option>
                </select>

                <label style={{ color: 'var(--ifm-font-color-base)', fontSize: '12px', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                  Temperature: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            )}

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
                    background: msg.sender === 'user' ? '#667eea' : 'var(--ifm-color-emphasis-200)',
                    color: msg.sender === 'user' ? 'white' : 'var(--ifm-font-color-base)',
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
                  <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                  <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.16s' }}></span>
                  <span style={{ width: '8px', height: '8px', background: '#667eea', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.32s' }}></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              padding: '16px',
              background: 'var(--ifm-color-emphasis-100)',
              borderTop: '1px solid var(--ifm-color-emphasis-200)',
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
                  background: 'var(--ifm-background-color)',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '8px',
                  color: 'var(--ifm-font-color-base)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => handleSendMessage()}
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
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}

export default function Root({ children }) {
  console.log('=== ROOT COMPONENT MOUNTED ===');
  return (
    <>
      {children}
      <GeminiChatbot />
    </>
  );
}