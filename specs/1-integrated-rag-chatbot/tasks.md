# Tasks: Integrated RAG Chatbot

**Input**: Design documents from `/specs/1-integrated-rag-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan in src/
- [ ] T002 Initialize Python project with FastAPI, OpenAI SDK, Qdrant client, Neon Postgres driver dependencies
- [ ] T003 [P] Configure linting and formatting tools (ruff, black) for backend

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Setup database schema and migrations framework for Neon Postgres in src/backend/database/
- [ ] T005 [P] Setup Qdrant connector and embedding storage framework in src/backend/database/qdrant_connector.py
- [ ] T006 [P] Setup environment configuration management with proper secret handling
- [ ] T007 Create base models/entities that all stories depend on (User, Query, Response)
- [ ] T008 Configure error handling and logging infrastructure in src/backend/main.py
- [ ] T009 Setup authentication framework with JWT tokens in src/backend/middleware/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - General Book Q&A (Priority: P1) 🎯 MVP

**Goal**: Enable users to ask questions about textbook content and receive AI-generated responses grounded in the book's information

**Independent Test**: Can be fully tested by entering a question about textbook content and receiving a response grounded in the book's information

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for POST /ask endpoint in tests/contract/test_ask_endpoint.py
- [ ] T011 [P] [US1] Integration test for RAG flow in tests/integration/test_rag_flow.py

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create User model in src/backend/models/user.py
- [ ] T013 [P] [US1] Create Query model in src/backend/models/query.py
- [ ] T014 [P] [US1] Create Response model in src/backend/models/response.py
- [ ] T015 [US1] Implement RAG service in src/backend/services/rag_service.py (depends on T005)
- [ ] T016 [US1] Implement embedding service in src/backend/services/embedding_service.py
- [ ] T017 [US1] Implement POST /ask endpoint in src/backend/api/endpoints/ask.py
- [ ] T018 [US1] Add validation and error handling for RAG queries
- [ ] T019 [US1] Add logging for RAG operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Selected Text Q&A (Priority: P1)

**Goal**: Enable users to ask questions specifically about selected/highlighted text in the textbook to get more focused answers related to that specific content

**Independent Test**: Can be fully tested by selecting text in the textbook and asking a question related to that text, receiving a response specifically based on the selected content

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] Contract test for selected text query in tests/contract/test_selected_text.py
- [ ] T021 [P] [US2] Integration test for selected text flow in tests/integration/test_selected_text_flow.py

### Implementation for User Story 2

- [ ] T022 [P] [US2] Update Query model to include selected text field in src/backend/models/query.py
- [ ] T023 [US2] Enhance RAG service to use selected text context in src/backend/services/rag_service.py
- [ ] T024 [US2] Implement POST /ask endpoint handling of selected text in src/backend/api/endpoints/ask.py
- [ ] T025 [US2] Add validation for selected text context in queries

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Embedded Chat Interface (Priority: P2)

**Goal**: Provide a chat interface that is embedded directly in the Docusaurus textbook interface, allowing users to interact without leaving the textbook page

**Independent Test**: Can be fully tested by using the chat window embedded in the Docusaurus textbook interface without navigating to a different page or application

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US3] Unit tests for chat interface components in tests/frontend/test_chat_widget.js
- [ ] T027 [P] [US3] Integration test for chat-frontend with backend in tests/frontend/test_integration.js

### Implementation for User Story 3

- [ ] T028 [P] [US3] Create ChatInterface component in src/frontend/chat_widget/ChatInterface.jsx
- [ ] T029 [P] [US3] Create MessageRenderer component in src/frontend/chat_widget/MessageRenderer.jsx
- [ ] T030 [US3] Implement docusaurus-chatbot-plugin in src/frontend/docusaurus-plugin/docusaurus-chatbot-plugin.js
- [ ] T031 [US3] Connect frontend components to backend API endpoints
- [ ] T032 [US3] Add CSS styling for embedded chat interface

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Personalization (Priority: P3)

**Goal**: Enable responses that are adapted to user's technical background to improve comprehension

**Independent Test**: Can be tested by logging in for the first time, providing background information, and observing that subsequent responses are adjusted for the user's technical level

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T033 [P] [US4] Contract test for user profile management in tests/contract/test_user_profile.py
- [ ] T034 [P] [US4] Integration test for personalization flow in tests/integration/test_personalization.py

### Implementation for User Story 4

- [ ] T035 [P] [US4] Update User model to include personalization fields in src/backend/models/user.py
- [ ] T036 [US4] Create PersonalizedChapter model in src/backend/models/personalized_chapter.py
- [ ] T037 [US4] Implement GET /user/{user_id} endpoint in src/backend/api/endpoints/user.py
- [ ] T038 [US4] Implement PUT /user/{user_id} endpoint in src/backend/api/endpoints/user.py
- [ ] T039 [US4] Implement POST /personalize-chapter endpoint in src/backend/api/endpoints/personalization.py
- [ ] T040 [US4] Enhance RAG service with personalization logic in src/backend/services/rag_service.py

**Checkpoint**: All user stories should now be functional with personalization features

---

[Add more user story phases as needed, following the same pattern]

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T041 [P] Documentation updates in docs/
- [ ] T042 Code cleanup and refactoring
- [ ] T043 Performance optimization across all stories
- [ ] T044 [P] Additional unit tests in tests/unit/
- [ ] T045 Security hardening and input validation
- [ ] T046 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Depends on US1 components (T012-T019 completed)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Can integrate with US1/US2 but should be independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for POST /ask endpoint in tests/contract/test_ask_endpoint.py"
Task: "Integration test for RAG flow in tests/integration/test_rag_flow.py"

# Launch all models for User Story 1 together:
Task: "Create User model in src/backend/models/user.py"
Task: "Create Query model in src/backend/models/query.py"
Task: "Create Response model in src/backend/models/response.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence