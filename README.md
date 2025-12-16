## AI Learning Assistant – Frontend (`ai-learning-assistant-fe`)

React + TanStack Router/Query frontend for the AI Learning Assistant application.  
It provides the UI for uploading documents, chatting with the AI tutor, generating flashcards/quizzes, and tracking learning progress.

---

## Tech Stack

- **Runtime**: Bun
- **Framework**: React + TypeScript
- **Routing**: TanStack Router
- **Data fetching**: TanStack Query
- **Styling**: Tailwind CSS

---

## Getting Started

### 1. Install dependencies

```bash
cd ai-learning-assistant-fe
bun install
```

### 2. Environment variables

Create a `.env` file in the `ai-learning-assistant-fe` directory based on the template below:

```bash
VITE_API_URL=http://localhost:3000
NODE_ENV=development
```

- **`VITE_API_URL`**: Base URL of the backend API (adjust for production).
- **`NODE_ENV`**: `development` or `production`.

### 3. Run the development server

```bash
bun --bun run start
```

By default this will start the Vite dev server (commonly `http://localhost:5173`).

---

## Scripts

```bash
# Start dev server
bun --bun run start

# Build for production
bun --bun run build

# Preview production build
bun --bun run preview

# Run tests
bun --bun run test

# Lint, format, and type-check
bun --bun run lint
bun --bun run format
bun --bun run check
```

---

## Project Structure (high level)

- `src/routes` – Route files for TanStack Router
- `src/pages` – Feature pages/views
- `src/components` – Reusable UI components
- `src/layouts` – Layouts (main layout, authenticated layout, etc.)
- `src/services` – API client wrappers
- `src/stores` – Global client-side state
- `src/utils` – Utility functions and helpers

---

## Notes

- Make sure `VITE_API_URL` matches the URL where your backend is running.  
- For production, build with `bun --bun run build` and deploy the generated `dist` folder to your hosting platform.




