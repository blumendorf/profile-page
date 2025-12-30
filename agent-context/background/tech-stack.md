# Technology Stack

A comprehensive overview of all languages, tools, technologies, and frameworks used in the most recent project.

Marco did not work on the Kotlin part.

---

## Programming Languages

| Language | Usage |
|----------|-------|
| **TypeScript** | Frontend, shared packages, E2E tests, Firestore rules tests |
| **Python** | Backend serverless functions (primary backend) |
| **Kotlin** | ONIX parser worker |
| **Java** | Additional functions |
| **HCL** | Infrastructure as Code (Terraform/Terragrunt) |
| **SQL** | Database queries (BigQuery, PostgreSQL) |

---

## Frontend

### Core

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | ^19.2.3 |
| **Language** | TypeScript | 5.5.4 |
| **Build Tool** | Vite | ^7.3.0 |
| **Styling** | Tailwind CSS | ^4.1.18 |
| **CSS Processing** | PostCSS | ^8.5.6 |

### UI Components & Libraries

| Technology | Purpose |
|------------|---------|
| **Radix UI** | Accessible UI primitives (dialog, dropdown, popover, tabs, tooltip, etc.) |
| **shadcn/ui** | Component system built on Radix |
| **Lucide React** | Icon library |
| **TipTap** | Rich text editor |
| **dnd-kit** | Drag and drop functionality |
| **react-day-picker** | Date picker component |
| **sonner** | Toast notifications |
| **react-dropzone** | File upload |

### State & Data Management

| Technology | Purpose |
|------------|---------|
| **TanStack Query (React Query)** | Server state, caching, background updates |
| **React Router DOM** | Client-side routing |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **Yup** | Schema validation (alternative) |

### Utilities

| Technology | Purpose |
|------------|---------|
| **date-fns** | Date manipulation |
| **lodash** | Utility functions |
| **uuid** | UUID generation |
| **clsx** | Class name utilities |
| **tailwind-merge** | Tailwind class merging |
| **class-variance-authority** | Variant management for components |
| **jwt-decode** | JWT token decoding |
| **file-saver** | File download handling |
| **exceljs** | Excel file generation |
| **csv42** | CSV processing |

### Integrations

| Technology | Purpose |
|------------|---------|
| **Firebase** | Authentication, Firestore client |
| **react-firebase-hooks** | React hooks for Firebase |
| **LaunchDarkly React SDK** | Feature flags |
| **Sentry** | Error tracking & monitoring |
| **i18next / react-i18next** | Internationalization |
| **next-themes** | Theme management |
| **react-markdown** | Markdown rendering |

### Development & Testing

| Technology | Purpose |
|------------|---------|
| **Vitest** | Test runner |
| **React Testing Library** | Component testing |
| **MSW** | API mocking |
| **Storybook** | Component development & documentation |
| **Chromatic** | Visual regression testing |
| **Playwright** | Browser automation |
| **Faker.js** | Test data generation |

---

## Backend (Python)

### Core

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Python | ~3.12.0 |
| **Framework** | Firebase Functions | ^0.4.3 |
| **Web Framework** | Flask | ^3.1.0 |
| **Functions Framework** | functions-framework | ^3.8.3 |
| **HTTP Server** | Gunicorn | ^23.0.0 |
| **Data Modeling** | Pydantic | ^2.11.7 |

### Google Cloud Services

| Technology | Purpose |
|------------|---------|
| **google-cloud-firestore** | Database client |
| **google-cloud-storage** | File storage |
| **google-cloud-pubsub** | Message queuing |
| **google-cloud-bigquery** | Analytics & data warehouse |
| **google-cloud-secret-manager** | Secrets management |
| **google-cloud-logging** | Centralized logging |
| **firebase-admin** | Firebase admin SDK |

### AI & Machine Learning

| Technology | Purpose |
|------------|---------|
| **OpenAI** | LLM capabilities |
| **Anthropic** | Claude LLM |
| **Google GenAI** | Google's generative AI |
| **Cohere** | Embeddings & reranking |
| **LangChain** | LLM orchestration framework |
| **LangChain OpenAI** | OpenAI LangChain integration |
| **LangChain Anthropic** | Anthropic LangChain integration |
| **LangChain Google GenAI** | Google LangChain integration |
| **LangChain Community** | Community integrations |
| **tiktoken** | Token counting |
| **NLTK** | Natural language processing |
| **Scikit-learn** | Machine learning utilities |

### Observability & Monitoring

| Technology | Purpose |
|------------|---------|
| **Langfuse** | LLM observability & tracing |
| **Sentry SDK** | Error tracking |
| **OpenTelemetry** | Distributed tracing |
| **LaunchDarkly Server SDK** | Feature flags |

