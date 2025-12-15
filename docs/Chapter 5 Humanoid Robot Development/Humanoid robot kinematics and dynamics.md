# 5.1 Humanoid robot kinematics and dynamics
# **Chapter: Humanoid Robot Kinematics and Dynamics**

---

## 📘 **Introduction**
Humanoid robots insan jaisi body structure follow karte hain — jisme arms, legs, torso aur head hota hai. Unhen move karwane ke liye hum **Kinematics** aur **Dynamics** use karte hain.

- **Kinematics** → Robot kaha tak pohanch sakta hai (motion without forces)
- **Dynamics** → Robot motion ka relation forces aur torques ke sath

Yeh chapter humanoid motion planning ka foundation cover karta hai.

---

# 🤖 **1. What is Kinematics?**
Kinematics robot ki movement ko define karti hai **without force calculation**.

## Types of Kinematics:
### **1. Forward Kinematics (FK)**
Given: Joint angles → Find end-effector (hand/foot) position.

### **2. Inverse Kinematics (IK)**
Given: Target position → Find required joint angles.

Example: Agar humanoid robot ka hand target point (x, y, z) tak pohanchna hai → IK se joint rotations calculate hongi.

---

# 🦾 **2. What is Dynamics?**
Dynamics motion ka relation **mass, gravity, torque, and forces** ke sath batati hai.

### **Two Types:**
1. **Forward Dynamics** → Torques → Motion
2. **Inverse Dynamics** → Motion → Required torques

Example: Walking humanoid ko balance maintain karwana → dynamics essential.

---

# 🏗 **3. Humanoid Robot Body Model**
Humanoid robot structure:
- Head
- Torso
- Arms (shoulder, elbow, wrist)
- Legs (hip, knee, ankle)
- Feet

Every joint ka **degree of freedom (DOF)** hota hai.

Typical humanoid DOF = **25 to 40 DOF**

---

# 🌀 **4. Workflow Diagram: Humanoid Kinematics & Dynamics System**
```
   +----------------------------------------+
   |       Humanoid Robot Target Pose        |
   +----------------------+------------------+
                          |
                          v
   +----------------------------------------+
   |        Inverse Kinematics (IK)          |
   |  Calculate joint angles for target      |
   +----------------------+------------------+
                          |
                          v
   +----------------------------------------+
   |        Forward Kinematics (FK)          |
   |  Predict hand/leg position              |
   +----------------------+------------------+
                          |
                          v
   +----------------------------------------+
   |          Inverse Dynamics               |
   |  Compute required forces & torques      |
   +----------------------+------------------+
                          |
                          v
   +----------------------------------------+
   |        Robot Control & Execution        |
   |  Motors actuate movement                |
   +----------------------------------------+
```

---

# ⚙️ **5. Applications**
- Humanoid walking
- Balancing robots
- Object manipulation (hands)
- Dancing robots
- Healthcare assistive robots
- Industrial humanoid tasks

---

# 📝 **6. Self Assignment**
1. FK aur IK ke real-world examples search karo.
2. Isaac Sim me humanoid model import karo (NRMK, HSR, etc.).
3. Custom target pose banake IK se joint values calculate karo.
4. Walking gait cycle diagram draw karo.
5. Humanoid balance control ka research summary likho.

---

# ❓ **7. MCQs (Multiple Choice Questions)**

### **Q1. Forward Kinematics ka input kya hota hai?**
A. Torques  
B. Joint angles  
C. Target position  
D. Gravity

### **Q2. Inverse Dynamics se kya calculate hota hai?**
A. Joint angles  
B. Joint torques  
C. End-effector path  
D. Mass center

### **Q3. Humanoid robot kitne DOF average hotay hain?**
A. 3–4  
B. 10–12  
C. 25–40  
D. 100–150

### **Q4. Kinematics kis cheez ko ignore karta hai?**
A. Motion path  
B. Forces & torques  
C. Joint angles  
D. End-effector

### **Q5. IK ka major use kya hai?**
A. Stability checking  
B. Future prediction  
C. Target pose achieve karna  
D. Battery saving

---

# ✅ **Correct Answers**
1. **B** – Joint angles  
2. **B** – Joint torques  
3. **C** – 25–40  
4. **B** – Forces & torques  
5. **C** – Target pose achieve karna  

