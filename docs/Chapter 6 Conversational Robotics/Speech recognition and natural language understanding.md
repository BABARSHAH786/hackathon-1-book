# 6.2 Speech recognition and natural language understanding
## **Topic: Speech Recognition and Natural Language Understanding (NLU)**

---

# 📘 **Chapter: Speech Recognition & NLU for Conversational Robotics**

## 🔹 **Introduction**
Conversational robotics allows robots to **understand and respond** to human speech naturally. This involves two main components:
1. **Speech Recognition (ASR)** – Converts spoken words into text.
2. **Natural Language Understanding (NLU)** – Interprets text to extract meaning, intent, and context.

This chapter explains how these components work together to enable interactive, voice-controlled robots.

---

# 🧠 **1. Speech Recognition (ASR)**
### **Definition:**
Automatic Speech Recognition (ASR) converts audio signals from microphones into readable text.

### **Key Steps:**
- Audio signal acquisition (mic input)
- Preprocessing (noise reduction, normalization)
- Feature extraction (MFCC, spectrogram)
- Model inference (Deep Learning or HMM-based)
- Output as text

### **Popular Tools / APIs:**
- Google Speech-to-Text
- Microsoft Azure Speech
- NVIDIA Riva
- Open-source: Mozilla DeepSpeech, Whisper

---

# 🧠 **2. Natural Language Understanding (NLU)**
### **Definition:**
NLU processes text to determine **intent, entities, and context**.

### **Key Steps:**
- Tokenization & normalization
- Part-of-speech tagging
- Named Entity Recognition (NER)
- Intent classification
- Dialogue state tracking

### **Popular Tools / APIs:**
- Rasa NLU
- Dialogflow
- LUIS (Microsoft)
- OpenAI GPT / Transformers

---

# 🌀 **3. Conversational Robotics Pipeline (Workflow Diagram)**
```
Microphone Input (Audio)
        │
        ▼
  Speech Recognition (ASR)
        │
        ▼
Text Output (Transcript)
        │
        ▼
  Natural Language Understanding (NLU)
        │
        ├── Extract Intent
        ├── Extract Entities
        └── Context Processing
        │
        ▼
 Dialogue Manager / Decision Logic
        │
        ▼
  Robot Action / Response
```

---

# 🎯 **4. Integration in Robots**
### Steps:
1. **Audio Input**: Capture voice using a microphone array.
2. **ASR Module**: Convert speech to text in real-time.
3. **NLU Module**: Analyze text, extract commands and intent.
4. **Decision / Dialogue Manager**: Determine robot response.
5. **Action Execution**: Robot moves, speaks, or interacts accordingly.

### **Example Commands:**
- “Pick up the red box” → Robot picks object.
- “Move to the left” → Robot navigates left.
- “Tell me the temperature” → Robot speaks sensor reading.

---

# 🧩 **5. Python Example using SpeechRecognition + Rasa NLU**
```python
import speech_recognition as sr
from rasa_nlu.model import Interpreter

# Initialize recognizer
recognizer = sr.Recognizer()

# Load Rasa NLU interpreter
interpreter = Interpreter.load("models/nlu")

# Capture audio
with sr.Microphone() as source:
    print("Say something:")
    audio = recognizer.listen(source)
    text = recognizer.recognize_google(audio)
    print("You said:", text)

# NLU processing
result = interpreter.parse(text)
print("Intent:", result['intent'])
print("Entities:", result['entities'])
```

---

# 🏭 **6. Real-World Applications**
- Home assistant robots (Alexa, Google Home)
- Customer service robots
- Elderly care robots
- Educational robots
- Industrial voice-controlled machines

---

# 📝 **7. Self Assignment**
### **Tasks:**
1. Set up a microphone input in Python.
2. Use Google Speech-to-Text API to transcribe speech.
3. Install Rasa NLU and create basic intents (greet, move, pick).
4. Connect ASR output to Rasa NLU to detect intent.
5. Print detected intent and entities for 5 sample voice commands.

---

# ❓ **8. MCQs (Multiple Choice Questions)**

### **Q1. ASR stands for?**
A. Automatic Speech Recognition  
B. Artificial Syntax Response  
C. Audio Signal Relay  
D. Automated System Robot

### **Q2. NLU extracts?**
A. Intent and entities  
B. Only grammar  
C. File formats  
D. Hardware signals

### **Q3. Which Python library can capture audio?**
A. speech_recognition  
B. numpy  
C. matplotlib  
D. pandas

### **Q4. Dialogue manager in robots decides?**
A. Hardware maintenance  
B. Robot actions / responses  
C. WiFi settings  
D. Camera resolution

### **Q5. Intent classification in NLU does?**
A. Translates audio to text  
B. Determines user’s goal from text  
C. Captures images  
D. Measures distance

---

# ✅ **Correct Answers**
1. **A** – Automatic Speech Recognition
2. **A** – Intent and entities
3. **A** – speech_recognition
4. **B** – Robot actions / responses
5. **B** – Determines user’s goal from text

---

This completes the **Speech Recognition & NLU** chapter for Conversational Robotics.

