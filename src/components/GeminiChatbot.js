// WORKIN CODE
// import { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X, User, Settings } from 'lucide-react';

// // Gemini ChatBot Component
// export default function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Settings State
//   const [settings, setSettings] = useState({
//     model: 'gemini-2.5-flash',
//     temperature: 0.7,
//     topP: 0.95,
//     reasoning: 'none'
//   });

//   // Your Gemini API Key
//   const API_KEY = 'AIzaSyATmOqR4xt0bX_GRHyTjmg6drjvUPFl2Ag';

//   // Creator Info
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
//         text: "Hello! I'm your AI assistant powered by Gemini. Ask me anything about Physical AI, Robotics, or this course!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen]);

//   useEffect(scrollToBottom, [messages]);

//   const checkCreatorQuery = (message) => {
//     const creatorKeywords = [
//       'who created', 'who made', 'who built',
//       'your creator', 'your developer', 'who is your maker',
//       'tumhe kisne banaya', 'tumhara creator'
//     ];
//     return creatorKeywords.some(keyword => message.toLowerCase().includes(keyword));
//   };

//   const checkImageQuery = (message) => {
//     const imageKeywords = ['create image', 'generate image', 'make image', 'draw', 'illustrate'];
//     return imageKeywords.some(keyword => message.toLowerCase().includes(keyword));
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
//       // Check for creator query
//       if (checkCreatorQuery(userInput)) {
//         const creatorResponse = `I was created by ${CREATOR_INFO.name}! 🌟

// You can connect with her on:
// • GitHub: ${CREATOR_INFO.profiles.github}
// • LinkedIn: ${CREATOR_INFO.profiles.linkedin}
// • Twitter: ${CREATOR_INFO.profiles.twitter}
// • Fiverr: ${CREATOR_INFO.profiles.fiverr}
// • Upwork: ${CREATOR_INFO.profiles.upwork}`;

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

//       // Check for image query
//       if (checkImageQuery(userInput)) {
//         const imageResponse = 'This is a text-based assistant. For image generation, you can use DALL-E or Midjourney!';
//         setTimeout(() => {
//           setMessages(prev => [...prev, {
//             id: Date.now() + 1,
//             text: imageResponse,
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//           }]);
//           setIsLoading(false);
//         }, 500);
//         return;
//       }

//       // Modify prompt based on reasoning
//       let modifiedMessage = userInput;
//       if (settings.reasoning === 'chain') {
//         modifiedMessage = `Use chain of thought: think step by step.\n\n${userInput}`;
//       } else if (settings.reasoning === 'tree') {
//         modifiedMessage = `Use tree of thought: explore multiple reasoning paths.\n\n${userInput}`;
//       } else if (settings.reasoning === 'both') {
//         modifiedMessage = `Use both chain of thought and tree of thought.\n\n${userInput}`;
//       }

//       // Call Gemini API
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{
//             role: 'user',
//             parts: [{ text: modifiedMessage }]
//           }],
//           generationConfig: {
//             temperature: settings.temperature,
//             topP: settings.topP,
//             maxOutputTokens: 2048,
//           }
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();

//       if (!data.candidates || data.candidates.length === 0) {
//         throw new Error('No response generated');
//       }

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
//         text: `Error: ${err.message}. Please check your API key and internet connection.`,
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
//     <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
//       {/* Chat Button */}
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

//       {/* Chat Window */}
//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           bottom: '80px',
//           right: '0',
//           width: '400px',
//           height: '600px',
//           background: '#1f1f1f',
//           borderRadius: '16px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden'
//         }}>
//           {/* Header */}
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
//                   alignItems: 'center',
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
//                   alignItems: 'center',
//                   color: 'white'
//                 }}
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Settings Panel */}
//           {showSettings && (
//             <div style={{
//               background: '#2d2d2d',
//               padding: '16px',
//               borderBottom: '1px solid #3c4043',
//               maxHeight: '200px',
//               overflowY: 'auto'
//             }}>
//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
//                   Model
//                 </label>
//                 <select
//                   value={settings.model}
//                   onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px',
//                     background: '#1f1f1f',
//                     border: '1px solid #3c4043',
//                     borderRadius: '6px',
//                     color: '#e3e3e3',
//                     fontSize: '14px'
//                   }}
//                 >
//                   <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
//                   <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
//                 </select>
//               </div>

