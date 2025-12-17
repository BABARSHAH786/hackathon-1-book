






// WORKIN CODE WITH HOME PAGE WORKIN CHATBOT 
import { useState, useEffect, useRef } from 'react';
import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code, MessageSquare, Send, X, User, Settings } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import styles from './styles.module.css';

const modules = [
  { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'], colorClass: 'colorBlue', link: '/docs/weeks-1-2-physical-ai/introduction' },
  { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.', topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'], colorClass: 'colorPurple', link: '/docs/module-01-ros2/introduction' },
  { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations and test robots in virtual environments before deployment.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'], colorClass: 'colorGreen', link: '/docs/module-02-digital-twin/introduction' },
  { icon: Brain, title: 'NVIDIA Isaac - AI Robot Brain', weeks: 'Weeks 8-10', description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.', topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'], colorClass: 'colorOrange', link: '/docs/module-03-nvidia-isaac/introduction' },
  { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.', topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'], colorClass: 'colorRed', link: '/docs/module-04-vla/introduction' },
  { icon: Bot, title: 'Advanced Humanoid Development', weeks: 'Week 13', description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.', topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'], colorClass: 'colorIndigo', link: '/docs/week-13-humanoid/introduction' },
  { icon: Rocket, title: 'Capstone Project', weeks: 'Final Project', description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.', topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'], colorClass: 'colorCyan', link: '/docs/capstone/overview' },
  { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.', topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'], colorClass: 'colorGray', link: '/docs/hardware/overview' },
];

// Module Card Component
function ModuleCard({ module, index }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={styles.moduleCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`${styles.moduleGlow} ${styles[module.colorClass]}`}></div>
      <div className={styles.moduleContent}>
        <div className={`${styles.moduleIcon} ${isHovered ? styles.iconHovered : ''} ${styles[module.colorClass]}`}>
          <module.icon size={32} />
        </div>
        <div className={styles.moduleBadge}>{module.weeks}</div>
        <h3 className={styles.moduleTitle}>{module.title}</h3>
        <p className={styles.moduleDescription}>{module.description}</p>
        <div className={styles.moduleTopics}>
          {module.topics.slice(0, 3).map((topic, i) => (
            <div key={i} className={styles.moduleTopic}>
              <div className={styles.topicDot}></div>
              {topic}
            </div>
          ))}
        </div>
        <Link to={module.link} className={styles.moduleLink}>
          Learn More →
        </Link>
      </div>
    </div>
  );
}

