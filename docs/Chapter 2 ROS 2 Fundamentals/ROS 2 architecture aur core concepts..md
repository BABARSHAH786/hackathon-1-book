---
title: "2.1 ROS 2 Architecture and Core Concepts"
sidebar_position: 2
---

## Learning Objectives

- Comprehend the distributed architecture of ROS 2 and its underlying principles
- Understand the role and functionality of the Data Distribution Service (DDS) as ROS 2's middleware
- Analyze the node-based computational graph model and its benefits for robotic system design
- Explore Quality of Service (QoS) policies and their application in ROS 2 communication
- Recognize how ROS 2's architecture enables real-time, reliable, and secure robotic systems

## The Distributed Architecture of ROS 2

Unlike ROS 1, which relied on a centralized master node to coordinate all communication, ROS 2 employs a fully distributed peer-to-peer architecture. This fundamental shift eliminates single points of failure and enables more robust, scalable systems.

### Peer-to-Peer Discovery

In ROS 2, nodes discover each other automatically through a process called "discovery." When a new node starts, it announces its presence to the network, and existing nodes respond with their own information. This discovery mechanism is handled by the DDS layer and happens continuously, allowing nodes to join and leave the system dynamically without disrupting other components.

The discovery process works through multicast communication on the local network. Each node periodically sends announcements containing:
- Its unique identifier
- Available topics (publishers and subscribers)
- Offered services
- Advertised actions
- Quality of Service requirements

This decentralized approach means that any node can communicate directly with any other node once discovery is complete, without routing through a central coordinator.

### Benefits of Distributed Architecture

**Fault Tolerance:** If any single node crashes, the rest of the system continues operating. This is critical for production robots where uptime and reliability are paramount.

**Scalability:** Systems can grow from a single computer to multiple machines seamlessly. A humanoid robot might run sensor processing on an edge device, control loops on a real-time processor, and AI inference on a GPU workstation.

**Network Partitioning:** Robots can operate in environments with intermittent connectivity. If network connections are lost and then restored, nodes automatically rediscover each other and resume communication.

**Reduced Latency:** Direct peer-to-peer communication eliminates the overhead of routing through a central node, reducing message latency—crucial for real-time control.

## Data Distribution Service (DDS)

At the heart of ROS 2's communication architecture is the Data Distribution Service (DDS), an industry-standard middleware for distributed systems. DDS was originally developed for military and aerospace applications where reliability and real-time performance are mission-critical.

### What is DDS?

DDS is a publish-subscribe communication protocol that provides:
- Discovery of data producers and consumers
- Delivery of data with configurable QoS guarantees
- Data filtering and content-based routing
- Time synchronization across distributed systems
- Security through authentication and encryption

ROS 2 abstracts the complexity of DDS, allowing developers to work with familiar ROS concepts while benefiting from DDS's robust underlying implementation.

### DDS Implementations

ROS 2 supports multiple DDS implementations, giving users flexibility to choose based on their requirements:

**Fast DDS (eProsima):** Default implementation, excellent performance, and open-source
**CycloneDDS (Eclipse):** Lightweight, minimal memory footprint, ideal for embedded systems
**Connext DDS (RTI):** Enterprise-grade with advanced tooling and support
**GurumDDS:** Specialized for real-time systems with deterministic behavior

Users can switch between implementations without changing application code, thanks to ROS 2's abstraction layer. This allows developers to optimize for different deployment scenarios—research prototypes might use Fast DDS for ease of setup, while production systems might use Connext DDS for enterprise support.

## The Computational Graph Model

ROS 2 represents a robotic system as a computational graph where nodes are vertices and communication channels are edges. This graph-based model provides a powerful abstraction for designing and debugging complex systems.

### Nodes

A node is the fundamental computational unit in ROS 2—a process that performs computation. Examples include:
- A camera driver node that publishes image data
- A perception node that processes images to detect objects
- A planning node that computes navigation paths
- A control node that sends commands to motors

Nodes are designed to be modular and focused on a single responsibility. This modularity enables:
- **Reusability:** A well-designed camera driver can be used across different robots
- **Testability:** Individual nodes can be tested in isolation
- **Parallel Development:** Team members can work on different nodes simultaneously
- **Language Flexibility:** Nodes can be written in Python or C++ and communicate seamlessly

