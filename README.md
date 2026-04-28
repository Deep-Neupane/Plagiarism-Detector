PLAGIARISM DETECTOR

A web-based plagiarism detection system that compares documents and identifies 
plagiarized, paraphrased, and suspicious content.

================================================================================
TECH STACK
================================================================================

Frontend:
- React 18 + Vite
- Tailwind CSS for styling
- React Router for navigation

Backend:
- Node.js + Express.js
- PostgreSQL database
- Prisma ORM

Plagiarism Detection Algorithms:
- TF-IDF Cosine Similarity (detects semantic plagiarism and paraphrasing)
- Rabin-Karp Rolling Hash (detects exact copy-paste sections)
- Jaccard Similarity (optional, for edge cases)

================================================================================
PROJECT STRUCTURE
================================================================================

/backend
  Routes - API endpoints (auth, upload, check, results)
  Controllers - Request handlers
  Services - Core business logic (algorithms, auth, files)
  Models - Prisma schema and database models
  Middleware - Authentication and upload handling
  Utils - Helper functions and validators

/frontend
  Components - React UI components (upload, results, comparison)
  Pages - Full page components (login, register, dashboard, results)
  Services - API calls and auth utilities
  Hooks - Custom React hooks
  Context - Global state management
  Styles - CSS styling

/docs
  API.md - API documentation
  SETUP.md - Detailed setup instructions
  ALGORITHMS.md - Algorithm explanations
  AUTH.md - Authentication flow documentation

================================================================================
QUICK START
================================================================================

Prerequisites:
- Node.js (v16+)
- PostgreSQL
- Git

Setup Backend:
1. cd backend
2. npm install
3. Create .env file (copy from .env.example)
4. Update DATABASE_URL in .env
5. npx prisma migrate dev
6. npm start

Setup Frontend:
1. cd frontend
2. npm install
3. Create .env file (copy from .env.example)
4. npm run dev

Access the application at http://localhost:5173 (frontend)
Backend API runs at http://localhost:5000

================================================================================
FEATURES
================================================================================

User Authentication:
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs

File Upload:
- Upload up to 60 documents per session
- Support for text and PDF files
- Session-based file management

Plagiarism Detection:
- Pairwise document comparison
- Multiple detection algorithms
- Detailed match reporting with exact locations

Results Display:
- Summary table of all matches sorted by similarity score
- Side-by-side document compar