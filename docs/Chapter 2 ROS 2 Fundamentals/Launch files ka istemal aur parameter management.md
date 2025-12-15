# 2.4 Launch files and parameter management

## Launch Files & Parameter Management in ROS 2

### Overview

Is module mein hum ROS 2 ke **Launch files**, unka workflow, aur
**parameter management** ko detail mein seekhenge.\
Launch files multiple nodes ko ek saath run karne, parameters pass
karne, aur system configuration manage karne ke liye use hoti hain.

------------------------------------------------------------------------

## Workflow Diagram

``` mermaid
flowchart TD
    A[Define Nodes] --> B[Create Launch File]
    B --> C[Add Parameters]
    C --> D[Test Launch File]
    D --> E[Run Using ros2 launch]
    E --> F[Parameter Overrides<br>Dynamic Config]
```

------------------------------------------------------------------------

## Creating a Launch File in ROS 2 (Python Launch System)

### Step 1: Create Launch Folder

    my_python_pkg/
     ├── launch/
     ├── my_python_pkg/
     └── setup.py

------------------------------------------------------------------------

### Step 2: Create a Launch File

**File: `launch/my_launch.py`**

``` python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_python_pkg',
            executable='minimal_node',
            name='my_minimal_node',
            parameters=[{
                'robot_name': 'my_humanoid',
                'speed_limit': 1.5
            }]
        )
    ])
```

------------------------------------------------------------------------

## Running the Launch File

``` bash
ros2 launch my_python_pkg my_launch.py
```

------------------------------------------------------------------------

# Parameter Management in ROS 2

### Declaring Parameters

``` python
self.declare_parameter('robot_name', 'default_robot')
self.declare_parameter('speed_limit', 1.0)
```

------------------------------------------------------------------------

### Accessing Parameters

``` python
robot = self.get_parameter('robot_name').get_parameter_value().string_value
speed = self.get_parameter('speed_limit').get_parameter_value().double_value
self.get_logger().info(f"Robot: {robot}, Speed Limit: {speed}")
```

------------------------------------------------------------------------

### Overriding Parameters from CLI

``` bash
ros2 run my_python_pkg minimal_node --ros-args -p speed_limit:=2.0
```

------------------------------------------------------------------------

### Overriding Parameters Through Launch File

``` python
parameters=[{'speed_limit': 3.0}]
```

------------------------------------------------------------------------

# Self‑Assignment Tasks

1.  Apna custom launch file create karein jisme 2 nodes run ho rahe
    hon.\
2.  Ek parameter add karein jo robot ka mode change kare (e.g., "idle",
    "walk").\
3.  Launch file se parameter override kar ke test karein.\
4.  Node ke andar parameter ko dynamically log karna.\
5.  Launch folder ki documentation ready karein.

------------------------------------------------------------------------

# MCQs (Multiple Choice Questions)

**1. ROS 2 launch files mainly kis cheez ke liye use hoti hain?**\
a) File downloads\
b) Multiple nodes ko manage/run karna\
c) Audio processing\
d) Motor wiring

**2. Parameter declare karne ka sahi ROS 2 syntax kya hai?**\
a) new param()\
b) define_param()\
c) self.declare_parameter()\
d) create_parameter()

**3. Launch file run karne ka correct command:**\
a) ros2 start launch\
b) ros2 run launch\
c) ros2 launch\
d) start.launch

**4. Parameter override command line se kaise hota hai?**\
a) -param\
b) --ros-args -p\
c) set --value\
d) ros2-param

**5. Parameter ka value node ke andar kaise access hota hai?**\
a) get_param_value()\
b) self.get_parameter()\
c) param.read()\
d) get_value()