### Data Processing

| Technology | Purpose |
|------------|---------|
| **Pandas** | Data manipulation |
| **NumPy** | Numerical computing |
| **SciPy** | Scientific computing |
| **openpyxl** | Excel file handling |
| **lxml** | XML processing |

### Document Processing

| Technology | Purpose |
|------------|---------|
| **pypdf** | PDF parsing |
| **docx2txt** | Word document extraction |
| **pypandoc** | Document format conversion |
| **pytesseract** | OCR |
| **Pillow** | Image processing |

### Visualization

| Technology | Purpose |
|------------|---------|
| **Plotly** | Interactive charts |
| **Matplotlib** | Static charts |
| **Seaborn** | Statistical visualization |
| **Kaleido** | Static image export for Plotly |

### Web & Networking

| Technology | Purpose |
|------------|---------|
| **requests** | HTTP client |
| **aiohttp** | Async HTTP client |
| **httpx** | Modern HTTP client |
| **pycurl** | cURL bindings |
| **requests-tor** | Tor network requests |
| **torpy** | Tor protocol implementation |

### Domain-Specific

| Technology | Purpose |
|------------|---------|
| **Typesense** | Search engine client |
| **Elasticsearch** | Search & semantic search |
| **onixcheck** | ONIX validation |
| **thefuzz** | Fuzzy string matching |
| **sacrebleu** | BLEU score evaluation |
| **regex** | Advanced regex |

### Code Quality

| Technology | Purpose |
|------------|---------|
| **Ruff** | Linting & formatting |
| **MyPy** | Static type checking |
| **Pytest** | Testing framework |
| **pytest-cov** | Coverage reporting |
| **pytest-mock** | Mocking utilities |

---

## Search & Data Infrastructure

| Technology | Purpose |
|------------|---------|
| **Typesense** | Primary search engine for products & trends |
| **Elasticsearch 9.x** | Semantic search with vector embeddings |
| **Kibana** | Elasticsearch visualization & management |
| **BigQuery** | Analytics, data warehousing, trends data |
| **PostgreSQL** | Relational data (Langfuse) |

---

## Cloud Infrastructure (GCP)

### Core Services

| Service | Purpose |
|---------|---------|
| **Cloud Firestore** | Primary NoSQL database |
| **Cloud Storage** | File & object storage |
| **Cloud Functions (Gen2)** | Serverless compute |
| **Cloud Tasks** | Task queuing |
| **Cloud Pub/Sub** | Message queuing & event streaming |
| **Secret Manager** | Secrets & credentials |
| **Cloud Logging** | Centralized logging |
| **BigQuery** | Data warehouse & analytics |
| **Eventarc** | Event-driven triggers |
| **Cloud Run** | Container execution |
| **Artifact Registry** | Container & package registry |
| **Cloud Scheduler** | Cron job scheduling |

### Firebase Services

| Service | Purpose |
|---------|---------|
| **Firebase Authentication** | User authentication |
| **Firebase Hosting** | Static site hosting |
| **Firestore Rules** | Database security |
| **Storage Rules** | File access control |

### Infrastructure as Code

| Technology | Purpose |
|------------|---------|
| **Terraform** | Infrastructure provisioning |
| **Terragrunt** | Terraform wrapper & DRY configurations |

---

## Kotlin Stack (ONIX Parser)

| Category | Technology | Version |
|----------|------------|---------|
| **Language** | Kotlin | 1.9.21 |
| **Build Tool** | Gradle | - |
| **JDK** | Java | 21 |
| **Cloud Functions** | functions-framework-api | 1.1.0 |
| **JSON Processing** | Jackson | 2.17.2 |
| **ONIX Parsing** | Jonix | 2025-04 |
| **Logging** | SLF4J | 2.0.13 |
| **Error Monitoring** | Sentry | 7.14.0 |
| **Testing** | JUnit 5 | 5.9.1 |
| **Mocking** | Mockito | 5.11.0 |
| **Linting** | Ktlint | 1.0.1 |

---

## Testing Stack

### Frontend Testing

| Technology | Purpose |
|------------|---------|
| **Vitest** | Unit & integration test runner |
| **React Testing Library** | Component testing utilities |
| **Testing Library User Event** | User interaction simulation |
| **Testing Library Jest DOM** | DOM matchers |
| **MSW (Mock Service Worker)** | API request mocking |
| **JSDOM** | DOM environment for tests |
| **Playwright** | Browser automation |

### E2E Testing

| Technology | Purpose |
|------------|---------|
| **Cypress** | End-to-end testing framework |
| **Testing Library Cypress** | Cypress queries like RTL |
| **cypress-parallel** | Parallel test execution |
| **cypress-multi-reporters** | Multiple report formats |
| **mocha-junit-reporter** | JUnit XML reports |