// ==================== GEMINI CHATBOT COMPONENT ====================
function GeminiChatbot() {
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

  // Your Gemini API Key - REPLACE WITH YOUR KEY
 const API_KEY = ''

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
        text: "Hello! I'm your AI assistant powered by Gemini 🤖 Ask me anything about Physical AI, Robotics, or this course!",
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
        const imageResponse = 'This is a text-based assistant. For image generation, you can use DALL-E or Midjourney! 🎨';
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
        text: `❌ Error: ${err.message}. Please check your API key and internet connection.`,
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
    <div className={styles.chatbotContainer}>
      <button 
        className={clsx(styles.chatButton, styles.colorBlue)} 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: isOpen ? '0 8px 24px rgba(102, 126, 234, 0.4)' : '0 4px 20px rgba(102, 126, 234, 0.4)',
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={clsx(styles.chatHeader, styles.colorBlue)} style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            <div className={styles.chatHeaderTitle}>
              <Bot size={20} className={styles.chatHeaderIcon} />
              Gemini AI Assistant
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className={styles.closeButton} 
                onClick={() => setShowSettings(!showSettings)}
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Settings size={16} />
              </button>
              <button 
                className={styles.closeButton} 
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div style={{
              background: 'var(--ifm-color-emphasis-200)',
              padding: '16px',
              borderBottom: '1px solid var(--ifm-color-emphasis-300)',
              maxHeight: '220px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ 
                  color: 'var(--ifm-color-emphasis-700)', 
                  fontSize: '12px', 
                  display: 'block', 
                  marginBottom: '6px',
                  fontWeight: '500'
                }}>
                  Model Selection
                </label>
                <select
                  value={settings.model}
                  onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--ifm-background-color)',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    color: 'var(--ifm-font-color-base)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash</option>
                  <option value="gemini-2.5-pro">🧠 Gemini 2.5 Pro</option>
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ 
                  color: 'var(--ifm-color-emphasis-700)', 
                  fontSize: '12px', 
                  display: 'block', 
                  marginBottom: '6px',
                  fontWeight: '500'
                }}>
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

              <div>
                <label style={{ 
                  color: 'var(--ifm-color-emphasis-700)', 
                  fontSize: '12px', 
                  display: 'block', 
                  marginBottom: '6px',
                  fontWeight: '500'
                }}>
                  Reasoning Method
                </label>
                <select
                  value={settings.reasoning}
                  onChange={(e) => setSettings({ ...settings, reasoning: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--ifm-background-color)',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    color: 'var(--ifm-font-color-base)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="none">None</option>
                  <option value="chain">🔗 Chain of Thought</option>
                  <option value="tree">🌳 Tree of Thought</option>
                  <option value="both">🚀 Both Methods</option>
                </select>
              </div>
            </div>
          )}

          <div className={styles.chatMessages}>
            {messages.map(msg => (
              <div key={msg.id} className={clsx(styles.messageRow, msg.sender === 'user' ? styles.userRow : styles.botRow)}>
                <div className={clsx(styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble)}>
                  <div className={styles.messageIcon}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</div>
                  <div className={styles.messageTimestamp}>{msg.timestamp}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={clsx(styles.messageRow, styles.botRow)}>
                <div className={clsx(styles.messageBubble, styles.botBubble)}>
                  <div className={styles.messageIcon}><Bot size={14} /></div>
                  <div className={styles.loadingDots}>
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInputForm}>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about robotics..." 
              className={styles.chatInputField} 
              disabled={isLoading} 
            />
            <button 
              onClick={handleSendMessage}
              className={clsx(styles.sendButton, styles.colorBlue)} 
              disabled={isLoading || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Landing Page
function PhysicalAILanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    document.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.landing}>
      {/* Floating Robot */}
      <div className={styles.floatingRobot} style={{ left: mousePosition.x / 50, top: mousePosition.y / 50 + scrollY / 10 }}>
        <Bot size={256} />
      </div>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.title}>Physical AI & Humanoid Robotics</h1>
            <p className={styles.subtitle}>
              Master the art of building intelligent robots that understand and interact with the physical world
            </p>
          </div>

          <div className={styles.heroRightContent}>
            <div className={styles.heroImageContainer}>
              <img
                src="https://www.tlciscreative.com/wp-content/uploads/2025/03/A_futuristic_humanoid_robot_with_electronic_skin.jpg"
                alt="Physical AI Robot"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.ctaButtons}>
              <Link to="/docs/intro" className={styles.primaryButton}>
                Start Learning <Rocket size={22} />
              </Link>
              <a href="#modules" className={styles.secondaryButton}>
                View Modules
              </a>
            </div>

            <div className={styles.stats}>
              {[
                { icon: Book, value: '60+', label: 'Chapters' },
                { icon: Code, value: '100+', label: 'Code Examples' },
                { icon: Brain, value: '50+', label: 'AI Concepts' },
                { icon: Zap, value: '30+', label: 'Hands-on Labs' },
              ].map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <stat.icon size={42} color="#c4b5fd" />
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className={styles.modules}>
        <div className={styles.modulesContent}>
          <h2 className={styles.modulesTitle}>Course Modules</h2>
          <p className={styles.modulesSubtitle}>13 weeks of comprehensive learning from basics to advanced robotics</p>
          <div className={styles.modulesGrid}>
            {modules.map((module, i) => (
              <ModuleCard key={i} module={module} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techStack}>
        <div className={styles.techStackContent}>
          <h2 className={styles.techStackTitle}>Technologies You'll Master</h2>
          <div className={styles.techTags}>
            {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
              <div key={i} className={styles.techTag}>{tech}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.ctaCard}>
          <h2>Ready to Build the Future?</h2>
          <p>Join thousands of students learning Physical AI and Humanoid Robotics</p>
          <Link to="/docs/intro" className={styles.ctaButton}>Start Your Journey Now →</Link>
        </div>
      </section>

      {/* Gemini Chatbot */}
      <GeminiChatbot />
    </div>
  );
}

// Docusaurus Wrapper
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Home | ${siteConfig.title}`} description="Master Physical AI & Humanoid Robotics">
      <main>
        <PhysicalAILanding />
      </main>
    </Layout>
  );
}







