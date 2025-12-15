// // 



// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import Heading from '@theme/Heading';
// import styles from './index.module.css'; // index.module.css से स्टाइल आयात करें

// // ------------------------------------------------------------------
// // --- 1. HomepageHeader (Hero Section) ---
// // ------------------------------------------------------------------
// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
//           Physical AI & Humanoid Robotics
//         </Heading>
//         <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
//           Mastering Embodied Intelligence: From Sensors to Autonomous Agents
//         </p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Start Reading the Book 🚀
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// // ------------------------------------------------------------------
// // --- 2. Feature Data (Weeks/Chapters) ---
// // ------------------------------------------------------------------
// const FeatureList = [
//   // --- Weeks (Broader Topics) ---
//   {
//     title: 'Week 1: Foundations of Embodiment',
//     icon: '🤖',
//     link: '/docs/week1', // Link updated as requested
//     description: (
//       <>
//         Introduction to embodied intelligence, kinematics, and sensor-actuator systems.
//       </>
//     ),
//   },
//   {
//     title: 'Week 2: Robot Perception & Vision',
//     icon: '👁️',
//     link: '/docs/week2', // Link updated as requested
//     description: (
//       <>
//         Implementing computer vision for object recognition and spatial awareness in humanoids.
//       </>
//     ),
//   },
//   // --- Chapters (Detailed Topics) ---
//   {
//     title: 'Chapter 5: Inverse Kinematics',
//     icon: '⚙️',
//     link: '/docs/chapter5', // Link updated as requested
//     description: (
//       <>
//         Advanced mathematical models for precise limb positioning and motion planning.
//       </>
//     ),
//   },
//   {
//     title: 'Chapter 10: Ethical AI in Humanoids',
//     icon: '🛡️',
//     link: '/docs/chapter10', // Link updated as requested
//     description: (
//       <>
//         Exploring the moral and safety implications of deploying autonomous physical agents.
//       </>
//     ),
//   },
// ];

// // ------------------------------------------------------------------
// // --- 3. Feature/Card Component ---
// // ------------------------------------------------------------------
// function Feature({ title, icon, link, description }) {
//   return (
//     // Card with animation/glow on hover
//     <Link to={link} className={clsx('col col--4', styles.featureCard)}>
//       <div className="text--center">
//         <span className={styles.cardIcon}>{icon}</span>
//       </div>
//       <div className="text--left padding-horiz--md">
//         <h3 className={styles.cardTitle}>{title}</h3>
//         <p className={styles.cardDescription}>{description}</p>
//       </div>
//     </Link>
//   );
// }

// // ------------------------------------------------------------------
// // --- 4. HomepageFeatures (Card Container) ---
// // ------------------------------------------------------------------
// function HomepageFeatures() {
//   return (
//     <section className={styles.featureCardContainer}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ------------------------------------------------------------------
// // --- 5. Home (Main Export) ---
// // ------------------------------------------------------------------
// export default function Home() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Home | ${siteConfig.title}`}
//       description="The definitive guide to Physical AI and Humanoid Robotics.">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures /> 
//       </main>
//     </Layout>
//   );
// }



// import { useState, useEffect } from 'react';
// import { 
//   Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code 
// } from 'lucide-react';
// import styles from './styles.module.css';

// export default function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className={styles.landing}>
//       {/* Animated Background */}
//       {/* <div className={styles.background}>
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className={styles.particle}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div> */}

//       {/* Floating Robot */}
//       <div
//         className={styles.floatingRobot}
//         style={{
//           left: mousePosition.x / 50,
//           top: mousePosition.y / 50 + scrollY / 10,
//         }}
//       >
//         <Bot size={256} />
//       </div>

//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <div className={styles.bookIcon}>
            
//           </div>

//           <h1 className={styles.title}>
//             Physical AI & Humanoid Robotics
//           </h1>

//           <p className={styles.subtitle}>
//             Master the art of building intelligent robots that understand and interact with the physical world
//           </p>

//           <div className={styles.ctaButtons}>
//             <a href="/docs/intro" className={styles.primaryButton}>
//               Start Learning <Rocket size={20} />
//             </a>
//             <a href="#modules" className={styles.secondaryButton}>
//               View Modules
//             </a>
//           </div>

//           <div className={styles.stats}>
//             {[
//               { icon: Book, label: 'Chapters', value: '60+' },
//               { icon: Code, label: 'Code Examples', value: '100+' },
//               { icon: Brain, label: 'AI Concepts', value: '50+' },
//               { icon: Zap, label: 'Hands-on Labs', value: '30+' },
//             ].map((stat, i) => (
//               <div key={i} className={styles.statCard}>
//                 <stat.icon size={32} />
//                 <div className={styles.statValue}>{stat.value}</div>
//                 <div className={styles.statLabel}>{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.scrollIndicator}>
          
//         </div>
//       </section>

//       {/* Modules Section */}
//       <section id="modules" className={styles.modules}>
//         <div className={styles.modulesContent}>
//           <h2 className={styles.modulesTitle}>Course Modules</h2>
//           <p className={styles.modulesSubtitle}>
//             13 weeks of comprehensive learning from basics to advanced robotics
//           </p>

//           <div className={styles.modulesGrid}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className={styles.techStack}>
//         <div className={styles.techStackContent}>
//           <h2 className={styles.techStackTitle}>Technologies You'll Master</h2>
//           <div className={styles.techTags}>
//             {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
//               <div key={i} className={styles.techTag}>
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className={styles.finalCta}>
//         <div className={styles.ctaCard}>
//           <h2>Ready to Build the Future?</h2>
//           <p>Join thousands of students learning Physical AI and Humanoid Robotics</p>
//           <a href="/docs/intro" className={styles.ctaButton}>
//             Start Your Journey Now →
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }

// // Module Card Component
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={styles.moduleCard}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className={`${styles.moduleGlow} ${styles[module.colorClass]}`}></div>

//       <div className={styles.moduleContent}>
//         <div className={`${styles.moduleIcon} ${isHovered ? styles.iconHovered : ''} ${styles[module.colorClass]}`}>
//           <module.icon size={32} />
//         </div>

//         <div className={styles.moduleBadge}>{module.weeks}</div>
//         <h3 className={styles.moduleTitle}>{module.title}</h3>
//         <p className={styles.moduleDescription}>{module.description}</p>

//         <div className={styles.moduleTopics}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} className={styles.moduleTopic}>
//               <div className={styles.topicDot}></div>
//               {topic}
//             </div>
//           ))}
//         </div>

//         <a href={module.link} className={styles.moduleLink}>
//           Learn More →
//         </a>
//       </div>
//     </div>
//   );
// }

// // Modules Data
// const modules = [
//   {
//     icon: Zap,
//     title: 'Physical AI Foundations',
//     weeks: 'Weeks 1-2',
//     description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.',
//     topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'],
//     colorClass: 'colorBlue',
//     link: '/docs/weeks-1-2-physical-ai/introduction',
//   },
//   {
//     icon: Cpu,
//     title: 'ROS 2 - Robotic Nervous System',
//     weeks: 'Weeks 3-5',
//     description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.',
//     topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'],
//     colorClass: 'colorPurple',
//     link: '/docs/module-01-ros2/introduction',
//   },
//   {
//     icon: Eye,
//     title: 'Digital Twin - Gazebo & Unity',
//     weeks: 'Weeks 6-7',
//     description: 'Build photorealistic simulations and test robots in virtual environments before deployment.',
//     topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'],
//     colorClass: 'colorGreen',
//     link: '/docs/module-02-digital-twin/introduction',
//   },
//   {
//     icon: Brain,
//     title: 'NVIDIA Isaac - AI Robot Brain',
//     weeks: 'Weeks 8-10',
//     description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.',
//     topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'],
//     colorClass: 'colorOrange',
//     link: '/docs/module-03-nvidia-isaac/introduction',
//   },
//   {
//     icon: Zap,
//     title: 'Vision-Language-Action',
//     weeks: 'Weeks 11-12',
//     description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.',
//     topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'],
//     colorClass: 'colorRed',
//     link: '/docs/module-04-vla/introduction',
//   },
//   {
//     icon: Bot,
//     title: 'Advanced Humanoid Development',
//     weeks: 'Week 13',
//     description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.',
//     topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'],
//     colorClass: 'colorIndigo',
//     link: '/docs/week-13-humanoid/introduction',
//   },
//   {
//     icon: Rocket,
//     title: 'Capstone Project',
//     weeks: 'Final Project',
//     description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.',
//     topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'],
//     colorClass: 'colorCyan',
//     link: '/docs/capstone/overview',
//   },
//   {
//     icon: Code,
//     title: 'Hardware Guide',
//     weeks: 'Reference',
//     description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.',
//     topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'],
//     colorClass: 'colorGray',
//     link: '/docs/hardware/overview',
//   },
// ];
























// cluade code without chatbot

// import { useState, useEffect } from 'react';
// import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code } from 'lucide-react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout'; // Navbar and Footer are included here
// import Heading from '@theme/Heading';
// import Link from '@docusaurus/Link';
// import clsx from 'clsx';

// // IMPORTANT: Ensure styles.module.css is in the same directory as this file.
// import styles from './styles.module.css'; 

// // --- Module Card Component (Reusable) ---
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <div
//       className={styles.moduleCard}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className={`${styles.moduleGlow} ${styles[module.colorClass]}`}></div>
//       <div className={styles.moduleContent}>
//         <div className={`${styles.moduleIcon} ${isHovered ? styles.iconHovered : ''} ${styles[module.colorClass]}`}>
//           <module.icon size={32} />
//         </div>
//         <div className={styles.moduleBadge}>{module.weeks}</div>
//         <h3 className={styles.moduleTitle}>{module.title}</h3>
//         <p className={styles.moduleDescription}>{module.description}</p>
//         <div className={styles.moduleTopics}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} className={styles.moduleTopic}>
//               <div className={styles.topicDot}></div>
//               {topic}
//             </div>
//           ))}
//         </div>
//         <Link to={module.link} className={styles.moduleLink}>
//           Learn More →
//         </Link>
//       </div>
//     </div>
//   );
// }

// // --- Modules Data ---
// const modules = [
//   { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'], colorClass: 'colorBlue', link: '/docs/weeks-1-2-physical-ai/introduction' },
//   { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.', topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'], colorClass: 'colorPurple', link: '/docs/module-01-ros2/introduction' },
//   { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations and test robots in virtual environments before deployment.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'], colorClass: 'colorGreen', link: '/docs/module-02-digital-twin/introduction' },
//   { icon: Brain, title: 'NVIDIA Isaac - AI Robot Brain', weeks: 'Weeks 8-10', description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.', topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'], colorClass: 'colorOrange', link: '/docs/module-03-nvidia-isaac/introduction' },
//   { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.', topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'], colorClass: 'colorRed', link: '/docs/module-04-vla/introduction' },
//   { icon: Bot, title: 'Advanced Humanoid Development', weeks: 'Week 13', description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.', topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'], colorClass: 'colorIndigo', link: '/docs/week-13-humanoid/introduction' },
//   { icon: Rocket, title: 'Capstone Project', weeks: 'Final Project', description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.', topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'], colorClass: 'colorCyan', link: '/docs/capstone/overview' },
//   { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.', topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'], colorClass: 'colorGray', link: '/docs/hardware/overview' },
// ];

// // --- Main Landing Page Component (PhysicalAILanding) ---
// // ... (previous code)

// // --- Main Landing Page Component (PhysicalAILanding) ---
// // ... (previous code)

// // --- Main Landing Page Component (PhysicalAILanding) ---
// function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     // ... (useEffect code)
//   }, []);

//   return (
//     <div className={styles.landing}>
//       {/* Floating Robot */}
//       <div
//         className={styles.floatingRobot}
//         style={{
//           left: mousePosition.x / 50,
//           top: mousePosition.y / 50 + scrollY / 10,
//         }}
//       >
//         <Bot size={256} />
//       </div>
      
//       {/* Hero Section - FIX APPLIED HERE */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
          
//           {/* ⬅️ LEFT COLUMN: Title and Subtitle ⬅️ */}
//           {/* यह हिस्सा स्क्रीन पर LEFT SIDE पर रहेगा */}
//           <div className={styles.heroTextContent}> 
//             <h1 className={styles.titleStatic}>Physical AI & Humanoid Robotics</h1> 

//             <p className={styles.subtitle}>
//               Master the art of building intelligent robots that understand and interact with the physical world
//             </p>
//           </div>
//           {/* LEFT COLUMN ENDS */}
          
//           {/* ➡️ RIGHT COLUMN: Image, CTA Buttons, and Stats ➡️ */}
//           {/* यह हिस्सा स्क्रीन पर RIGHT SIDE पर रहेगा */}
//           <div className={styles.heroRightContent}>
            
//             {/* 1. Image/Picture Container */}
//             <div className={styles.heroImageContainer}>
//               <img 
//                 src="https://www.tlciscreative.com/wp-content/uploads/2025/03/A_futuristic_humanoid_robot_with_electronic_skin.jpg" 
//                 alt="Physical AI & Humanoid Robotics Illustration" 
//                 className={styles.heroImage} 
//               />
//             </div>

//             {/* 2. CTA Buttons */}
//             <div className={styles.ctaButtons}>
//               <Link to="/docs/intro" className={styles.primaryButton}>
//                 Start Learning <Rocket size={20} />
//               </Link>
//               <a href="#modules" className={styles.secondaryButton}>
//                 View Modules
//               </a>
//             </div>

//             {/* 3. Stats */}
//             <div className={styles.stats}>
//               {[
//                 { icon: Book, label: 'Chapters', value: '60+' },
//                 { icon: Code, label: 'Code Examples', value: '100+' },
//                 { icon: Brain, label: 'AI Concepts', value: '50+' },
//                 { icon: Zap, label: 'Hands-on Labs', value: '30+' },
//               ].map((stat, i) => (
//                 <div key={i} className={styles.statCard}>
//                   <stat.icon size={32} />
//                   <div className={styles.statValue}>{stat.value}</div>
//                   <div className={styles.statLabel}>{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* RIGHT COLUMN ENDS */}
          
//         </div>
//         <div className={styles.scrollIndicator}>
//           {/* Scroll Indicator content can go here */}
//         </div>
//       </section>

//       {/* ... (rest of the code) */}
    

//       {/* ... (rest of the code) */}
    
//       {/* Modules Section */}
//       <section id="modules" className={styles.modules}>
//         <div className={styles.modulesContent}>
//           <h2 className={styles.modulesTitle}>Course Modules</h2>
//           <p className={styles.modulesSubtitle}>
//             13 weeks of comprehensive learning from basics to advanced robotics
//           </p>
//           <div className={styles.modulesGrid}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className={styles.techStack}>
//         <div className={styles.techStackContent}>
//           <h2 className={styles.techStackTitle}>Technologies You'll Master</h2>
//           <div className={styles.techTags}>
//             {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
//               <div key={i} className={styles.techTag}>
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className={styles.finalCta}>
//         <div className={styles.ctaCard}>
//           <h2>Ready to Build the Future?</h2>
//           <p>Join thousands of students learning Physical AI and Humanoid Robotics</p>
//           <Link to="/docs/intro" className={styles.ctaButton}>
//             Start Your Journey Now →
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }


// // --- Docusaurus Home Page Wrapper (Using Layout for Navbar/Footer) ---
// export default function Home() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Home | ${siteConfig.title}`}
//       description="Master the art of building intelligent robots that understand and interact with the physical world"
//     >
//       <main>
//         {/* Your custom landing page component goes here */}
//         <PhysicalAILanding />
//       </main>
//     </Layout>
//   );
// }




// new
// import { useState, useEffect, useRef } from 'react';
// import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code, MessageCircle, X, Send, Loader, Sparkles } from 'lucide-react';

// // ChatBot Component with OpenAI Agents SDK Style
// function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedText, setSelectedText] = useState('');
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Detect text selection
//   useEffect(() => {
//     const handleSelection = () => {
//       const selection = window.getSelection().toString().trim();
//       if (selection.length > 10) {
//         setSelectedText(selection);
//       }
//     };

//     document.addEventListener('mouseup', handleSelection);
//     return () => document.removeEventListener('mouseup', handleSelection);
//   }, []);

//   const sendMessage = async () => {
//     if (!input.trim() && !selectedText) return;

//     const userMessage = input.trim() || `Question about: "${selectedText.substring(0, 50)}..."`;
    