### Communication Patterns

ROS 2 provides three primary communication patterns, each suited to different use cases:

#### 1. Topics (Publish-Subscribe)
Topics are named communication channels where nodes can publish messages and subscribe to receive them. This is the most common pattern for streaming sensor data.

**Example:** A LiDAR sensor node publishes laser scan data on the `/scan` topic, and multiple nodes (localization, obstacle detection, mapping) subscribe to process this data simultaneously.

**Characteristics:**
- One-to-many communication (one publisher, multiple subscribers)
- Asynchronous and non-blocking
- No acknowledgment of message receipt
- Ideal for continuous data streams

#### 2. Services (Request-Response)
Services provide synchronous request-response communication. A client node sends a request to a service server and waits for a response.

**Example:** A motion planning node calls a service to check if a proposed path collides with obstacles, receiving a boolean response.

**Characteristics:**
- One-to-one communication
- Synchronous (client waits for response)
- Suitable for occasional transactions
- Server may be busy serving other requests

#### 3. Actions (Goal-Oriented)
Actions are designed for long-running tasks that require feedback and the ability to cancel. They extend the service pattern with ongoing status updates.

**Example:** A robot navigation action where the goal is a target position, feedback includes current progress, and the result indicates success or failure.

**Characteristics:**
- Goal, feedback, and result messages
- Can be preempted (cancelled)
- Suitable for tasks taking seconds to minutes
- Multiple actions can be tracked simultaneously

## Quality of Service (QoS) Policies

One of ROS 2's most powerful features is configurable Quality of Service policies that allow fine-grained control over communication behavior. QoS policies address the reality that different types of data have different reliability and timing requirements.

### Key QoS Policies

#### Reliability
**Reliable:** All messages are guaranteed to arrive (using TCP-like acknowledgments)
**Best Effort:** Messages may be lost (similar to UDP), but with lower overhead

*Use Case:* Sensor data like laser scans can tolerate occasional dropped messages (Best Effort), while commands to actuators must be delivered reliably (Reliable).

#### Durability
**Volatile:** Only messages published after subscription are received
**Transient Local:** Late-joining subscribers receive recent historical messages

*Use Case:* A robot's map should be available to nodes that start after the map is published (Transient Local), while real-time sensor data doesn't need history (Volatile).

#### History
**Keep Last N:** Store only the N most recent messages
**Keep All:** Store all messages until delivered

*Use Case:* High-frequency sensor data uses Keep Last 10 to prevent memory overflow, while important commands might use Keep All.

#### Lifespan
Specifies how long a message is considered valid.

*Use Case:* A "robot battery low" message might have a lifespan of 60 seconds—if not processed within that time, it expires and is discarded.

### QoS Profiles

ROS 2 provides predefined QoS profiles for common scenarios:
```python
# Sensor data profile: Best effort, volatile, small history
sensor_qos = QoSProfile(
    reliability=QoSReliabilityPolicy.BEST_EFFORT,
    durability=QoSDurabilityPolicy.VOLATILE,
    history=QoSHistoryPolicy.KEEP_LAST,
    depth=10
)

# System default: Reliable, volatile, keep last 10
default_qos = QoSProfile(
    reliability=QoSReliabilityPolicy.RELIABLE,
    durability=QoSDurabilityPolicy.VOLATILE,
    history=QoSHistoryPolicy.KEEP_LAST,
    depth=10
)

# Parameters profile: Reliable, transient local, keep all
parameter_qos = QoSProfile(
    reliability=QoSReliabilityPolicy.RELIABLE,
    durability=QoSDurabilityPolicy.TRANSIENT_LOCAL,
    history=QoSHistoryPolicy.KEEP_ALL
)
```

Understanding and correctly applying QoS policies is essential for building robust, performant robotic systems. Mismatched QoS between publishers and subscribers can lead to no communication occurring—a common source of confusion for ROS 2 beginners.

## Security Architecture

ROS 2 includes security features built on DDS Security, providing authentication, access control, and encryption.

### SROS 2 (Secure ROS 2)