### Backend Testing

| Technology | Purpose |
|------------|---------|
| **Pytest** | Python test framework |
| **pytest-cov** | Coverage reporting |
| **pytest-mock** | Mocking utilities |
| **pytest-ruff** | Ruff integration |

### Visual & Regression Testing

| Technology | Purpose |
|------------|---------|
| **Chromatic** | Visual regression for Storybook |
| **Meticulous** | Visual testing automation |

### Firebase Testing

| Technology | Purpose |
|------------|---------|
| **@firebase/rules-unit-testing** | Firestore/Storage rules testing |
| **Firebase Emulators** | Local Firebase environment |
| **BigQuery Emulator** | Local BigQuery testing |

---

## Development Tools

### Package & Dependency Management

| Tool | Purpose |
|------|---------|
| **pnpm** | JavaScript package manager (v10.23.0) |
| **Turborepo** | Monorepo build system |
| **uv** | Python package manager |
| **Gradle** | Kotlin/Java build tool |

### Code Quality

| Tool | Purpose |
|------|---------|
| **ESLint** | JavaScript/TypeScript linting |
| **Prettier** | Code formatting |
| **Ruff** | Python linting & formatting |
| **MyPy** | Python static type checking |
| **Ktlint** | Kotlin linting |
| **TypeScript** | Static type checking |

### Git & Workflow

| Tool | Purpose |
|------|---------|
| **Husky** | Git hooks |
| **lint-staged** | Run linters on staged files |
| **pre-commit** | Python pre-commit hooks |

### Containerization

| Tool | Purpose |
|------|---------|
| **Docker** | Container runtime |
| **Docker Compose** | Multi-container orchestration |

### API & Code Generation

| Tool | Purpose |
|------|---------|
| **@hey-api/openapi-ts** | OpenAPI → TypeScript generation |
| **i18next-parser** | i18n key extraction |
| **nodemon** | File watching & auto-restart |

---

## CI/CD & DevOps

### Continuous Integration

| Technology | Purpose |
|------------|---------|
| **GitHub Actions** | CI/CD pipelines |
| **Reusable Workflows** | DRY workflow definitions |

### Workflow Components

- PR validation (linting, type checking, tests)
- Terraform validation & planning
- Frontend build & test
- Backend build & test
- E2E test execution
- Docker image building
- Deployment to dev/prod
- Typesense/Elasticsearch sync
- Emergency deployment workflows

### License Compliance

| Tool | Purpose |
|------|---------|
| **license_finder** | JavaScript license checking |
| **licensecheck** | Python license checking |
| **dependency-license-report** | Kotlin/Gradle license report |

---

## External Services & APIs

### AI & LLM Providers

| Service | Purpose |
|---------|---------|
| **OpenAI** | GPT models, embeddings, batch API |
| **Anthropic** | Claude models |
| **Google Generative AI** | Gemini models |
| **Cohere** | Embeddings, reranking |
| **HuggingFace** | Model hosting |

### Monitoring & Observability

| Service | Purpose |
|---------|---------|
| **Sentry** | Error tracking & performance |
| **Langfuse** | LLM observability & tracing |
| **Google Cloud Monitoring** | Infrastructure monitoring |

### Feature Management

| Service | Purpose |
|---------|---------|
| **LaunchDarkly** | Feature flags & experimentation |

### Development Services

| Service | Purpose |
|---------|---------|
| **Chromatic** | Visual testing & review |
| **Meticulous** | Visual regression testing |

---

## File Formats & Standards

| Format | Usage |
|--------|-------|
| **ONIX** | Book metadata exchange format |
| **OpenAPI/Swagger** | API specification |
| **JSON** | Data interchange, configuration |
| **YAML** | Configuration files |
| **XML** | ONIX files, data import |
| **CSV** | Data import/export |
| **Excel (XLSX)** | Reports, data import |
| **PDF** | Document processing |
| **DOCX** | Manuscript processing |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend                                 │
│  React + TypeScript + Vite + Tailwind + TanStack Query          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Firebase Services                            │
│  Authentication │ Firestore │ Storage │ Hosting                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Cloud Functions (Python)                       │
│  API │ Event Triggers │ Scheduled Jobs │ Background Tasks       │
└─────────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Typesense  │ │Elasticsearch│ │  BigQuery   │ │ Cloud Tasks │
│   Search    │ │  Semantic   │ │  Analytics  │ │   Queues    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI/LLM Services                             │
│  OpenAI │ Anthropic │ Google GenAI │ Cohere │ HuggingFace       │
└─────────────────────────────────────────────────────────────────┘
```

---

*Last updated: December 2024*