//     // Add user message
//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // Simulated OpenAI response (replace with actual API call)
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const aiResponse = {
//         role: 'assistant',
//         content: `Great question about ${selectedText ? 'the selected text' : 'Physical AI'}! ROS 2 is a powerful middleware framework that provides communication infrastructure for robotic systems. It enables nodes to exchange messages through topics, services, and actions.`,
//         sources: [
//           { module: 'Module 1: ROS 2', score: 0.95 },
//           { module: 'Physical AI Foundations', score: 0.87 }
//         ]
//       };
      
//       setMessages(prev => [...prev, aiResponse]);
//       setSelectedText('');
//     } catch (error) {
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: 'Sorry, I encountered an error. Please try again.'
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           style={{
//             position: 'fixed',
//             bottom: '2rem',
//             right: '2rem',
//             width: '60px',
//             height: '60px',
//             borderRadius: '50%',
//             background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
//             border: 'none',
//             boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4)',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000,
//             transition: 'all 0.3s ease',
//             animation: 'pulse 2s infinite',
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//         >
//           <MessageCircle size={28} color="white" />
//           <style jsx>{`
//             @keyframes pulse {
//               0%, 100% { box-shadow: 0 8px 32px rgba(147, 51, 234, 0.4); }
//               50% { box-shadow: 0 8px 48px rgba(147, 51, 234, 0.8); }
//             }
//           `}</style>
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div style={{
//           position: 'fixed',
//           bottom: '2rem',
//           right: '2rem',
//           width: '400px',
//           height: '600px',
//           background: 'rgba(15, 23, 42, 0.95)',
//           backdropFilter: 'blur(20px)',
//           borderRadius: '1.5rem',
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
//           border: '1px solid rgba(147, 51, 234, 0.3)',
//           display: 'flex',
//           flexDirection: 'column',
//           zIndex: 1000,
//           overflow: 'hidden',
//         }}>
//           {/* Header */}
//           <div style={{
//             padding: '1.5rem',
//             background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//               <Bot size={24} color="white" />
//               <div>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: 'white' }}>
//                   AI Tutor
//                 </h3>
//                 <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
//                   Always here to help
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               style={{
//                 background: 'rgba(255,255,255,0.2)',
//                 border: 'none',
//                 borderRadius: '0.5rem',
//                 padding: '0.5rem',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 transition: 'background 0.3s',
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
//               onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
//             >
//               <X size={20} color="white" />
//             </button>
//           </div>

//           {/* Messages */}
//           <div style={{
//             flex: 1,
//             overflowY: 'auto',
//             padding: '1.5rem',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem',
//           }}>
//             {messages.length === 0 && (
//               <div style={{
//                 background: 'rgba(147, 51, 234, 0.1)',
//                 border: '1px solid rgba(147, 51, 234, 0.3)',
//                 borderRadius: '1rem',
//                 padding: '1.5rem',
//                 textAlign: 'center',
//               }}>
//                 <Sparkles size={32} color="#a78bfa" style={{ marginBottom: '0.5rem' }} />
//                 <p style={{ color: '#d1d5db', fontSize: '0.875rem', margin: 0 }}>
//                   👋 Hi! I'm your AI tutor. Ask me anything about Physical AI and Robotics!
//                 </p>
//               </div>
//             )}
            
//             {messages.map((msg, idx) => (
//               <div key={idx} style={{
//                 display: 'flex',
//                 justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
//               }}>
//                 <div style={{
//                   maxWidth: '80%',
//                   padding: '1rem',
//                   borderRadius: '1rem',
//                   background: msg.role === 'user' 
//                     ? 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)'
//                     : 'rgba(255,255,255,0.05)',
//                   border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
//                 }}>
//                   <p style={{ 
//                     margin: 0, 
//                     color: 'white', 
//                     fontSize: '0.875rem',
//                     lineHeight: '1.6',
//                   }}>
//                     {msg.content}
//                   </p>
//                   {msg.sources && (
//                     <div style={{
//                       marginTop: '0.75rem',
//                       paddingTop: '0.75rem',
//                       borderTop: '1px solid rgba(255,255,255,0.1)',
//                       fontSize: '0.75rem',
//                       color: '#a78bfa',
//                     }}>
//                       📚 Sources: {msg.sources.map(s => s.module).join(', ')}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {isLoading && (
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 color: '#a78bfa',
//               }}>
//                 <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
//                 <span style={{ fontSize: '0.875rem' }}>Thinking...</span>
//                 <style jsx>{`
//                   @keyframes spin {
//                     to { transform: rotate(360deg); }
//                   }
//                 `}</style>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Selected Text Banner */}
//           {selectedText && (
//             <div style={{
//               padding: '0.75rem 1.5rem',
//               background: 'rgba(147, 51, 234, 0.2)',
//               borderTop: '1px solid rgba(147, 51, 234, 0.3)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               fontSize: '0.75rem',
//               color: '#d1d5db',
//             }}>
//               <span>📝 Selected: "{selectedText.substring(0, 40)}..."</span>
//               <button
//                 onClick={() => setSelectedText('')}
//                 style={{
//                   background: 'transparent',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   fontSize: '1rem',
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//           )}

//           {/* Input */}
//           <div style={{
//             padding: '1.5rem',
//             borderTop: '1px solid rgba(255,255,255,0.1)',
//             display: 'flex',
//             gap: '0.75rem',
//           }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a question..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '0.75rem 1rem',
//                 background: 'rgba(255,255,255,0.05)',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 borderRadius: '0.75rem',
//                 color: 'white',
//                 fontSize: '0.875rem',
//                 outline: 'none',
//               }}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={isLoading || (!input.trim() && !selectedText)}
//               style={{
//                 padding: '0.75rem 1rem',
//                 background: (!input.trim() && !selectedText) 
//                   ? 'rgba(147, 51, 234, 0.3)'
//                   : 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
//                 border: 'none',
//                 borderRadius: '0.75rem',
//                 cursor: (!input.trim() && !selectedText) ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 transition: 'all 0.3s',
//               }}
//             >
//               <Send size={20} color="white" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // ModuleCard Component
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   const colorGradients = {
//     colorBlue: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
//     colorPurple: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
//     colorGreen: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
//     colorOrange: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
//     colorRed: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
//     colorIndigo: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
//     colorCyan: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
//     colorGray: 'linear-gradient(135deg, #6b7280 0%, #64748b 100%)',
//   };

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{
//         position: 'relative',
//         animation: 'fadeInUp 0.6s ease-out forwards',
//         animationDelay: `${index * 0.1}s`,
//         opacity: 0,
//       }}
//     >
//       <div style={{
//         position: 'absolute',
//         inset: 0,
//         background: colorGradients[module.colorClass],
//         borderRadius: '1rem',
//         filter: 'blur(20px)',
//         opacity: isHovered ? 0.3 : 0,
//         transition: 'opacity 0.5s',
//       }} />

//       <div style={{
//         position: 'relative',
//         background: 'rgba(255, 255, 255, 0.05)',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '1rem',
//         padding: '1.5rem',
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//         transition: 'all 0.3s',
//         transform: isHovered ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
//       }}>
//         <div style={{
//           display: 'inline-block',
//           padding: '1rem',
//           background: colorGradients[module.colorClass],
//           borderRadius: '0.75rem',
//           marginBottom: '1rem',
//           transition: 'transform 0.3s',
//           transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg) scale(1)',
//         }}>
//           <module.icon size={32} color="white" />
//         </div>

//         <div style={{
//           display: 'inline-block',
//           padding: '0.25rem 0.75rem',
//           background: 'rgba(147, 51, 234, 0.3)',
//           borderRadius: '9999px',
//           fontSize: '0.875rem',
//           fontWeight: '600',
//           marginBottom: '0.75rem',
//           color: 'white',
//         }}>
//           {module.weeks}
//         </div>

//         <h3 style={{
//           fontSize: '1.5rem',
//           fontWeight: '700',
//           marginBottom: '0.75rem',
//           color: isHovered ? '#a78bfa' : 'white',
//           transition: 'color 0.3s',
//         }}>
//           {module.title}
//         </h3>

//         <p style={{
//           color: '#9ca3af',
//           marginBottom: '1rem',
//           lineHeight: '1.5',
//         }}>
//           {module.description}
//         </p>

//         <div style={{ marginBottom: '1rem' }}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               fontSize: '0.875rem',
//               color: '#d1d5db',
//               marginBottom: '0.5rem',
//             }}>
//               <div style={{
//                 width: '0.375rem',
//                 height: '0.375rem',
//                 background: '#a78bfa',
//                 borderRadius: '50%',
//               }} />
//               {topic}
//             </div>
//           ))}
//         </div>

//         <a
//           href={module.link}
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             color: '#a78bfa',
//             fontWeight: '600',
//             textDecoration: 'none',
//           }}
//         >
//           Learn More →
//         </a>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// // Modules Data
// const modules = [
//   { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems', 'Humanoid Robotics'], colorClass: 'colorBlue', link: '#' },
//   { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots.', topics: ['ROS 2 Architecture', 'Publishers & Subscribers', 'Python Development'], colorClass: 'colorPurple', link: '#' },
//   { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF'], colorClass: 'colorGreen', link: '#' },
//   { icon: Brain, title: 'NVIDIA Isaac', weeks: 'Weeks 8-10', description: 'Hardware-accelerated AI.', topics: ['Isaac Sim', 'Visual SLAM', 'Sim-to-Real'], colorClass: 'colorOrange', link: '#' },
//   { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics.', topics: ['Voice Commands', 'LLM Planning', 'Multimodal'], colorClass: 'colorRed', link: '#' },
//   { icon: Bot, title: 'Advanced Humanoid', weeks: 'Week 13', description: 'Master bipedal locomotion.', topics: ['Kinematics', 'Balance Control', 'Whole-Body'], colorClass: 'colorIndigo', link: '#' },
//   { icon: Rocket, title: 'Capstone Project', weeks: 'Final', description: 'Build an autonomous humanoid.', topics: ['Voice-to-Action', 'Path Planning', 'Computer Vision'], colorClass: 'colorCyan', link: '#' },
//   { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete hardware requirements guide.', topics: ['RTX Workstation', 'Jetson Edge', 'Robot Options'], colorClass: 'colorGray', link: '#' },
// ];

// // Main Landing Page
// export default function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
//       color: 'white',
//       position: 'relative',
//       overflow: 'hidden',
//     }}>
//       {/* Floating Robot */}
//       <div style={{
//         position: 'fixed',
//         left: mousePosition.x / 50,
//         top: mousePosition.y / 50,
//         transition: 'all 0.3s ease-out',
//         pointerEvents: 'none',
//         opacity: 0.1,
//       }}>
//         <Bot size={256} color="#a855f7" />
//       </div>

//       {/* Hero Section */}
//       <section style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem 1rem',
//         position: 'relative',
//         zIndex: 10,
//       }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
//           {/* Left: Text */}
//           <div style={{ flex: 1, minWidth: '300px' }}>
//             <h1 style={{
//               fontSize: 'clamp(2.5rem, 6vw, 4rem)',
//               fontWeight: '800',
//               marginBottom: '1.5rem',
//               background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}>
//               Physical AI & Humanoid Robotics
//             </h1>
//             <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2rem' }}>
//               Master the art of building intelligent robots that understand and interact with the physical world
//             </p>
//           </div>

//           {/* Right: Image + Stats */}
//           <div style={{ flex: 1, minWidth: '300px' }}>
//             <img 
//               src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
//               alt="Robot"
//               style={{
//                 width: '100%',
//                 borderRadius: '1.5rem',
//                 marginBottom: '2rem',
//                 boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.5)',
//               }}
//             />
            
//             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//               <a href="#" style={{
//                 padding: '1rem 2rem',
//                 background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)',
//                 borderRadius: '9999px',
//                 fontWeight: '600',
//                 color: 'white',
//                 textDecoration: 'none',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//               }}>
//                 Start Learning <Rocket size={20} />
//               </a>
//               <a href="#modules" style={{
//                 padding: '1rem 2rem',
//                 background: 'rgba(255,255,255,0.1)',
//                 borderRadius: '9999px',
//                 fontWeight: '600',
//                 color: 'white',
//                 textDecoration: 'none',
//                 border: '2px solid rgba(255,255,255,0.2)',
//               }}>
//                 View Modules
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modules */}
//       <section id="modules" style={{ padding: '5rem 1rem', position: 'relative', zIndex: 10 }}>
//         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//           <h2 style={{
//             fontSize: '3rem',
//             fontWeight: '700',
//             textAlign: 'center',
//             marginBottom: '1rem',
//             background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             Course Modules
//           </h2>
//           <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '4rem', fontSize: '1.125rem' }}>
//             13 weeks of comprehensive learning
//           </p>

//           <div style={{
//             display: 'grid',
//             gap: '2rem',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           }}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ChatBot */}
//       <ChatBot />
//     </div>
//   );
// }















// add gemini rag chatbot still not  working 

// import { useState, useEffect, useRef } from 'react';
// import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code, MessageSquare, Send, X, User } from 'lucide-react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import Link from '@docusaurus/Link';
// import clsx from 'clsx';

// import styles from './styles.module.css';

// // RAG Chatbot API
// const API_ENDPOINT = 'http://localhost:8000/chat';

// // Modules Data
// const modules = [
//   { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'], colorClass: 'colorBlue', link: '/docs/weeks-1-2-physical-ai/introduction' },
//   { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.', topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'], colorClass: 'colorPurple', link: '/docs/module-01-ros2/introduction' },
//   { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations and test robots in virtual environments before deployment.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'], colorClass: 'colorGreen', link: '/docs/module-02-digital-twin/introduction' },
//   { icon: Brain, title: 'NVIDIA Isaac - AI Robot Brain', weeks: 'Weeks 8-10', description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.', topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'], colorClass: 'colorOrange', link: '/docs/module-03-nvidia-isaac/introduction' },
//   { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.', topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'], colorClass: 'colorRed', link: '/docs/module-04-vla/introduction' },
//   { icon: Bot, title: 'Advanced Humanoid Development', weeks: 'Week 13', description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.', topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'], colorClass: 'colorIndigo', link: '/docs/week-13-humanoid/introduction' },
//   { icon: Rocket, title: 'Capstone Project', weeks: 'Final Project', description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.', topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'], colorClass: 'colorCyan', link: '/docs/capstone/overview' },
//   { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.', topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'], colorClass: 'colorGray', link: '/docs/hardware/overview' },
// ];

// // Module Card Component
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <div
//       className={styles.moduleCard}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className={`${styles.moduleGlow} ${styles[module.colorClass]}`}></div>
//       <div className={styles.moduleContent}>
//         <div className={`${styles.moduleIcon} ${isHovered ? styles.iconHovered : ''} ${styles[module.colorClass]}`}>
//           <module.icon size={32} />
//         </div>
//         <div className={styles.moduleBadge}>{module.weeks}</div>
//         <h3 className={styles.moduleTitle}>{module.title}</h3>
//         <p className={styles.moduleDescription}>{module.description}</p>
//         <div className={styles.moduleTopics}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} className={styles.moduleTopic}>
//               <div className={styles.topicDot}></div>
//               {topic}
//             </div>
//           ))}
//         </div>
//         <Link to={module.link} className={styles.moduleLink}>
//           Learn More →
//         </Link>
//       </div>
//     </div>
//   );
// }

// // Chatbot Component
// function ChatbotComponent() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     setMessages([{
//       id: Date.now(),
//       text: "Hello! I'm the Physical AI RAG Bot. Ask me anything about the course curriculum!",
//       sender: 'bot',
//       timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//     }]);
//   }, []);

//   useEffect(scrollToBottom, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMsg = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await res.json();
//       const botMsg = { id: Date.now() + 1, text: data.response || "No answer found.", sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
//       setMessages(prev => [...prev, botMsg]);
//     } catch (err) {
//       setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error: Is backend running on localhost:8000?", sender: 'bot', timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.chatbotContainer}>
//       <button className={clsx(styles.chatButton, styles.colorBlue)} onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
//       </button>

//       {isOpen && (
//         <div className={styles.chatWindow}>
//           <div className={clsx(styles.chatHeader, styles.colorBlue)}>
//             <div className={styles.chatHeaderTitle}>
//               <Bot size={20} className={styles.chatHeaderIcon} />
//               Physical AI RAG Bot
//             </div>
//             <button className={styles.closeButton} onClick={() => setIsOpen(false)}><X size={16} /></button>
//           </div>

//           <div className={styles.chatMessages}>
//             {messages.map(msg => (
//               <div key={msg.id} className={clsx(styles.messageRow, msg.sender === 'user' ? styles.userRow : styles.botRow)}>
//                 <div className={clsx(styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble)}>
//                   <div className={styles.messageIcon}>{msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}</div>
//                   <div>{msg.text}</div>
//                   <div className={styles.messageTimestamp}>{msg.timestamp}</div>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className={clsx(styles.messageRow, styles.botRow)}>
//                 <div className={clsx(styles.messageBubble, styles.botBubble)}>
//                   <div className={styles.messageIcon}><Bot size={14} /></div>
//                   <div className={styles.loadingDots}><span>.</span><span>.</span><span>.</span></div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form onSubmit={handleSendMessage} className={styles.chatInputForm}>
//             <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about the course..." className={styles.chatInputField} disabled={isLoading} />
//             <button type="submit" className={clsx(styles.sendButton, styles.colorBlue)} disabled={isLoading}><Send size={20} /></button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }




// // Main Landing Page
// function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
//     const handleScroll = () => setScrollY(window.scrollY);
//     document.addEventListener('mousemove', handleMouse);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       document.removeEventListener('mousemove', handleMouse);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className={styles.landing}>
//       {/* Floating Robot */}
//       <div className={styles.floatingRobot} style={{ left: mousePosition.x / 50, top: mousePosition.y / 50 + scrollY / 10 }}>
//         <Bot size={256} />
//       </div>

//       {/* HERO SECTION – PERFECTLY CENTERED */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           {/* Title */}
//           <div className={styles.heroTextContent}>
//             <h1 className={styles.title}>Physical AI & Humanoid Robotics</h1>
//             <p className={styles.subtitle}>
//               Master the art of building intelligent robots that understand and interact with the physical world
//             </p>
//           </div>

//           {/* Image + Buttons + Stats (All Centered) */}
//           <div className={styles.heroRightContent}>
//             <div className={styles.heroImageContainer}>
//               <img
//                 src="https://www.tlciscreative.com/wp-content/uploads/2025/03/A_futuristic_humanoid_robot_with_electronic_skin.jpg"
//                 alt="Physical AI Robot"
//                 className={styles.heroImage}
//               />
//             </div>

//             {/* ===== BUTTONS + STATS – AB 100% CENTER MEIN ===== */}
// <div className={styles.ctaButtons}>
//   <Link to="/docs/intro" className={styles.primaryButton}>
//     Start Learning <Rocket size={22} />
//   </Link>
//   <a href="#modules" className={styles.secondaryButton}>
//     View Modules
//   </a>
// </div>

// <div className={styles.stats}>
//   {[
//     { icon: Book, value: '60+', label: 'Chapters' },
//     { icon: Code, value: '100+', label: 'Code Examples' },
//     { icon: Brain, value: '50+', label: 'AI Concepts' },
//     { icon: Zap, value: '30+', label: 'Hands-on Labs' },
//   ].map((stat, i) => (
//     <div key={i} className={styles.statCard}>
//       <stat.icon size={42} color="#c4b5fd" />
//       <div className={styles.statValue}>{stat.value}</div>
//       <div className={styles.statLabel}>{stat.label}</div>
//     </div>
//   ))}
// </div>
//           </div>
//         </div>
//       </section>

//       {/* Modules Section */}
//       <section id="modules" className={styles.modules}>
//         <div className={styles.modulesContent}>
//           <h2 className={styles.modulesTitle}>Course Modules</h2>
//           <p className={styles.modulesSubtitle}>13 weeks of comprehensive learning from basics to advanced robotics</p>
//           <div className={styles.modulesGrid}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className={styles.techStack}>
//         <div className={styles.techStackContent}>
//           <h2 className={styles.techStackTitle}>Technologies You'll Master</h2>
//           <div className={styles.techTags}>
//             {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
//               <div key={i} className={styles.techTag}>{tech}</div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className={styles.finalCta}>
//         <div className={styles.ctaCard}>
//           <h2>Ready to Build the Future?</h2>
//           <p>Join thousands of students learning Physical AI and Humanoid Robotics</p>
//           <Link to="/docs/intro" className={styles.ctaButton}>Start Your Journey Now →</Link>
//         </div>
//       </section>

//       {/* Chatbot */}
//       <ChatbotComponent />
//     </div>
//   );
// }

// // Docusaurus Wrapper
// export default function Home() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <Layout title={`Home | ${siteConfig.title}`} description="Master Physical AI & Humanoid Robotics">
//       <main>
//         <PhysicalAILanding />
//       </main>
//     </Layout>
//   );
// }









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
 const API_KEY = 'AIzaSyATmOqR4xt0bX_GRHyTjmg6drjvUPFl2Ag'

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







// better auth login modal code
// import { useState, useEffect, useRef } from 'react';
// import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code, MessageSquare, Send, X, User, Settings, LogIn, LogOut, UserCircle } from 'lucide-react';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import Link from '@docusaurus/Link';
// import clsx from 'clsx';

// import styles from './styles.module.css';

// // Modules Data
// const modules = [
//   { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'], colorClass: 'colorBlue', link: '/docs/weeks-1-2-physical-ai/introduction' },
//   { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.', topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'], colorClass: 'colorPurple', link: '/docs/module-01-ros2/introduction' },
//   { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations and test robots in virtual environments before deployment.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'], colorClass: 'colorGreen', link: '/docs/module-02-digital-twin/introduction' },
//   { icon: Brain, title: 'NVIDIA Isaac - AI Robot Brain', weeks: 'Weeks 8-10', description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.', topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'], colorClass: 'colorOrange', link: '/docs/module-03-nvidia-isaac/introduction' },
//   { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.', topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'], colorClass: 'colorRed', link: '/docs/module-04-vla/introduction' },
//   { icon: Bot, title: 'Advanced Humanoid Development', weeks: 'Week 13', description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.', topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'], colorClass: 'colorIndigo', link: '/docs/week-13-humanoid/introduction' },
//   { icon: Rocket, title: 'Capstone Project', weeks: 'Final Project', description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.', topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'], colorClass: 'colorCyan', link: '/docs/capstone/overview' },
//   { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.', topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'], colorClass: 'colorGray', link: '/docs/hardware/overview' },
// ];

// // ==================== LOGIN MODAL COMPONENT ====================
// function LoginModal({ isOpen, onClose, onLoginSuccess }) {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     softwareBackground: '',
//     hardwareBackground: '',
//     experienceLevel: 'beginner'
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Simulate API call - Replace with your actual Better Auth implementation
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (isSignUp) {
//         // In real implementation, call: await signUp.email(formData)
//         const user = {
//           id: Date.now().toString(),
//           name: formData.name,
//           email: formData.email,
//           softwareBackground: formData.softwareBackground,
//           hardwareBackground: formData.hardwareBackground,
//           experienceLevel: formData.experienceLevel
//         };
//         localStorage.setItem('user', JSON.stringify(user));
//         onLoginSuccess(user);
//       } else {
//         // In real implementation, call: await signIn.email({ email, password })
//         const user = {
//           id: Date.now().toString(),
//           name: formData.email.split('@')[0],
//           email: formData.email
//         };
//         localStorage.setItem('user', JSON.stringify(user));
//         onLoginSuccess(user);
//       }
      
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       backdropFilter: 'blur(4px)'
//     }}>
//       <div style={{
//         background: 'var(--ifm-background-surface-color)',
//         padding: '2rem',
//         borderRadius: '16px',
//         maxWidth: '500px',
//         width: '90%',
//         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//         position: 'relative'
//       }}>
//         <button 
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             color: 'var(--ifm-color-emphasis-600)',
//             padding: '0.5rem'
//           }}
//         >
//           <X size={20} />
//         </button>

//         <h2 style={{ 
//           marginBottom: '1.5rem',
//           color: 'var(--ifm-color-emphasis-900)',
//           textAlign: 'center'
//         }}>
//           {isSignUp ? '🚀 Create Account' : '👋 Welcome Back'}
//         </h2>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           {isSignUp && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//               style={{
//                 padding: '0.75rem',
//                 border: '1px solid var(--ifm-color-emphasis-300)',
//                 borderRadius: '8px',
//                 fontSize: '14px',
//                 background: 'var(--ifm-background-color)',
//                 color: 'var(--ifm-font-color-base)'
//               }}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//             style={{
//               padding: '0.75rem',
//               border: '1px solid var(--ifm-color-emphasis-300)',
//               borderRadius: '8px',
//               fontSize: '14px',
//               background: 'var(--ifm-background-color)',
//               color: 'var(--ifm-font-color-base)'
//             }}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//             minLength={6}
//             style={{
//               padding: '0.75rem',
//               border: '1px solid var(--ifm-color-emphasis-300)',
//               borderRadius: '8px',
//               fontSize: '14px',
//               background: 'var(--ifm-background-color)',
//               color: 'var(--ifm-font-color-base)'
//             }}
//           />

//           {isSignUp && (
//             <>
//               <div>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '0.5rem',
//                   fontSize: '14px',
//                   color: 'var(--ifm-color-emphasis-700)',
//                   fontWeight: '500'
//                 }}>
//                   Experience Level
//                 </label>
//                 <select
//                   value={formData.experienceLevel}
//                   onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid var(--ifm-color-emphasis-300)',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     background: 'var(--ifm-background-color)',
//                     color: 'var(--ifm-font-color-base)',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="beginner">Beginner</option>
//                   <option value="intermediate">Intermediate</option>
//                   <option value="advanced">Advanced</option>
//                 </select>
//               </div>

//               <textarea
//                 placeholder="Software Background (e.g., Python, JavaScript, ROS, PyTorch)"
//                 value={formData.softwareBackground}
//                 onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
//                 rows={3}
//                 style={{
//                   padding: '0.75rem',
//                   border: '1px solid var(--ifm-color-emphasis-300)',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   background: 'var(--ifm-background-color)',
//                   color: 'var(--ifm-font-color-base)',
//                   resize: 'vertical',
//                   fontFamily: 'inherit'
//                 }}
//               />

//               <textarea
//                 placeholder="Hardware Background (e.g., Arduino, Raspberry Pi, Jetson, Robot Kits)"
//                 value={formData.hardwareBackground}
//                 onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
//                 rows={3}
//                 style={{
//                   padding: '0.75rem',
//                   border: '1px solid var(--ifm-color-emphasis-300)',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   background: 'var(--ifm-background-color)',
//                   color: 'var(--ifm-font-color-base)',
//                   resize: 'vertical',
//                   fontFamily: 'inherit'
//                 }}
//               />
//             </>
//           )}

//           {error && (
//             <div style={{
//               padding: '0.75rem',
//               background: 'rgba(239, 68, 68, 0.1)',
//               color: '#ef4444',
//               borderRadius: '8px',
//               fontSize: '14px',
//               border: '1px solid rgba(239, 68, 68, 0.2)'
//             }}>
//               {error}
//             </div>
//           )}

//           <button 
//             type="submit" 
//             disabled={loading}
//             style={{
//               padding: '0.875rem',
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: loading ? 'not-allowed' : 'pointer',
//               opacity: loading ? 0.6 : 1,
//               transition: 'all 0.2s'
//             }}
//           >
//             {loading ? '⏳ Processing...' : isSignUp ? '🚀 Create Account' : '🔓 Sign In'}
//           </button>
//         </form>

//         <p style={{ 
//           textAlign: 'center', 
//           marginTop: '1.5rem',
//           fontSize: '14px',
//           color: 'var(--ifm-color-emphasis-600)'
//         }}>
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//           {' '}
//           <button 
//             onClick={() => {
//               setIsSignUp(!isSignUp);
//               setError('');
//             }}
//             style={{
//               background: 'none',
//               border: 'none',
//               color: '#667eea',
//               cursor: 'pointer',
//               fontWeight: '600',
//               textDecoration: 'underline'
//             }}
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ==================== USER MENU COMPONENT ====================
// function UserMenu({ user, onLogout }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={menuRef} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           border: 'none',
//           borderRadius: '50%',
//           width: '44px',
//           height: '44px',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '18px',
//           fontWeight: '600',
//           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//           transition: 'transform 0.2s'
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//       >
//         {user.name?.charAt(0).toUpperCase() || 'U'}
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           top: '52px',
//           right: '0',
//           background: 'var(--ifm-background-surface-color)',
//           border: '1px solid var(--ifm-color-emphasis-300)',
//           borderRadius: '12px',
//           padding: '1rem',
//           minWidth: '200px',
//           boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
//           zIndex: 1000
//         }}>
//           <div style={{ 
//             marginBottom: '1rem',
//             paddingBottom: '1rem',
//             borderBottom: '1px solid var(--ifm-color-emphasis-300)'
//           }}>
//             <div style={{ 
//               fontWeight: '600',
//               color: 'var(--ifm-color-emphasis-900)',
//               marginBottom: '0.25rem'
//             }}>
//               {user.name || 'User'}
//             </div>
//             <div style={{ 
//               fontSize: '13px',
//               color: 'var(--ifm-color-emphasis-600)'
//             }}>
//               {user.email}
//             </div>
//           </div>

//           {user.experienceLevel && (
//             <div style={{ 
//               marginBottom: '0.5rem',
//               fontSize: '13px',
//               color: 'var(--ifm-color-emphasis-700)'
//             }}>
//               Level: <span style={{ fontWeight: '600' }}>{user.experienceLevel}</span>
//             </div>
//           )}

//           <button
//             onClick={onLogout}
//             style={{
//               width: '100%',
//               padding: '0.5rem',
//               background: 'rgba(239, 68, 68, 0.1)',
//               color: '#ef4444',
//               border: '1px solid rgba(239, 68, 68, 0.2)',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '0.5rem',
//               marginTop: '0.5rem'
//             }}
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Module Card Component
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <div
//       className={styles.moduleCard}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className={`${styles.moduleGlow} ${styles[module.colorClass]}`}></div>
//       <div className={styles.moduleContent}>
//         <div className={`${styles.moduleIcon} ${isHovered ? styles.iconHovered : ''} ${styles[module.colorClass]}`}>
//           <module.icon size={32} />
//         </div>
//         <div className={styles.moduleBadge}>{module.weeks}</div>
//         <h3 className={styles.moduleTitle}>{module.title}</h3>
//         <p className={styles.moduleDescription}>{module.description}</p>
//         <div className={styles.moduleTopics}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} className={styles.moduleTopic}>
//               <div className={styles.topicDot}></div>
//               {topic}
//             </div>
//           ))}
//         </div>
//         <Link to={module.link} className={styles.moduleLink}>
//           Learn More →
//         </Link>
//       </div>
//     </div>
//   );
// }

// // ==================== GEMINI CHATBOT COMPONENT ====================
// function GeminiChatbot() {
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

//   // ⚠️ IMPORTANT: Move this to your backend (FastAPI) for security!
//   // This is just for demo purposes
//   const API_KEY = 'AIzaSyDedZHxU__inYefA6yLo8fEZYNy0hX8yxQ';

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
//         text: "Hello! I'm your AI assistant powered by Gemini 🤖 Ask me anything about Physical AI, Robotics, or this course!",
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
//         const imageResponse = 'This is a text-based assistant. For image generation, you can use DALL-E or Midjourney! 🎨';
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
//         text: `❌ Error: ${err.message}. Please check your API key and internet connection.`,
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
//     <div className={styles.chatbotContainer}>
//       <button 
//         className={clsx(styles.chatButton, styles.colorBlue)} 
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           boxShadow: isOpen ? '0 8px 24px rgba(102, 126, 234, 0.4)' : '0 4px 20px rgba(102, 126, 234, 0.4)',
//           transform: isOpen ? 'scale(0.95)' : 'scale(1)',
//         }}
//       >
//         {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
//       </button>

//       {isOpen && (
//         <div className={styles.chatWindow}>
//           <div className={clsx(styles.chatHeader, styles.colorBlue)} style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//           }}>
//             <div className={styles.chatHeaderTitle}>
//               <Bot size={20} className={styles.chatHeaderIcon} />
//               Gemini AI Assistant
//             </div>
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <button 
//                 className={styles.closeButton} 
//                 onClick={() => setShowSettings(!showSettings)}
//                 style={{ background: 'rgba(255,255,255,0.2)' }}
//               >
//                 <Settings size={16} />
//               </button>
//               <button 
//                 className={styles.closeButton} 
//                 onClick={() => setIsOpen(false)}
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Settings Panel */}
//           {showSettings && (
//             <div style={{
//               background: 'var(--ifm-color-emphasis-200)',
//               padding: '16px',
//               borderBottom: '1px solid var(--ifm-color-emphasis-300)',
//               maxHeight: '220px',
//               overflowY: 'auto'
//             }}>
//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ 
//                   color: 'var(--ifm-color-emphasis-700)', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
//                   Model Selection
//                 </label>
//                 <select
//                   value={settings.model}
//                   onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px 12px',
//                     background: 'var(--ifm-background-color)',
//                     border: '1px solid var(--ifm-color-emphasis-300)',
//                     borderRadius: '6px',
//                     color: 'var(--ifm-font-color-base)',
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash</option>
//                   <option value="gemini-2.5-pro">🧠 Gemini 2.5 Pro</option>
//                 </select>
//               </div>

//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ 
//                   color: 'var(--ifm-color-emphasis-700)', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
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

//               <div>
//                 <label style={{ 
//                   color: 'var(--ifm-color-emphasis-700)', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
//                   Reasoning Method
//                 </label>
//                 <select
//                   value={settings.reasoning}
//                   onChange={(e) => setSettings({ ...settings, reasoning: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px 12px',
//                     background: 'var(--ifm-background-color)',
//                     border: '1px solid var(--ifm-color-emphasis-300)',
//                     borderRadius: '6px',
//                     color: 'var(--ifm-font-color-base)',
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="none">None</option>
//                   <option value="chain">🔗 Chain of Thought</option>
//                   <option value="tree">🌳 Tree of Thought</option>
//                   <option value="both">🚀 Both Methods</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           <div className={styles.chatMessages}>
//             {messages.map(msg => (
//               <div key={msg.id} className={clsx(styles.messageRow, msg.sender === 'user' ? styles.userRow : styles.botRow)}>
//                 <div className={clsx(styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.botBubble)}>
//                   <div className={styles.messageIcon}>
//                     {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
//                   </div>
//                   <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.text}</div>
//                   <div className={styles.messageTimestamp}>{msg.timestamp}</div>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className={clsx(styles.messageRow, styles.botRow)}>
//                 <div className={clsx(styles.messageBubble, styles.botBubble)}>
//                   <div className={styles.messageIcon}><Bot size={14} /></div>
//                   <div className={styles.loadingDots}>
//                     <span>.</span><span>.</span><span>.</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className={styles.chatInputForm}>
//             <input 
//               type="text" 
//               value={input} 
//               onChange={e => setInput(e.target.value)} 
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything about robotics..." 
//               className={styles.chatInputField} 
//               disabled={isLoading} 
//             />
//             <button 
//               onClick={handleSendMessage}
//               className={clsx(styles.sendButton, styles.colorBlue)} 
//               disabled={isLoading || !input.trim()}
//               style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 opacity: isLoading || !input.trim() ? 0.5 : 1,
//                 cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer'
//               }}
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Main Landing Page
// function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [user, setUser] = useState(null);

//   // Check for existing user session on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (e) {
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
//     const handleScroll = () => setScrollY(window.scrollY);
//     document.addEventListener('mousemove', handleMouse);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       document.removeEventListener('mousemove', handleMouse);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <div className={styles.landing}>
//       {/* Login Button - Fixed Position */}
//       <div style={{
//         position: 'fixed',
//         top: '1rem',
//         right: '1rem',
//         zIndex: 999
//       }}>
//         {user ? (
//           <UserMenu user={user} onLogout={handleLogout} />
//         ) : (
//           <button
//             onClick={() => setShowLoginModal(true)}
//             style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '0.75rem 1.5rem',
//               cursor: 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//               transition: 'transform 0.2s'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <LogIn size={18} />
//             Login / Sign Up
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       <LoginModal 
//         isOpen={showLoginModal} 
//         onClose={() => setShowLoginModal(false)}
//         onLoginSuccess={handleLoginSuccess}
//       />

//       {/* Floating Robot */}
//       <div className={styles.floatingRobot} style={{ left: mousePosition.x / 50, top: mousePosition.y / 50 + scrollY / 10 }}>
//         <Bot size={256} />
//       </div>

//       {/* HERO SECTION */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <div className={styles.heroTextContent}>
//             <h1 className={styles.title}>Physical AI & Humanoid Robotics</h1>
//             <p className={styles.subtitle}>
//               Master the art of building intelligent robots that understand and interact with the physical world
//             </p>
//             {user && (
//               <div style={{
//                 marginTop: '1rem',
//                 padding: '0.75rem 1rem',
//                 background: 'rgba(102, 126, 234, 0.1)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(102, 126, 234, 0.3)',
//                 display: 'inline-block'
//               }}>
//                 👋 Welcome back, <strong>{user.name}</strong>!
//               </div>
//             )}
//           </div>

//           <div className={styles.heroRightContent}>
//             <div className={styles.heroImageContainer}>
//               <img
//                 src="https://www.tlciscreative.com/wp-content/uploads/2025/03/A_futuristic_humanoid_robot_with_electronic_skin.jpg"
//                 alt="Physical AI Robot"
//                 className={styles.heroImage}
//               />
//             </div>

//             <div className={styles.ctaButtons}>
//               <Link to="/docs/intro" className={styles.primaryButton}>
//                 Start Learning <Rocket size={22} />
//               </Link>
//               <a href="#modules" className={styles.secondaryButton}>
//                 View Modules
//               </a>
//             </div>

//             <div className={styles.stats}>
//               {[
//                 { icon: Book, value: '60+', label: 'Chapters' },
//                 { icon: Code, value: '100+', label: 'Code Examples' },
//                 { icon: Brain, value: '50+', label: 'AI Concepts' },
//                 { icon: Zap, value: '30+', label: 'Hands-on Labs' },
//               ].map((stat, i) => (
//                 <div key={i} className={styles.statCard}>
//                   <stat.icon size={42} color="#c4b5fd" />
//                   <div className={styles.statValue}>{stat.value}</div>
//                   <div className={styles.statLabel}>{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modules Section */}
//       <section id="modules" className={styles.modules}>
//         <div className={styles.modulesContent}>
//           <h2 className={styles.modulesTitle}>Course Modules</h2>
//           <p className={styles.modulesSubtitle}>13 weeks of comprehensive learning from basics to advanced robotics</p>
//           <div className={styles.modulesGrid}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack */}
//       <section className={styles.techStack}>
//         <div className={styles.techStackContent}>
//           <h2 className={styles.techStackTitle}>Technologies You'll Master</h2>
//           <div className={styles.techTags}>
//             {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
//               <div key={i} className={styles.techTag}>{tech}</div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className={styles.finalCta}>
//         <div className={styles.ctaCard}>
//           <h2>Ready to Build the Future?</h2>
//           <p>Join thousands of students learning Physical AI and Humanoid Robotics</p>
//           <Link to="/docs/intro" className={styles.ctaButton}>Start Your Journey Now →</Link>
//         </div>
//       </section>

//       {/* Gemini Chatbot */}
//       <GeminiChatbot />
//     </div>
//   );
// }

// // Docusaurus Wrapper
// export default function Home() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <Layout title={`Home | ${siteConfig.title}`} description="Master Physical AI & Humanoid Robotics">
//       <main>
//         <PhysicalAILanding />
//       </main>
//     </Layout>
//   );
// }













// ask with ai button add chatbot 


// import { useState, useEffect, useRef } from 'react';
// import { Book, Bot, Cpu, Eye, Zap, Rocket, Brain, Code, MessageSquare, Send, X, User, Settings, LogIn, LogOut, UserCircle, Sparkles } from 'lucide-react';

// // Modules Data
// const modules = [
//   { icon: Zap, title: 'Physical AI Foundations', weeks: 'Weeks 1-2', description: 'Introduction to embodied intelligence, from digital AI to robots that understand physical laws.', topics: ['What is Physical AI', 'Sensor Systems (LiDAR, Cameras, IMUs)', 'Humanoid Robotics Landscape'], colorClass: 'colorBlue', link: '#' },
//   { icon: Cpu, title: 'ROS 2 - Robotic Nervous System', weeks: 'Weeks 3-5', description: 'Master the middleware that powers modern robots. Learn nodes, topics, services, and actions.', topics: ['ROS 2 Architecture & DDS', 'Publishers & Subscribers', 'Python Package Development'], colorClass: 'colorPurple', link: '#' },
//   { icon: Eye, title: 'Digital Twin - Gazebo & Unity', weeks: 'Weeks 6-7', description: 'Build photorealistic simulations and test robots in virtual environments before deployment.', topics: ['Physics Simulation', 'Sensor Simulation', 'URDF Robot Description'], colorClass: 'colorGreen', link: '#' },
//   { icon: Brain, title: 'NVIDIA Isaac - AI Robot Brain', weeks: 'Weeks 8-10', description: 'Leverage NVIDIA Isaac for photorealistic simulation, synthetic data, and hardware-accelerated AI.', topics: ['Isaac Sim & Omniverse', 'Visual SLAM & Navigation', 'Sim-to-Real Transfer'], colorClass: 'colorOrange', link: '#' },
//   { icon: Zap, title: 'Vision-Language-Action', weeks: 'Weeks 11-12', description: 'Integrate GPT models with robotics. Convert natural language commands into robot actions.', topics: ['Voice Commands (Whisper)', 'LLM Task Planning', 'Multimodal Interaction'], colorClass: 'colorRed', link: '#' },
//   { icon: Bot, title: 'Advanced Humanoid Development', weeks: 'Week 13', description: 'Master bipedal locomotion, manipulation, and human-robot interaction design.', topics: ['Kinematics & Dynamics', 'Balance Control', 'Whole-Body Control'], colorClass: 'colorIndigo', link: '#' },
//   { icon: Rocket, title: 'Capstone Project', weeks: 'Final Project', description: 'Build an autonomous humanoid that responds to voice, navigates, and manipulates objects.', topics: ['Voice-to-Action Pipeline', 'Path Planning & Navigation', 'Computer Vision Integration'], colorClass: 'colorCyan', link: '#' },
//   { icon: Code, title: 'Hardware Guide', weeks: 'Reference', description: 'Complete guide to hardware requirements from GPUs to edge computing and robot platforms.', topics: ['RTX Workstation Setup', 'Jetson Edge Computing', 'Robot Options & Budget'], colorClass: 'colorGray', link: '#' },
// ];

// // ==================== LOGIN MODAL COMPONENT ====================
// function LoginModal({ isOpen, onClose, onLoginSuccess }) {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     softwareBackground: '',
//     hardwareBackground: '',
//     experienceLevel: 'beginner'
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (isSignUp) {
//         const user = {
//           id: Date.now().toString(),
//           name: formData.name,
//           email: formData.email,
//           softwareBackground: formData.softwareBackground,
//           hardwareBackground: formData.hardwareBackground,
//           experienceLevel: formData.experienceLevel
//         };
//         onLoginSuccess(user);
//       } else {
//         const user = {
//           id: Date.now().toString(),
//           name: formData.email.split('@')[0],
//           email: formData.email
//         };
//         onLoginSuccess(user);
//       }
      
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.8)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       backdropFilter: 'blur(4px)'
//     }}>
//       <div style={{
//         background: '#1e293b',
//         padding: '2rem',
//         borderRadius: '16px',
//         maxWidth: '500px',
//         width: '90%',
//         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//         position: 'relative'
//       }}>
//         <button 
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             color: '#94a3b8',
//             padding: '0.5rem'
//           }}
//         >
//           <X size={20} />
//         </button>

//         <h2 style={{ 
//           marginBottom: '1.5rem',
//           color: 'white',
//           textAlign: 'center'
//         }}>
//           {isSignUp ? '🚀 Create Account' : '👋 Welcome Back'}
//         </h2>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           {isSignUp && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//               style={{
//                 padding: '0.75rem',
//                 border: '1px solid #334155',
//                 borderRadius: '8px',
//                 fontSize: '14px',
//                 background: '#0f172a',
//                 color: 'white'
//               }}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//             style={{
//               padding: '0.75rem',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               fontSize: '14px',
//               background: '#0f172a',
//               color: 'white'
//             }}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//             minLength={6}
//             style={{
//               padding: '0.75rem',
//               border: '1px solid #334155',
//               borderRadius: '8px',
//               fontSize: '14px',
//               background: '#0f172a',
//               color: 'white'
//             }}
//           />

//           {isSignUp && (
//             <>
//               <div>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '0.5rem',
//                   fontSize: '14px',
//                   color: '#cbd5e1',
//                   fontWeight: '500'
//                 }}>
//                   Experience Level
//                 </label>
//                 <select
//                   value={formData.experienceLevel}
//                   onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '0.75rem',
//                     border: '1px solid #334155',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     background: '#0f172a',
//                     color: 'white',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="beginner">Beginner</option>
//                   <option value="intermediate">Intermediate</option>
//                   <option value="advanced">Advanced</option>
//                 </select>
//               </div>

//               <textarea
//                 placeholder="Software Background (e.g., Python, JavaScript, ROS, PyTorch)"
//                 value={formData.softwareBackground}
//                 onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
//                 rows={3}
//                 style={{
//                   padding: '0.75rem',
//                   border: '1px solid #334155',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   background: '#0f172a',
//                   color: 'white',
//                   resize: 'vertical',
//                   fontFamily: 'inherit'
//                 }}
//               />

//               <textarea
//                 placeholder="Hardware Background (e.g., Arduino, Raspberry Pi, Jetson, Robot Kits)"
//                 value={formData.hardwareBackground}
//                 onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
//                 rows={3}
//                 style={{
//                   padding: '0.75rem',
//                   border: '1px solid #334155',
//                   borderRadius: '8px',
//                   fontSize: '14px',
//                   background: '#0f172a',
//                   color: 'white',
//                   resize: 'vertical',
//                   fontFamily: 'inherit'
//                 }}
//               />
//             </>
//           )}

//           {error && (
//             <div style={{
//               padding: '0.75rem',
//               background: 'rgba(239, 68, 68, 0.1)',
//               color: '#ef4444',
//               borderRadius: '8px',
//               fontSize: '14px',
//               border: '1px solid rgba(239, 68, 68, 0.2)'
//             }}>
//               {error}
//             </div>
//           )}

//           <button 
//             type="submit" 
//             disabled={loading}
//             style={{
//               padding: '0.875rem',
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: loading ? 'not-allowed' : 'pointer',
//               opacity: loading ? 0.6 : 1,
//               transition: 'all 0.2s'
//             }}
//           >
//             {loading ? '⏳ Processing...' : isSignUp ? '🚀 Create Account' : '🔓 Sign In'}
//           </button>
//         </form>

//         <p style={{ 
//           textAlign: 'center', 
//           marginTop: '1.5rem',
//           fontSize: '14px',
//           color: '#94a3b8'
//         }}>
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//           {' '}
//           <button 
//             onClick={() => {
//               setIsSignUp(!isSignUp);
//               setError('');
//             }}
//             style={{
//               background: 'none',
//               border: 'none',
//               color: '#667eea',
//               cursor: 'pointer',
//               fontWeight: '600',
//               textDecoration: 'underline'
//             }}
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ==================== USER MENU COMPONENT ====================
// function UserMenu({ user, onLogout }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={menuRef} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           border: 'none',
//           borderRadius: '50%',
//           width: '44px',
//           height: '44px',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: '18px',
//           fontWeight: '600',
//           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//           transition: 'transform 0.2s'
//         }}
//         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//       >
//         {user.name?.charAt(0).toUpperCase() || 'U'}
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'absolute',
//           top: '52px',
//           right: '0',
//           background: '#1e293b',
//           border: '1px solid #334155',
//           borderRadius: '12px',
//           padding: '1rem',
//           minWidth: '200px',
//           boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
//           zIndex: 1000
//         }}>
//           <div style={{ 
//             marginBottom: '1rem',
//             paddingBottom: '1rem',
//             borderBottom: '1px solid #334155'
//           }}>
//             <div style={{ 
//               fontWeight: '600',
//               color: 'white',
//               marginBottom: '0.25rem'
//             }}>
//               {user.name || 'User'}
//             </div>
//             <div style={{ 
//               fontSize: '13px',
//               color: '#94a3b8'
//             }}>
//               {user.email}
//             </div>
//           </div>

//           {user.experienceLevel && (
//             <div style={{ 
//               marginBottom: '0.5rem',
//               fontSize: '13px',
//               color: '#cbd5e1'
//             }}>
//               Level: <span style={{ fontWeight: '600' }}>{user.experienceLevel}</span>
//             </div>
//           )}

//           <button
//             onClick={onLogout}
//             style={{
//               width: '100%',
//               padding: '0.5rem',
//               background: 'rgba(239, 68, 68, 0.1)',
//               color: '#ef4444',
//               border: '1px solid rgba(239, 68, 68, 0.2)',
//               borderRadius: '6px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '0.5rem',
//               marginTop: '0.5rem'
//             }}
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Module Card Component
// function ModuleCard({ module, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   const colorGradients = {
//     colorBlue: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
//     colorPurple: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
//     colorGreen: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
//     colorOrange: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
//     colorRed: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
//     colorIndigo: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
//     colorCyan: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
//     colorGray: 'linear-gradient(135deg, #6b7280 0%, #64748b 100%)',
//   };

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{
//         position: 'relative',
//         animation: 'fadeInUp 0.6s ease-out forwards',
//         animationDelay: `${index * 0.1}s`,
//         opacity: 0,
//       }}
//     >
//       <div style={{
//         position: 'absolute',
//         inset: 0,
//         background: colorGradients[module.colorClass],
//         borderRadius: '1rem',
//         filter: 'blur(20px)',
//         opacity: isHovered ? 0.3 : 0,
//         transition: 'opacity 0.5s',
//       }} />

//       <div style={{
//         position: 'relative',
//         background: 'rgba(255, 255, 255, 0.05)',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '1rem',
//         padding: '1.5rem',
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//         transition: 'all 0.3s',
//         transform: isHovered ? 'scale(1.05) translateY(-8px)' : 'scale(1) translateY(0)',
//       }}>
//         <div style={{
//           display: 'inline-block',
//           padding: '1rem',
//           background: colorGradients[module.colorClass],
//           borderRadius: '0.75rem',
//           marginBottom: '1rem',
//           transition: 'transform 0.3s',
//           transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg) scale(1)',
//         }}>
//           <module.icon size={32} color="white" />
//         </div>

//         <div style={{
//           display: 'inline-block',
//           padding: '0.25rem 0.75rem',
//           background: 'rgba(147, 51, 234, 0.3)',
//           borderRadius: '9999px',
//           fontSize: '0.875rem',
//           fontWeight: '600',
//           marginBottom: '0.75rem',
//           color: 'white',
//         }}>
//           {module.weeks}
//         </div>

//         <h3 style={{
//           fontSize: '1.5rem',
//           fontWeight: '700',
//           marginBottom: '0.75rem',
//           color: isHovered ? '#a78bfa' : 'white',
//           transition: 'color 0.3s',
//         }}>
//           {module.title}
//         </h3>

//         <p style={{
//           color: '#9ca3af',
//           marginBottom: '1rem',
//           lineHeight: '1.5',
//         }}>
//           {module.description}
//         </p>

//         <div style={{ marginBottom: '1rem' }}>
//           {module.topics.slice(0, 3).map((topic, i) => (
//             <div key={i} style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               fontSize: '0.875rem',
//               color: '#d1d5db',
//               marginBottom: '0.5rem',
//             }}>
//               <div style={{
//                 width: '0.375rem',
//                 height: '0.375rem',
//                 background: '#a78bfa',
//                 borderRadius: '50%',
//               }} />
//               {topic}
//             </div>
//           ))}
//         </div>

//         <a
//           href={module.link}
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             color: '#a78bfa',
//             fontWeight: '600',
//             textDecoration: 'none',
//           }}
//         >
//           Learn More →
//         </a>
//       </div>

//       <style>{`
//         @keyframes fadeInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ==================== GEMINI CHATBOT WITH TEXT SELECTION ====================
// function GeminiChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [selectedText, setSelectedText] = useState('');
//   const [showAskButton, setShowAskButton] = useState(false);
//   const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
//   const messagesEndRef = useRef(null);

//   const [settings, setSettings] = useState({
//     model: 'gemini-2.0-flash',
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
//     const handleSelection = (e) => {
//       const selection = window.getSelection();
//       const text = selection.toString().trim();
      
//       if (text.length > 0) {
//         setSelectedText(text);
//         setShowAskButton(true);
        
//         const range = selection.getRangeAt(0);
//         const rect = range.getBoundingClientRect();
        
//         setButtonPosition({
//           x: rect.left + rect.width / 2,
//           y: rect.top - 50
//         });
//       } else {
//         setShowAskButton(false);
//       }
//     };

//     document.addEventListener('mouseup', handleSelection);
//     return () => document.removeEventListener('mouseup', handleSelection);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (showAskButton && !e.target.closest('.ask-ai-button')) {
//         setShowAskButton(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showAskButton]);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([{
//         id: Date.now(),
//         text: "Hello! I'm your AI assistant powered by Gemini 🤖 Ask me anything about Physical AI, Robotics, or this course! You can also select any text on the page and ask me about it!",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//       }]);
//     }
//   }, [isOpen, messages.length]);

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

//   const handleAskAboutSelection = () => {
//     setIsOpen(true);
//     setInput(`Explain this: "${selectedText.substring(0, 100)}${selectedText.length > 100 ? '...' : ''}"`);
//     setShowAskButton(false);
//     window.getSelection().removeAllRanges();
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

//       if (checkImageQuery(userInput)) {
//         const imageResponse = 'This is a text-based assistant. For image generation, you can use DALL-E or Midjourney! 🎨';
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

//       let modifiedMessage = userInput;
//       if (settings.reasoning === 'chain') {
//         modifiedMessage = `Use chain of thought: think step by step.\n\n${userInput}`;
//       } else if (settings.reasoning === 'tree') {
//         modifiedMessage = `Use tree of thought: explore multiple reasoning paths.\n\n${userInput}`;
//       } else if (settings.reasoning === 'both') {
//         modifiedMessage = `Use both chain of thought and tree of thought.\n\n${userInput}`;
//       }

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
//         text: `❌ Error: ${err.message}. Please check your API key and internet connection.`,
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
//       {showAskButton && (
//         <button
//           className="ask-ai-button"
//           onClick={handleAskAboutSelection}
//           style={{
//             position: 'fixed',
//             left: `${buttonPosition.x}px`,
//             top: `${buttonPosition.y}px`,
//             transform: 'translateX(-50%)',
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '24px',
//             padding: '8px 20px',
//             cursor: 'pointer',
//             fontSize: '14px',
//             fontWeight: '600',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             boxShadow: '0 8px 24px rgba(102, 126, 234, 0.5)',
//             zIndex: 9999,
//             animation: 'fadeIn 0.2s ease-out'
//           }}
//         >
//           <Sparkles size={16} />
//           Ask AI
//         </button>
//       )}

//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           position: 'fixed',
//           bottom: '2rem',
//           right: '2rem',
//           width: '60px',
//           height: '60px',
//           borderRadius: '50%',
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           border: 'none',
//           boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000,
//           transition: 'all 0.3s ease',
//           transform: isOpen ? 'scale(0.9)' : 'scale(1)'
//         }}
//         onMouseEnter={(e) => !isOpen && (e.currentTarget.style.transform = 'scale(1.1)')}
//         onMouseLeave={(e) => !isOpen && (e.currentTarget.style.transform = 'scale(1)')}
//       >
//         {isOpen ? <X size={24} color="white" /> : <MessageSquare size={24} color="white" />}
//       </button>

//       {isOpen && (
//         <div style={{
//           position: 'fixed',
//           bottom: '2rem',
//           right: '2rem',
//           width: '420px',
//           height: '650px',
//           background: 'rgba(15, 23, 42, 0.95)',
//           backdropFilter: 'blur(20px)',
//           borderRadius: '1.5rem',
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
//           border: '1px solid rgba(102, 126, 234, 0.3)',
//           display: 'flex',
//           flexDirection: 'column',
//           zIndex: 1000,
//           overflow: 'hidden',
//         }}>
//           <div style={{
//             padding: '1.5rem',
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//               <Bot size={24} color="white" />
//               <div>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: 'white' }}>
//                   Gemini AI Tutor
//                 </h3>
//                 <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
//                   Select text to ask questions
//                 </p>
//               </div>
//             </div>
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <button 
//                 onClick={() => setShowSettings(!showSettings)}
//                 style={{
//                   background: 'rgba(255,255,255,0.2)',
//                   border: 'none',
//                   borderRadius: '0.5rem',
//                   padding: '0.5rem',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   transition: 'background 0.3s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
//               >
//                 <Settings size={16} color="white" />
//               </button>
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 style={{
//                   background: 'rgba(255,255,255,0.2)',
//                   border: 'none',
//                   borderRadius: '0.5rem',
//                   padding: '0.5rem',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   transition: 'background 0.3s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
//               >
//                 <X size={16} color="white" />
//               </button>
//             </div>
//           </div>

//           {showSettings && (
//             <div style={{
//               background: 'rgba(30, 41, 59, 0.8)',
//               padding: '16px',
//               borderBottom: '1px solid rgba(255,255,255,0.1)',
//               maxHeight: '220px',
//               overflowY: 'auto'
//             }}>
//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ 
//                   color: '#cbd5e1', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
//                   Model Selection
//                 </label>
//                 <select
//                   value={settings.model}
//                   onChange={(e) => setSettings({ ...settings, model: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px 12px',
//                     background: '#0f172a',
//                     border: '1px solid rgba(255,255,255,0.2)',
//                     borderRadius: '6px',
//                     color: 'white',
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="gemini-2.0-flash-exp">⚡ Gemini 2.0 Flash</option>
//                   <option value="gemini-1.5-pro">🧠 Gemini 1.5 Pro</option>
//                 </select>
//               </div>

//               <div style={{ marginBottom: '12px' }}>
//                 <label style={{ 
//                   color: '#cbd5e1', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
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

//               <div>
//                 <label style={{ 
//                   color: '#cbd5e1', 
//                   fontSize: '12px', 
//                   display: 'block', 
//                   marginBottom: '6px',
//                   fontWeight: '500'
//                 }}>
//                   Reasoning Method
//                 </label>
//                 <select
//                   value={settings.reasoning}
//                   onChange={(e) => setSettings({ ...settings, reasoning: e.target.value })}
//                   style={{
//                     width: '100%',
//                     padding: '8px 12px',
//                     background: '#0f172a',
//                     border: '1px solid rgba(255,255,255,0.2)',
//                     borderRadius: '6px',
//                     color: 'white',
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option value="none">None</option>
//                   <option value="chain">🔗 Chain of Thought</option>
//                   <option value="tree">🌳 Tree of Thought</option>
//                   <option value="both">🚀 Both Methods</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           <div style={{
//             flex: 1,
//             overflowY: 'auto',
//             padding: '1.5rem',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem',
//           }}>
//             {messages.length === 0 && (
//               <div style={{
//                 background: 'rgba(102, 126, 234, 0.1)',
//                 border: '1px solid rgba(102, 126, 234, 0.3)',
//                 borderRadius: '1rem',
//                 padding: '1.5rem',
//                 textAlign: 'center',
//               }}>
//                 <Sparkles size={32} color="#a78bfa" style={{ marginBottom: '0.5rem' }} />
//                 <p style={{ color: '#d1d5db', fontSize: '0.875rem', margin: 0 }}>
//                   👋 Hi! Select any text on the page and click "Ask AI" or type your question below!
//                 </p>
//               </div>
//             )}
            
//             {messages.map((msg) => (
//               <div key={msg.id} style={{
//                 display: 'flex',
//                 justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
//               }}>
//                 <div style={{
//                   maxWidth: '85%',
//                   padding: '1rem',
//                   borderRadius: '1rem',
//                   background: msg.sender === 'user' 
//                     ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//                     : 'rgba(255,255,255,0.05)',
//                   border: msg.sender === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
//                     {msg.sender === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="#a78bfa" />}
//                     <span style={{ fontSize: '0.75rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}>
//                       {msg.timestamp}
//                     </span>
//                   </div>
//                   <p style={{ 
//                     margin: 0, 
//                     color: 'white', 
//                     fontSize: '0.875rem',
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-wrap',
//                     wordBreak: 'break-word'
//                   }}>
//                     {msg.text}
//                   </p>
//                 </div>
//               </div>
//             ))}
            
//             {isLoading && (
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 color: '#a78bfa',
//               }}>
//                 <div style={{
//                   width: '16px',
//                   height: '16px',
//                   border: '2px solid #a78bfa',
//                   borderTopColor: 'transparent',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }} />
//                 <span style={{ fontSize: '0.875rem' }}>Thinking...</span>
//                 <style>{`
//                   @keyframes spin {
//                     to { transform: rotate(360deg); }
//                   }
//                   @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(-10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                   }
//                 `}</style>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           {selectedText && (
//             <div style={{
//               padding: '0.75rem 1.5rem',
//               background: 'rgba(102, 126, 234, 0.2)',
//               borderTop: '1px solid rgba(102, 126, 234, 0.3)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               fontSize: '0.75rem',
//               color: '#d1d5db',
//             }}>
//               <span>📝 Selected: "{selectedText.substring(0, 40)}..."</span>
//               <button
//                 onClick={() => setSelectedText('')}
//                 style={{
//                   background: 'transparent',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   fontSize: '1rem',
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//           )}

//           <div style={{
//             padding: '1.5rem',
//             borderTop: '1px solid rgba(255,255,255,0.1)',
//             display: 'flex',
//             gap: '0.75rem',
//           }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a question..."
//               disabled={isLoading}
//               style={{
//                 flex: 1,
//                 padding: '0.75rem 1rem',
//                 background: 'rgba(255,255,255,0.05)',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 borderRadius: '0.75rem',
//                 color: 'white',
//                 fontSize: '0.875rem',
//                 outline: 'none',
//               }}
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={isLoading || !input.trim()}
//               style={{
//                 padding: '0.75rem 1rem',
//                 background: !input.trim() 
//                   ? 'rgba(102, 126, 234, 0.3)'
//                   : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 borderRadius: '0.75rem',
//                 cursor: !input.trim() ? 'not-allowed' : 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 transition: 'all 0.3s',
//                 opacity: !input.trim() ? 0.5 : 1
//               }}
//             >
//               <Send size={20} color="white" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default function PhysicalAILanding() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
//     const handleScroll = () => setScrollY(window.scrollY);
//     document.addEventListener('mousemove', handleMouse);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       document.removeEventListener('mousemove', handleMouse);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
//       color: 'white',
//       position: 'relative',
//       overflow: 'hidden',
//     }}>
//       <div style={{
//         position: 'fixed',
//         top: '1rem',
//         right: '1rem',
//         zIndex: 999
//       }}>
//         {user ? (
//           <UserMenu user={user} onLogout={handleLogout} />
//         ) : (
//           <button
//             onClick={() => setShowLoginModal(true)}
//             style={{
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               padding: '0.75rem 1.5rem',
//               cursor: 'pointer',
//               fontSize: '15px',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.5rem',
//               boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//               transition: 'transform 0.2s'
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             <LogIn size={18} />
//             Login / Sign Up
//           </button>
//         )}
//       </div>

//       <LoginModal 
//         isOpen={showLoginModal} 
//         onClose={() => setShowLoginModal(false)}
//         onLoginSuccess={handleLoginSuccess}
//       />

//       <div style={{
//         position: 'fixed',
//         left: mousePosition.x / 50,
//         top: mousePosition.y / 50 + scrollY / 10,
//         transition: 'all 0.3s ease-out',
//         pointerEvents: 'none',
//         opacity: 0.1,
//       }}>
//         <Bot size={256} color="#a855f7" />
//       </div>

//       <section style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '2rem 1rem',
//         position: 'relative',
//         zIndex: 10,
//       }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
//           <div style={{ flex: 1, minWidth: '300px' }}>
//             <h1 style={{
//               fontSize: 'clamp(2.5rem, 6vw, 4rem)',
//               fontWeight: '800',
//               marginBottom: '1.5rem',
//               background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)',
//               WebkitBackgroundClip: 'text',
//               backgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}>
//               Physical AI & Humanoid Robotics
//             </h1>
//             <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '2rem' }}>
//               Master the art of building intelligent robots that understand and interact with the physical world. Try selecting any text on this page!
//             </p>
//             {user && (
//               <div style={{
//                 marginTop: '1rem',
//                 padding: '0.75rem 1rem',
//                 background: 'rgba(102, 126, 234, 0.1)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(102, 126, 234, 0.3)',
//                 display: 'inline-block'
//               }}>
//                 👋 Welcome back, <strong>{user.name}</strong>!
//               </div>
//             )}
//           </div>

//           <div style={{ flex: 1, minWidth: '300px' }}>
//             <img 
//               src="https://www.tlciscreative.com/wp-content/uploads/2025/03/A_futuristic_humanoid_robot_with_electronic_skin.jpg"
//               alt="Robot"
//               style={{
//                 width: '100%',
//                 borderRadius: '1.5rem',
//                 marginBottom: '2rem',
//                 boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.5)',
//               }}
//             />
            
//             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//               <a href="#modules" style={{
//                 padding: '1rem 2rem',
//                 background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)',
//                 borderRadius: '9999px',
//                 fontWeight: '600',
//                 color: 'white',
//                 textDecoration: 'none',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//               }}>
//                 Start Learning <Rocket size={20} />
//               </a>
//               <a href="#modules" style={{
//                 padding: '1rem 2rem',
//                 background: 'rgba(255,255,255,0.1)',
//                 borderRadius: '9999px',
//                 fontWeight: '600',
//                 color: 'white',
//                 textDecoration: 'none',
//                 border: '2px solid rgba(255,255,255,0.2)',
//               }}>
//                 View Modules
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="modules" style={{ padding: '5rem 1rem', position: 'relative', zIndex: 10 }}>
//         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//           <h2 style={{
//             fontSize: '3rem',
//             fontWeight: '700',
//             textAlign: 'center',
//             marginBottom: '1rem',
//             background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             Course Modules
//           </h2>
//           <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '4rem', fontSize: '1.125rem' }}>
//             13 weeks of comprehensive learning from basics to advanced robotics
//           </p>

//           <div style={{
//             display: 'grid',
//             gap: '2rem',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           }}>
//             {modules.map((module, i) => (
//               <ModuleCard key={i} module={module} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section style={{ padding: '5rem 1rem', position: 'relative', zIndex: 10 }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <h2 style={{
//             fontSize: '2.5rem',
//             fontWeight: '700',
//             textAlign: 'center',
//             marginBottom: '2rem',
//             background: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
//             WebkitBackgroundClip: 'text',
//             backgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}>
//             Technologies You'll Master
//           </h2>
//           <div style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '1rem',
//             justifyContent: 'center',
//           }}>
//             {['ROS 2', 'Python', 'Gazebo', 'Unity', 'NVIDIA Isaac', 'OpenAI', 'PyTorch', 'Computer Vision'].map((tech, i) => (
//               <div key={i} style={{
//                 padding: '0.75rem 1.5rem',
//                 background: 'rgba(102, 126, 234, 0.1)',
//                 border: '1px solid rgba(102, 126, 234, 0.3)',
//                 borderRadius: '9999px',
//                 color: '#a78bfa',
//                 fontWeight: '600',
//               }}>
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section style={{ padding: '5rem 1rem', position: 'relative', zIndex: 10 }}>
//         <div style={{
//           maxWidth: '800px',
//           margin: '0 auto',
//           background: 'rgba(102, 126, 234, 0.1)',
//           padding: '3rem',
//           borderRadius: '1.5rem',
//           border: '1px solid rgba(102, 126, 234, 0.3)',
//           textAlign: 'center',
//         }}>
//           <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
//             Ready to Build the Future?
//           </h2>
//           <p style={{ color: '#d1d5db', marginBottom: '2rem', fontSize: '1.125rem' }}>
//             Join thousands of students learning Physical AI and Humanoid Robotics
//           </p>
//           <a href="#modules" style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             padding: '1rem 2rem',
//             background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)',
//             borderRadius: '9999px',
//             fontWeight: '600',
//             color: 'white',
//             textDecoration: 'none',
//             fontSize: '1.125rem',
//           }}>
//             Start Your Journey Now <Rocket size={20} />
//           </a>
//         </div>
//       </section>

//       <GeminiChatbot />
//     </div>
//   );
// }










