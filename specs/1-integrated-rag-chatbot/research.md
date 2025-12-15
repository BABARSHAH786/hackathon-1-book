# Research: Integrated RAG Chatbot

## Phase 0: Technical Research and Decision Making

### Decision: Authentication Method
**Rationale**: For the integrated RAG chatbot, OAuth2 with third-party providers (Google, GitHub) is chosen to provide a frictionless sign-in experience while maintaining security. This approach allows users to quickly access personalized features without creating a new account specifically for the textbook.

**Alternatives considered**:
- Username/password authentication: More familiar but requires account creation
- JWT tokens: Stateless but requires token management
- No authentication: Simpler but limits personalization features

### Decision: OpenAI GPT Model Selection
**Rationale**: Using OpenAI's GPT-4 Turbo for the Q&A functionality as it provides a good balance between cost, performance, and capability for educational content. It offers 128K context window which is suitable for processing retrieved textbook content along with user queries.

**Alternatives considered**:
- GPT-3.5 Turbo: Less expensive but more limited in reasoning capabilities
- GPT-4: More capable but significantly more expensive
- Alternative LLMs (Claude, Gemini): Would add additional complexity and API management

### Decision: Vector Database Implementation
**Rationale**: Qdrant Cloud Free Tier is selected for storing textbook embeddings as it provides managed, scalable vector storage with good similarity search capabilities. The free tier should be sufficient for the textbook content size and anticipated usage.

**Alternatives considered**:
- Pinecone: Good alternative but different API and pricing model
- Weaviate: Open-source option but would require self-hosting
- ChromaDB: Good for prototyping but less suitable for production

### Decision: Frontend Integration Approach
**Rationale**: Developing the chatbot as a Docusaurus plugin ensures seamless integration with the textbook while maintaining the existing deployment workflow. This approach allows the chat interface to be embedded directly in textbook pages.

**Alternatives considered**:
- Iframe embedding: Isolates the component but creates communication overhead
- Standalone React application: More complex to integrate with textbook pages
- Native Docusaurus component: More tightly coupled but better user experience

### Decision: Session and State Management
**Rationale**: Using JWT tokens for session management ensures stateless authentication while maintaining security. Sessions are stored in the backend with JWT as the authentication method for API calls.

**Alternatives considered**:
- Server-side sessions: More traditional but requires additional infrastructure
- Client-side storage: Less secure for authentication purposes
- Third-party session management: Additional dependency with potential vendor lock-in

### Decision: Embedding Granularity
**Rationale**: Text chunks of 300-500 tokens provide sufficient context for the LLM while maintaining relevance to specific concepts in the textbook. This size balances between having enough context and avoiding mixing unrelated concepts.

**Alternatives considered**:
- Smaller chunks: More precise but might miss important context
- Larger chunks: More context but might include unrelated information
- Dynamic chunking: More complex but might adapt better to content structure

### Need to Resolve:
- Specific deployment configuration for FastAPI backend
- Rate limiting strategy for OpenAI API calls
- Error handling and fallback procedures for when the AI doesn't find relevant information