SROS 2 enables:
- **Authentication:** Verify the identity of nodes using X.509 certificates
- **Access Control:** Define which nodes can publish/subscribe to specific topics
- **Encryption:** Protect data in transit using AES encryption

While security is optional and often disabled for development, it becomes critical for production deployments, especially for robots operating in public spaces or handling sensitive data.

## Execution Management

ROS 2 uses executors to manage how callbacks (message handlers, timer callbacks, service responses) are executed:

**Single-Threaded Executor:** All callbacks execute sequentially on one thread (default, simple to reason about)

**Multi-Threaded Executor:** Callbacks execute in parallel on multiple threads (better performance, requires thread-safe code)

**StaticSingleThreadedExecutor:** Optimized for real-time performance with pre-allocated memory

Choosing the right executor depends on your performance requirements and whether your callback functions are thread-safe.

## Lifecycle Management

ROS 2 introduces managed nodes with explicit lifecycle states (Unconfigured, Inactive, Active, Finalized). This enables controlled startup and shutdown sequences—crucial for robots with complex initialization procedures.

For example, a camera node might:
1. **Configure:** Load parameters and allocate resources
2. **Activate:** Start capturing images
3. **Deactivate:** Stop capture but keep resources allocated
4. **Cleanup:** Release resources and prepare for shutdown

## Key Takeaways

- ROS 2's fully distributed architecture eliminates single points of failure and enables scalable, fault-tolerant systems
- Data Distribution Service (DDS) provides the robust, real-time communication foundation underlying ROS 2
- Multiple DDS implementations allow optimization for different deployment scenarios
- The computational graph model with nodes and communication edges provides clear system architecture
- Three communication patterns—topics, services, and actions—address different interaction needs
- Quality of Service (QoS) policies enable fine-grained control over reliability, durability, and timing
- Built-in security features support authentication, access control, and encryption for production deployments
- Proper executor and lifecycle management ensure efficient and controlled node execution

---

## Self-Assessment

Test your understanding of ROS 2 architecture:

### Question 1
What is the primary advantage of ROS 2's distributed architecture compared to ROS 1's master-based system?

A) It requires less computational resources  
B) It eliminates single points of failure  
C) It is easier to program  
D) It only works on Linux  

### Question 2
Which middleware standard does ROS 2 use for communication?

A) MQTT  
B) ZeroMQ  
C) DDS (Data Distribution Service)  
D) HTTP/REST  

### Question 3
Which QoS reliability policy would be most appropriate for high-frequency sensor data where occasional message loss is acceptable?

A) Reliable  
B) Best Effort  
C) Guaranteed  
D) Transient Local  

### Question 4
What is a node in ROS 2?

A) A physical robot component  
B) A computational process that performs a specific task  
C) A network switch  
D) A type of message format  

### Question 5
Which communication pattern is best suited for a long-running task that requires progress updates and cancellation capability?

A) Topic (publish-subscribe)  
B) Service (request-response)  
C) Action (goal-oriented)  
D) Parameter  

<details>
<summary>Click to reveal answers</summary>

**Answer Key:**
1. **B** - ROS 2's distributed architecture eliminates the master node, which was a single point of failure in ROS 1. If the master crashed, the entire system would fail
2. **C** - ROS 2 is built on the Data Distribution Service (DDS) standard, which provides reliable, real-time, publish-subscribe communication
3. **B** - Best Effort reliability allows occasional message loss but has lower overhead, making it ideal for high-frequency sensor data where a few dropped messages don't significantly impact system behavior
4. **B** - A node is an independent process that performs computation—such as reading sensors, processing data, or controlling actuators
5. **C** - Actions are specifically designed for long-running tasks, providing goal submission, periodic feedback, and cancellation capabilities—perfect for tasks like navigation or complex manipulations

**Scoring Guide:**
- 5/5: Excellent! You understand ROS 2 architecture deeply
- 4/5: Great work! Review the missed concept
- 3/5: Good foundation. Re-read sections on QoS and communication patterns
- 2/5 or below: Recommended to review this chapter carefully, as architecture understanding is crucial

</details>

---

## Next Steps

With a solid understanding of ROS 2's architecture, you're ready to dive into practical implementation. Continue to [Nodes, Topics, Services, and Actions](./nodes-topics-services.md) to learn how to build communicating components.

---