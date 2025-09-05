# TO-DO List Application Technical Assessment

This is my submission for the Corellian Software technical assessment. Built a basic task manager with ASP.NET Core GraphQL backend and Next.js frontend, all containerized with Docker.

## Requirements Met

✅ ASP.NET Core backend with GraphQL  
✅ Task entity (id, title, description, status)  
✅ GraphQL mutations: createTask, updateTaskStatus  
✅ GraphQL query: getAllTasks  
✅ Entity Framework Core with SQLite  
✅ React frontend with Adobe React Spectrum  
✅ Relay GraphQL client integration  
✅ Docker containers for all services  
✅ Docker Compose orchestration

## Tech Stack

**Backend:**

ASP.NET Core 9.0
HotChocolate GraphQL
Entity Framework Core
SQLite database

**Frontend:**

Next.js 15 with TypeScript
Adobe React Spectrum UI components
Relay GraphQL client
Tailwind CSS

**Infrastructure:**

Docker multi-stage builds
Docker Compose
Persistent SQLite storage

## Quick Start

Just need Docker installed:

```bash
# Clone and run
git clone <repo-url>
cd todo-app
docker-compose up --build
```

**Access:**

Frontend: http://localhost:3007
GraphQL: http://localhost:5001/graphql

## Local Dev (if you want)

```bash
# Backend
cd backend/TodoApi && dotnet run

# Frontend
cd frontend && npm install && npm run dev
```

## GraphQL API

**Queries:**

`getAllTasks` gets all tasks
`getTaskById(id: Int!)` get one task

**Mutations:**

`createTask(input: CreateTaskInput!)` make new task
`updateTaskStatus(input: UpdateTaskStatusInput!)` change status
`deleteTask(id: Int!)` remove task

**Task Type:**

```graphql
type TaskItem {
  id: Int!
  title: String!
  description: String
  status: TaskStatus! # PENDING or COMPLETED
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

## My AI-Assisted Development Process

Had about an hour to build this, so I used multiple AI tools to speed things up. Here's what I used and how it went:

### Planning (Google Gemini 2.5 Pro)

Started with Gemini to break down requirements and pick tech stack. Asked it about GraphQL vs REST, which frontend framework, SQLite vs Postgres, etc. Pretty good at weighing trade-offs recommended HotChocolate for .NET GraphQL, suggested Adobe React Spectrum over custom components for accessibility, and SQLite for simplicity.

**What worked:** Got solid architectural advice quickly. Good at explaining why certain choices make sense.
**What didn't:** Sometimes over-engineered simple things. Had to push back on complex patterns.

### Code Implementation (Cursor with Roo Coder)

Used Cursor for most of the actual coding. Really fast at generating boilerplate entity models, GraphQL resolvers, Docker configs, etc.

**What worked:** Crazy fast code generation. Understood modern patterns (dependency injection, async/await). Good at following established conventions.
**What didn't:** Sometimes generated overly complex code with attributes that didn't compile. Had to simplify the GraphQL implementation.

### Code Review (CodeRabbit)

Set up automated reviews to catch issues. Found some security stuff I missed, performance improvements, style consistency.

**What worked:** Caught missing input validation, suggested better Docker practices, found CORS issues.
**What didn't:** Sometimes flagged things that were actually fine. Had to learn to ignore some suggestions.

### Infrastructure (Claude Code)

Used Claude Code for server setup and deployment stuff. Good at systematic approach to infrastructure.

**What worked:** Handled Docker configs well, good at security practices, systematic deployment approach.
**What didn't:** Can be overly cautious sometimes, adds complexity where simple solutions work fine.

## Development Workflow

### How I Approached This

1. **Requirements breakdown** Used Gemini to understand what needed to be built and pick the right tools
2. **Backend first** Started with data models and GraphQL API since frontend depends on it
3. **Iterative building** Got basic functionality working before adding features
4. **Fix as you go** Used CodeRabbit to catch issues early rather than debug later
5. **Containerize everything** Docker makes deployment consistent

### Problem Solving Process

When I hit issues (like HotChocolate compilation errors), my approach was:

Try the AI suggested complex solution first
If it doesn't work, simplify and remove advanced features
Get basic functionality working, then add complexity later
Use multiple AI tools to cross check solutions

This saved time versus trying to debug complex generated code.

## What Could Be Better

### Performance Stuff

Right now it's pretty basic no caching, simple queries
Could add Redis for caching, database indexing, query optimization
Docker builds could be smaller with better layer caching

### Missing Features

No authentication (would add JWT or similar)
No real time updates (GraphQL subscriptions would be cool)
Basic error handling (should add proper validation)
No tests (ran out of time, but would add unit/integration tests)

### Production Considerations

Use Postgres instead of SQLite
Add proper logging and monitoring
Environment specific configs
CI/CD pipeline
Load balancing if needed

## Honest Take on AI Development

### What Actually Worked

**Speed**: Cut development time way down. Would have taken 3 4 hours manually, did it in about 40 minutes
**Boilerplate**: AI is great at generating repetitive code models, configs, Docker files
**Catching mistakes**: CodeRabbit found several issues I would have missed
**Architecture advice**: Gemini helped make good technology choices upfront

### What Was Annoying

**Over complexity**: AI loves to add features and abstractions you don't need
**Compilation errors**: Generated code often doesn't compile on first try
**Tool switching**: Mental overhead jumping between different AI tools
**False confidence**: AI suggests things with confidence that are totally wrong

### Real Lessons Learned

1. **Start simple**: Always try the simplest solution first, add complexity later
2. **Verify everything**: AI generated code needs human review, especially for security
3. **Know when to stop**: Don't let AI over engineer simple problems
4. **Mix and match**: Different AI tools are good at different things use the right one for each job

### Would I Use AI Again?

Absolutely. For rapid prototyping and getting something working quickly, it's a game changer. But you still need to understand the code and make good architectural decisions. AI is a very good junior developer fast but needs supervision.

The key is knowing when to trust AI suggestions and when to push back and keep things simple.

Total time: 50 minutes (40 minutes build/test + 10 minutes deployment)