//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
//                   Temperature: {settings.temperature}
//                 </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.1"
//                   value={settings.temperature}
//                   onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
//                   style={{ width: '100%' }}
//                 />
//               </div>

//               <div>
//                 <label style={{ color: '#9aa0a6', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
//                   Reasoning
//                 </label>
//                 <select
//                   value={settings.reasoning}
//                   onChange={(e) => setSettings({ ...settings, reasoning: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px',
//                     background: '#1f1f1f',
//                     border: '1px solid #3c4043',
//                     borderRadius: '6px',
//                     color: '#e3e3e3',
//                     fontSize: '14px'
//                   }}
//                 >
//                   <option value="none">None</option>
//                   <option value="chain">Chain of Thought</option>
//                   <option value="tree">Tree of Thought</option>
//                   <option value="both">Both</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Messages */}
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
//                   background: msg.sender === 'user' ? '#667eea' : '#2d2d2d',
//                   color: '#e3e3e3',
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

//           {/* Input */}
//           <div style={{
//             padding: '16px',
//             background: '#2d2d2d',
//             borderTop: '1px solid #3c4043',
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
//                 background: '#1f1f1f',
//                 border: '1px solid #3c4043',
//                 borderRadius: '8px',
//                 color: '#e3e3e3',
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




// gpt working code with text select auto chatbot open all think is working fine
// import { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X, User, Settings } from 'lucide-react';

// export default function GeminiChatbot() {
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

//   const API_KEY = 'AIzaSyATmOqR4xt0bX_GRHyTjmg6drjvUPFl2Ag'; // keep empty if backend is used

//   /* ---------------------------------------------------
//      🔥 NEW FEATURE: TEXT SELECTION → ASK AI
//   --------------------------------------------------- */

//   // Detect text selection on page
//   useEffect(() => {
//     const handleSelection = () => {
//       const text = window.getSelection()?.toString();
//       if (text && text.length > 5) {
//         window.dispatchEvent(
//           new CustomEvent("ASK_AI", { detail: text })
//         );
//       }
//     };

//     document.addEventListener("mouseup", handleSelection);
//     return () => document.removeEventListener("mouseup", handleSelection);
//   }, []);

//   // Listen for Ask AI event
//   useEffect(() => {
//     const handleAskAI = (e) => {
//       setIsOpen(true);
//       setInput(e.detail);
//     };

//     window.addEventListener("ASK_AI", handleAskAI);
//     return () => window.removeEventListener("ASK_AI", handleAskAI);
//   }, []);

//   /* --------------------------------------------------- */

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Hello! I'm your AI assistant powered by Gemini. Select text from the book and ask me anything!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen]);

//   useEffect(scrollToBottom, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMsg = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages(prev => [...prev, userMsg]);
//     const userInput = input;
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${API_KEY}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: userInput }] }],
//             generationConfig: {
//               temperature: settings.temperature,
//               topP: settings.topP,
//               maxOutputTokens: 2048,
//             }
//           })
//         }
//       );

//       const data = await response.json();
//       const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: botText,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);

//     } catch (err) {
//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         text: "Error talking to AI",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: 60,
//           height: 60,
//           borderRadius: '50%',
//           background: 'linear-gradient(135deg,#667eea,#764ba2)',
//           border: 'none',
//           color: 'white',
//           cursor: 'pointer'
//         }}
//       >
//         {isOpen ? <X /> : <MessageSquare />}
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           bottom: 80,
//           right: 0,
//           width: 400,
//           height: 600,
//           background: '#1f1f1f',
//           borderRadius: 16,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
//             {messages.map(m => (
//               <div key={m.id} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}>
//                 <div style={{
//                   display: 'inline-block',
//                   background: m.sender === 'user' ? '#667eea' : '#2d2d2d',
//                   color: 'white',
//                   padding: 10,
//                   borderRadius: 10,
//                   marginBottom: 8,
//                   maxWidth: '80%'
//                 }}>
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div style={{ padding: 12, display: 'flex', gap: 8 }}>
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask AI..."
//               style={{ flex: 1, padding: 10 }}
//             />
//             <button onClick={handleSendMessage} disabled={isLoading}>
//               <Send />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








// completed bot with ask ai button on text select working 
// import { useState, useEffect, useRef } from 'react';
// import { Bot, MessageSquare, Send, X } from 'lucide-react';

// export default function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const [selectedText, setSelectedText] = useState('');
//   const [askBtnPos, setAskBtnPos] = useState(null);

//   const messagesEndRef = useRef(null);

//   const API_KEY = 'AIzaSyATmOqR4xt0bX_GRHyTjmg6drjvUPFl2Ag'; // keep empty / backend

//   /* --------------------------------------------------
//      🧠 TEXT SELECTION + ASK AI BUTTON
//   -------------------------------------------------- */

//   useEffect(() => {
//     const handleMouseUp = (e) => {
//       const text = window.getSelection()?.toString().trim();

//       if (text && text.length > 5) {
//         setSelectedText(text);
//         setAskBtnPos({
//           x: e.pageX,
//           y: e.pageY - 40
//         });
//       } else {
//         setAskBtnPos(null);
//         setSelectedText('');
//       }
//     };

//     document.addEventListener('mouseup', handleMouseUp);
//     return () => document.removeEventListener('mouseup', handleMouseUp);
//   }, []);

//   const handleAskAI = () => {
//     setIsOpen(true);
//     setInput(selectedText);
//     setAskBtnPos(null);
//     window.getSelection().removeAllRanges();
//   };

//   /* -------------------------------------------------- */

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { id: Date.now(), text: input, sender: 'user' };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: userMsg.text }] }]
//           })
//         }
//       );

//       const data = await res.json();
//       const reply =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         'No response';

//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now() + 1, text: reply, sender: 'bot' }
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now() + 1, text: 'Error talking to AI', sender: 'bot' }
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* 🔥 ASK AI FLOATING BUTTON */}
//       {askBtnPos && (
//         <button
//           onClick={handleAskAI}
//           style={{
//             position: 'absolute',
//             top: askBtnPos.y,
//             left: askBtnPos.x,
//             background: '#667eea',
//             color: 'white',
//             border: 'none',
//             padding: '10px 20px',
//             borderRadius: '10px',
//             cursor: 'pointer',
//             zIndex: 9999,
//             fontSize: '15px'
//           }}
//         >
//           Ask AI
//         </button>
//       )}

//       {/* CHAT ICON */}
//       <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           style={{
//             width: 60,
//             height: 60,
//             borderRadius: '50%',
//             background: '#667eea',
//             border: 'none',
//             color: 'white',
//             cursor: 'pointer'
//           }}
//         >
//           {isOpen ? <X /> : <MessageSquare />}
//         </button>

//         {isOpen && (
//           <div
//             style={{
//               position: 'absolute',
//               bottom: 80,
//               right: 0,
//               width: 380,
//               height: 520,
//               background: '#1f1f1f',
//               borderRadius: 12,
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
//               {messages.map((m) => (
//                 <div
//                   key={m.id}
//                   style={{
//                     textAlign: m.sender === 'user' ? 'right' : 'left',
//                     marginBottom: 8
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: 'inline-block',
//                       background:
//                         m.sender === 'user' ? '#667eea' : '#333',
//                       color: 'white',
//                       padding: 8,
//                       borderRadius: 8,
//                       maxWidth: '80%'
//                     }}
//                   >
//                     {m.text}
//                   </span>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             <div style={{ padding: 10, display: 'flex', gap: 6 }}>
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask AI..."
//                 style={{ flex: 1, padding: 8 }}
//               />
//               <button onClick={handleSendMessage} disabled={isLoading}>
//                 <Send />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }










// completed bot with ask ai button on text select working with proper api response handling
  import { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, Send, X, Sparkles } from 'lucide-react';

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedText, setSelectedText] = useState('');
  const [askBtnPos, setAskBtnPos] = useState(null);

  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyATmOqR4xt0bX_GRHyTjmg6drjvUPFl2Ag'; // keep empty / backend

  /* --------------------------------------------------
     🧠 TEXT SELECTION + ASK AI BUTTON
  -------------------------------------------------- */

  useEffect(() => {
    const handleMouseUp = (e) => {
      const text = window.getSelection()?.toString().trim();

      if (text && text.length > 5) {
        setSelectedText(text);
        setAskBtnPos({
          x: e.pageX,
          y: e.pageY - 40
        });
      } else {
        setAskBtnPos(null);
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleAskAI = () => {
    setIsOpen(true);
    setInput(selectedText);
    setAskBtnPos(null);
    window.getSelection().removeAllRanges();
  };

  /* -------------------------------------------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userMsg.text
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2000,
            }
          })
        }
      );

      const data = await res.json();
      console.log('API Response:', data); // Debug ke liye
      
      let reply = 'No response';
      
      if (data?.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate?.content?.parts && candidate.content.parts.length > 0) {
          reply = candidate.content.parts[0].text;
        }
      }
      
      // Agar error hai to wo dikhao
      if (data?.error) {
        reply = `Error: ${data.error.message}`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: `Error: ${error.message}`, sender: 'bot' }
      ]);
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
    <>
      {/* 🔥 ASK AI FLOATING BUTTON */}
      {askBtnPos && (
        <button
          onClick={handleAskAI}
          style={{
            position: 'absolute',
            top: askBtnPos.y,
            left: askBtnPos.x,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            cursor: 'pointer',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          <Sparkles size={16} />
          Ask AI
        </button>
      )}

      {/* CHAT ICON */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
          }}
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: 84,
              right: 0,
              width: 400,
              height: 600,
              background: '#1a1a1a',
              borderRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              border: '1px solid #2a2a2a'
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bot size={24} color="white" />
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'white', fontSize: '18px', fontWeight: '600' }}>
                  AI Assistant
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
                  Powered by Gemini
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                background: '#1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>
                  <Bot size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p style={{ fontSize: '16px', fontWeight: '500' }}>Start a conversation</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Ask me anything!</p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    animation: 'slideIn 0.3s ease'
                  }}
                >
                  {m.sender === 'bot' && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '8px',
                        flexShrink: 0
                      }}
                    >
                      <Bot size={18} color="white" />
                    </div>
                  )}
                  <div
                    style={{
                      display: 'inline-block',
                      background: m.sender === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : '#2a2a2a',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: m.sender === 'user' 
                        ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={18} color="white" />
                  </div>
                  <div
                    style={{
                      background: '#2a2a2a',
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#667eea',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.32s'
                      }}
                    />
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#667eea',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.16s'
                      }}
                    />
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#667eea',
                        animation: 'bounce 1.4s infinite ease-in-out both'
                      }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '16px 20px',
                background: '#1f1f1f',
                borderTop: '1px solid #2a2a2a',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.background = '#2d2d2d';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#3a3a3a';
                  e.target.style.background = '#2a2a2a';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: input.trim() && !isLoading
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#3a3a3a',
                  border: 'none',
                  color: 'white',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  opacity: input.trim() && !isLoading ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}