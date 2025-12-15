# 3.1 Gazebo simulation environment setup
## Gazebo Simulation Environment Setup

### Overview

Is module mein hum **Gazebo simulation environment** ko setup karna
seekhenge.\
Gazebo robotics researchers ke liye ek powerful 3D simulation
environment hai jisme robots ko physics-based world mein test kiya jata
hai.

------------------------------------------------------------------------

## Workflow Diagram

``` mermaid
flowchart TD
    A[Install ROS 2] --> B[Install Gazebo]
    B --> C[Create Workspace]
    C --> D[Add Simulation Packages]
    D --> E[Launch Gazebo World]
    E --> F[Spawn Robot Model]
    F --> G[Test Sensors & Physics]
```

------------------------------------------------------------------------

# Step-by-Step: Gazebo Setup for ROS 2

## **Step 1: Install Gazebo**

ROS 2 (Humble/Foxy) ke sath Gazebo automatically install ho jata hai,\
lekin manual installation ke liye:

``` bash
sudo apt update
sudo apt install gazebo
```

ROS 2 integration:

``` bash
sudo apt install ros-${ROS_DISTRO}-gazebo-ros-pkgs
```

------------------------------------------------------------------------

## **Step 2: Create a ROS 2 Workspace**

``` bash
mkdir -p ~/gazebo_ws/src
cd ~/gazebo_ws
colcon build
source install/setup.bash
```

------------------------------------------------------------------------

## **Step 3: Test Gazebo Installation**

``` bash
gazebo
```

A window open hogi jisme default empty world load hota hai.

------------------------------------------------------------------------

## **Step 4: Launch Gazebo with ROS 2**

Simple launch:

``` bash
ros2 launch gazebo_ros gazebo.launch.py
```

Yeh ROS 2 bridge ke sath Gazebo ko start karta hai.

------------------------------------------------------------------------

## **Step 5: Spawn a Robot in Gazebo**

Example (URDF file spawn):

``` bash
ros2 run gazebo_ros spawn_entity.py -file myrobot.urdf -entity my_robot
```

------------------------------------------------------------------------

## **Step 6: Add Custom World Files**

Create folder:

    my_worlds/
     └── test_world.world

Launch:

``` bash
gazebo test_world.world
```

------------------------------------------------------------------------

# Self-Assignment Tasks

1.  Gazebo ko install karke empty world launch karein.\
2.  Apna workspace create karein aur ROS-Gazebo integration test
    karein.\
3.  Ek simple URDF robot spawn karein.\
4.  Custom `.world` file create karein aur load karein.\
5.  Robot ke sensor plugins (camera/LiDAR) ko test karein.

------------------------------------------------------------------------

# MCQs (Multiple Choice Questions)

**1. Gazebo kis purpose ke liye use hota hai?**\
a) Video editing\
b) Game development\
c) 3D robot simulation\
d) Audio processing

**2. ROS 2 ke sath Gazebo integration package ka naam kya hai?**\
a) gazebo-connect\
b) ros2-gazebo-interface\
c) gazebo_ros_pkgs\
d) gazebo_robotics

**3. Gazebo ko launch karne ka command:**\
a) start_gazebo()\
b) gazebo\
c) run_gazebo\
d) ros2 start sim

**4. Robot spawn karne ke liye ROS 2 script:**\
a) add_robot.py\
b) spawn_model\
c) spawn_entity.py\
d) robot_create.py

**5. Gazebo world file ka extension:**\
a) .txt\
b) .world\
c) .sim\
d) .sdf

------------------------------------------------------------------------

# **Correct Answers**

1.  c\
2.  c\
3.  b\
4.  c\
5.  b
