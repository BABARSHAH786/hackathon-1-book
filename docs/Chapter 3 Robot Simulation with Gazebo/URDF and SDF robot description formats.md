# 3.2 URDF and SDF robot description formats

## URDF aur SDF Robot Description Formats ka Istemal

------------------------------------------------------------------------

## 🧩 **1. Introduction**

Is section mein hum robot simulation ke liye **URDF (Unified Robot
Description Format)** aur **SDF (Simulation Description Format)** ka
istemal seekhenge. Dono formats robot structure, joints, sensors aur
physical parameters define karne ke liye use hote hain.

------------------------------------------------------------------------

## 🤖 **2. URDF Kya Hai?**

URDF ek XML-based format hai jo robot ka:\
- Geometry\
- Joints\
- Links\
- Inertial properties\
describe karta hai.

### 🔸 Simple URDF Example

``` xml
<link name="base_link">
  <visual>
    <geometry>
      <box size="1 1 1"/>
    </geometry>
  </visual>
</link>
```

------------------------------------------------------------------------

## 🏗️ **3. SDF Kya Hai?**

SDF simulation-focused format hai.\
Yeh Gazebo ke liye optimized hota hai aur:

-   Physics
-   Sensors
-   Lights
-   Environment\
    DEFINE karta hai.

### 🔸 Simple SDF Example

``` xml
<model name="simple_box">
  <link name="box_link">
    <inertial>
      <mass>1</mass>
    </inertial>
    <visual>
      <geometry>
        <box><size>1 1 1</size></box>
      </geometry>
    </visual>
  </link>
</model>
```

------------------------------------------------------------------------

## 🔄 **4. Workflow Diagram (URDF → SDF → Gazebo Simulation)**

       [URDF File] 
            ↓ (Convert or Load)
       [SDF Format] 
            ↓ (Import)
       [Gazebo Simulation]
            ↓
       [Robot Visualization + Testing]

------------------------------------------------------------------------

## 🧪 **5. Practical Steps (One-by-One Workflow)**

### ✅ Step 1: Create URDF File

`my_robot.urdf` banayein aur robot ke links/joints define karein.

### ✅ Step 2: Test URDF

`check_urdf` tool se validation karein.

### ✅ Step 3: Convert URDF → SDF

Gazebo automatic convert ker leta hai ya aap script se convert kar sakte
ho.

### ✅ Step 4: Load in Gazebo

`gazebo my_robot.sdf`

### ✅ Step 5: Verify Simulation

Physics, collision aur sensors check karein.

------------------------------------------------------------------------

# 📘 **Self‑Assignment Time**

## **MCQs (Attempt Yourself)**

1.  URDF ka main purpose kya hota hai?\
    A. Physics simulation\
    B. Robot structure define karna\
    C. Environment creation\
    D. Networking

2.  SDF format ko kis simulator ke liye optimize kiya gaya hai?\
    A. Unity\
    B. Gazebo\
    C. RViz\
    D. ROSBridge

3.  URDF ki file ka format kya hota hai?\
    A. JSON\
    B. YAML\
    C. XML\
    D. TXT

4.  SDF me kis cheez ka detailed support URDF se zyada hota hai?\
    A. Basic geometry\
    B. Sensors aur physics\
    C. Only visuals\
    D. None

5.  URDF → SDF conversion kis stage per hota hai?\
    A. RViz visualization\
    B. Gazebo load time\
    C. Python script run karne per\
    D. ROS launch file run karne per

------------------------------------------------------------------------

# ✔️ **Correct Answers**

1.  B\
2.  B\
3.  C\
4.  B\
5.  B
