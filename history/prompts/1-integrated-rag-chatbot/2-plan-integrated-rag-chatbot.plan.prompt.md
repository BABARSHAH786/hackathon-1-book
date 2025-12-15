---
id: 2
title: Plan Integrated RAG Chatbot
stage: plan
date: 2025-12-09
surface: agent
model: gpt-4
feature: 1-integrated-rag-chatbot
branch: 1-integrated-rag-chatbot
user: user
command: sp.plan
labels: ["rag", "chatbot", "docusaurus", "qdrant", "openai"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-integrated-rag-chatbot/spec.md
 - specs/1-integrated-rag-chatbot/plan.md
 - specs/1-integrated-rag-chatbot/research.md
 - specs/1-integrated-rag-chatbot/data-model.md
 - specs/1-integrated-rag-chatbot/quickstart.md
 - specs/1-integrated-rag-chatbot/contracts/api-contracts.md
 - QWEN.md
tests:
 - null
---

## Prompt

```
---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh qwen`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan  RAG Chatbot Specification (Plain Version)

Overview
A RAG (Retrieval-Augmented Generation) chatbot will be integrated inside a Docusaurus-based textbook. The chatbot can answer questions using only the book's content. It also supports answering questions based on user-selected text inside the book.

Core Technologies

OpenAI Agents / ChatKit SDK (AI engine)

FastAPI (backend API)

Qdrant Cloud Free Tier (vector database)

Neon Serverless Postgres (metadata + user data)

Docusaurus (frontend)

OpenAI Embeddings (embedding generation)

Core Features

Chatbot answers questions using RAG.

Chatbot answers questions using only selected text.

Chatbot is embedded in the Docusaurus website.

FastAPI backend handles embedding, retrieval, and responses.

Qdrant stores vector embeddings of the entire book.

Neon Postgres stores user history, personalization, and metadata.

Bonus Features

Personalization using BetterAuth signup and signin.

Collect background information from user.

Personalized chapter content using a button.

Urdu translation of chapters using a button.

Reusable intelligence via Claude Code Subagents and Agent Skills.

Non-Functional Requirements

Response time under 2 seconds.

Vector search latency under 200ms.

Secure API with authentication.

Scalable backend and vector store.

Embedding Pipeline

Split book chapters into 300–500 token chunks.

Generate embeddings using OpenAI embeddings model.

Store vectors in Qdrant with metadata (chapter, section, chunk id).

API Endpoints
POST /ask
Input: { query, selected_text (optional), user_id }
Output: { answer, sources }

POST /embed
Regenerates embeddings for chapters.

Deployment

Docusaurus deployed on GitHub Pages or Vercel.

FastAPI backend deployed on Railway / Render / Fly.io.

Qdrant Cloud for vector storage.

Neon Postgres for user data.
```

## Response snapshot

Successfully completed the implementation planning for the Integrated RAG Chatbot. The following artifacts have been created:

1. **plan.md**: Implementation plan with technical context, project structure, and constitution check
2. **research.md**: Research findings and technical decisions made during planning
3. **data-model.md**: Entity definitions for the system including User, ChatSession, UserQuery, AIResponse, TextEmbedding, and PersonalizedChapter
4. **api-contracts.md**: API contracts for endpoints like POST /ask and POST /embed
5. **quickstart.md**: Quickstart guide for setting up and running the integrated RAG chatbot
6. **QWEN.md**: Updated agent context file with information about the new technologies

The plan incorporates the required technologies (Python 3.11, FastAPI, OpenAI SDK, Qdrant client, Neon Postgres driver, Docusaurus) and follows the architectural requirements specified in the original feature description. The constitution check has been validated against the project's core principles.

## Outcome

- ✅ Impact: Complete planning for the RAG Chatbot feature with all required artifacts
- 🧪 Tests: N/A (Documentation)
- 📁 Files: plan.md, research.md, data-model.md, api-contracts.md, quickstart.md, QWEN.md
- 🔁 Next prompts: Ready for task creation with `/sp.tasks`
- 🧠 Reflection: The planning phase successfully established the technical foundation for implementing the RAG chatbot with proper data models, API contracts, and deployment guidelines.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A