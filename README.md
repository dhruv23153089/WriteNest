# WriteNest

WriteNest is a React and Appwrite blogging platform with authentication, post management, TinyMCE editing, and an AI-powered assistant for navigation and writing help.

## Features

- Appwrite authentication for signup, login, logout, and current-user sessions
- Post creation, editing, deletion, and detail pages
- Featured image uploads with Appwrite Storage
- Rich-text editing with TinyMCE and a textarea fallback
- Protected routes for content management
- WriteNest Assistant chatbot powered by an Appwrite Function and OpenRouter

## Stack

- React 19
- Vite 7
- React Router DOM 7
- Redux Toolkit
- React Hook Form
- Tailwind CSS
- Appwrite
- TinyMCE
- OpenRouter via Appwrite Function

## Architecture

The repo has two runtime boundaries:

1. Frontend app in `src/`
2. Server-side assistant function in `appwrite-functions/write-nest-assistant/`

### Frontend

Important folders:

- `src/pages` route-level screens
- `src/components` shared UI and form pieces
- `src/appwrite` Appwrite client wrappers
- `src/store` Redux auth state
- `src/conf/conf.js` environment mapping

### Assistant backend

The chatbot no longer calls AI providers directly from the browser.

Instead:

1. `src/components/ChatBot.jsx` builds chat history
2. `src/appwrite/openai.js` executes the Appwrite Function
3. `appwrite-functions/write-nest-assistant/src/main.js` calls OpenRouter securely on the server side

This keeps the OpenRouter API key out of the frontend bundle.

## Routes

- `/` home page showing active posts
- `/login` login page
- `/signup` signup page
- `/all-posts` protected archive of all posts
- `/add-post` protected create-post page
- `/edit-post/:slug` protected edit-post page
- `/post/:slug` public post detail page

## Appwrite requirements

You need these Appwrite resources:

- one project
- one database
- one posts collection
- one storage bucket
- one function named `write-nest-assistant`

Expected document fields:

- `title`
- `content`
- `featuredimage`
- `status`
- `userid`

## Environment variables

Frontend `.env`:

```env
VITE_APPWRITE_URL="https://your-appwrite-endpoint/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
VITE_APPWRITE_ASSISTANT_FUNCTION_ID="write-nest-assistant"
VITE_TINYMCE_API_KEY="your_tinymce_api_key"
```

Assistant function variables in Appwrite:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL=openrouter/free`

## Local development

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

Lint the frontend:

```bash
npm run lint
```

## Deploying the assistant function

This repo includes an Appwrite CLI manifest at `appwrite.config.json`.

From the repo root:

```bash
appwrite login
appwrite push functions
```

Then add the function variables in the Appwrite Console and redeploy if needed.

A fuller walkthrough is in `APPWRITE_ASSISTANT_FUNCTION_SETUP.md`.

## Project structure

```text
WriteNest/
+-- appwrite.config.json
+-- APPWRITE_ASSISTANT_FUNCTION_SETUP.md
+-- appwrite-functions/
|   +-- write-nest-assistant/
|       +-- package.json
|       +-- src/
|           +-- main.js
+-- public/
|   +-- logo.png
+-- src/
|   +-- appwrite/
|   |   +-- auth.js
|   |   +-- config.js
|   |   +-- openai.js
|   +-- components/
|   +-- conf/
|   +-- pages/
|   +-- store/
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- package.json
+-- README.md
```

## Notes

- Home shows active posts only.
- All Posts is the protected archive for active and inactive content.
- The chatbot is available from the main app shell.
- `.env` should stay out of version control. If secrets were committed earlier, rotate them.

## Quality snapshot

The project structure is generally solid for a small Appwrite-based app:

- routing and auth boundaries are easy to follow
- service wrappers are separated from UI code
- the new chatbot backend boundary is much safer than a browser-side API key

Main areas still worth improving:

- add automated tests for auth, post CRUD, and the assistant flow
- add clearer user-facing error states across page loads and form submissions
- rename `src/appwrite/openai.js` to something provider-neutral like `assistant.js`
- remove unused starter assets such as `src/assets/react.svg` and `public/vite.svg` if they are no longer needed
