# WriteNest

WriteNest is a React-based blogging application with a polished editorial-style UI, Appwrite-powered authentication and content storage, and a TinyMCE writing experience for creating and managing posts.

The project is built as a frontend-first app. There is no custom Node/Express backend in this repository. Instead, the app talks directly to Appwrite for:

- user authentication
- post storage
- image storage
- session management

## What The App Does

WriteNest gives authenticated users a personal publishing workspace where they can:

- create an account
- log in and log out
- create posts with title, slug, content, status, and featured image
- view active posts on the home page
- view all posts, including inactive ones, in the archive page
- open individual post detail pages
- edit their own posts
- delete their own posts

Logged-out visitors can still access the app shell, but protected content-management routes redirect them to login.

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router DOM 7
- Redux Toolkit
- React Redux
- React Hook Form
- Tailwind CSS
- TinyMCE React editor
- HTML React Parser

### Backend Services

- Appwrite Account API for signup, login, session, and current-user lookup
- Appwrite Databases API for blog post documents
- Appwrite Storage API for featured image uploads and previews

## Architecture Overview

This repository contains a single frontend application.

- UI layer: React components under `src/components`
- Page layer: route-driven screens under `src/pages`
- State layer: Redux auth state under `src/store`
- Service layer: Appwrite wrappers under `src/appwrite`
- Configuration layer: environment mapping in `src/conf/conf.js`

The app flow is:

1. Vite serves the React application.
2. `src/main.jsx` creates the router and Redux provider.
3. `src/App.jsx` checks the current Appwrite session on initial load.
4. Redux stores whether the user is authenticated.
5. Protected routes are guarded through `AuthLayout`.
6. Page components call Appwrite service helpers to read and write posts.

## Frontend Workflow

### App Bootstrap

`src/main.jsx` sets up:

- Redux `Provider`
- browser router via `createBrowserRouter`
- root layout through `App`

`src/App.jsx` performs the initial authentication sync:

- calls `authService.getCurrentUser()`
- dispatches `login` if a session exists
- dispatches `logout` if no session exists
- renders `Header`, `Outlet`, and `Footer` once loading finishes

### Routing

Current routes:

- `/` -> home page
- `/login` -> login screen
- `/signup` -> signup screen
- `/all-posts` -> protected list of all posts
- `/add-post` -> protected create-post page
- `/edit-post/:slug` -> protected edit-post page
- `/post/:slug` -> public post detail page

### Route Protection

`src/components/AuthLayout.jsx` protects routes using Redux auth state.

- Routes with `authentication={true}` require a logged-in user.
- Routes with `authentication={false}` are intended for guests.

Behavior:

- unauthenticated users trying to access protected routes are redirected to `/login`
- authenticated users trying to access guest-only auth pages are redirected to `/`

### Header And Navigation

`src/components/Header/Header.jsx` builds the navigation dynamically from auth state.

When logged out:

- Home
- Login
- Signup

When logged in:

- Home
- All Posts
- Add Post
- profile initial badge
- Logout button

### Home Page Flow

`src/pages/Home.jsx` now reacts to auth state.

- If the user is logged out, it clears local post state and shows the empty-state message.
- If the user is logged in, it fetches active posts through `service.getPosts()`.
- Only posts with `status = active` appear here by default.

This prevents previously loaded posts from remaining visible after logout.

### All Posts Flow

`src/pages/AllPosts.jsx` fetches posts with an empty query array:

- `service.getPosts([])`

That means it requests all posts from the Appwrite collection instead of filtering to active ones only.

This page is protected, so only authenticated users can open it.

### Post Detail Flow

`src/pages/Post.jsx`:

- reads the `slug` route param
- fetches the post document from Appwrite
- renders the featured image and parsed HTML content
- checks whether the logged-in user is the author

If the current user owns the post, the page shows:

- Edit button
- Delete button

Delete flow:

1. delete the post document
2. delete the associated image file
3. navigate back to `/`

### Create Post Flow

`src/pages/AddPost.jsx` renders `PostForm` with no initial post object.

In create mode, `src/components/post-form/PostForm.jsx`:

1. collects title, slug, content, status, and image
2. auto-generates the slug from the title
3. uploads the selected image to Appwrite Storage
4. gets the current user id
5. creates a document in Appwrite Databases
6. redirects to the new post detail page

Important current behavior:

- a featured image is effectively required for creating a post
- the post is only created after image upload succeeds

### Edit Post Flow

`src/pages/EditPost.jsx`:

- fetches the existing post by slug/id
- passes that post into `PostForm`

In edit mode, `PostForm`:

- pre-fills title, slug, content, and status
- optionally uploads a replacement image
- deletes the old image if a new one is uploaded
- updates the Appwrite document
- redirects to the updated post page

### Login Flow

`src/components/Login.jsx`:

1. collects email and password
2. calls `authService.login`
3. fetches the current user from Appwrite
4. stores the user in Redux
5. redirects to `/`

### Signup Flow

`src/components/Signup.jsx`:

1. collects name, email, and password
2. creates an Appwrite account
3. automatically creates a login session
4. fetches current user data
5. stores the user in Redux
6. redirects to `/`

### Logout Flow

`src/components/Header/LogoutBtn.jsx`:

1. deletes the current Appwrite session
2. dispatches Redux logout
3. redirects to `/`

## Backend Services

This app does not include an in-repo backend server. Appwrite acts as the backend platform.

### Authentication Service

File: `src/appwrite/auth.js`

Responsibilities:

- create account
- create email/password session
- read current logged-in user
- delete current session on logout

Methods:

- `createAccount({ email, password, name })`
- `login({ email, password })`
- `getCurrentUser()`
- `logout()`

### Database And Storage Service

File: `src/appwrite/config.js`

Responsibilities:

- create posts
- update posts
- delete posts
- fetch one post
- fetch many posts
- upload featured images
- delete featured images
- return preview/view URLs for images

Methods:

- `createPost(...)`
- `updatePost(...)`
- `deletePost(slug)`
- `getPost(slug)`
- `getPosts(queries)`
- `uploadFile(file)`
- `deleteFile(fileId)`
- `getFilePreview(fileId)`
- `getFileView(fileId)`

### Data Normalization

The service normalizes field naming differences between the frontend model and Appwrite document fields:

- `featuredimage` -> `featuredImage`
- `userid` -> `userId`

That allows the UI to use consistent camelCase fields even if the stored Appwrite schema uses lowercase names.

## Appwrite Data Model

Based on the current code, the post collection should support these fields:

- `title`
- `content`
- `featuredimage`
- `status`
- `userid`

The document id is the slug passed into `createDocument`, so the slug effectively becomes the post id.

The app expects:

- an Appwrite database
- a collection for articles/posts
- a storage bucket for featured images

## Environment Variables

The app reads configuration from Vite environment variables.

Required variables:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=
```

These are consumed through `src/conf/conf.js` and `src/components/RTE.jsx`.

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create or update `.env` with your Appwrite and TinyMCE values.

Example:

```env
VITE_APPWRITE_URL="https://your-appwrite-endpoint/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
VITE_TINYMCE_API_KEY="your_tinymce_api_key"
```

### 3. Start Development Server

```bash
npm install
npm run dev
```

Vite will start the local dev server, usually at:

```text
http://localhost:5173
```

### 4. Build For Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

### 6. Run Linting

```bash
npm run lint
```

## Project Structure

```text
WriteNest/
+-- public/
¦   +-- logo.png
¦   +-- vite.svg
+-- src/
¦   +-- appwrite/
¦   ¦   +-- auth.js
¦   ¦   +-- config.js
¦   +-- components/
¦   ¦   +-- Footer/
¦   ¦   +-- Header/
¦   ¦   +-- container/
¦   ¦   +-- post-form/
¦   ¦   +-- AuthLayout.jsx
¦   ¦   +-- Button.jsx
¦   ¦   +-- Input.jsx
¦   ¦   +-- Login.jsx
¦   ¦   +-- Logo.jsx
¦   ¦   +-- PostCard.jsx
¦   ¦   +-- RTE.jsx
¦   ¦   +-- Select.jsx
¦   ¦   +-- Signup.jsx
¦   ¦   +-- index.js
¦   +-- conf/
¦   ¦   +-- conf.js
¦   +-- pages/
¦   ¦   +-- AddPost.jsx
¦   ¦   +-- AllPosts.jsx
¦   ¦   +-- EditPost.jsx
¦   ¦   +-- Home.jsx
¦   ¦   +-- Login.jsx
¦   ¦   +-- Post.jsx
¦   ¦   +-- Signup.jsx
¦   +-- store/
¦   ¦   +-- authSlice.js
¦   ¦   +-- store.js
¦   +-- App.css
¦   +-- App.jsx
¦   +-- index.css
¦   +-- main.jsx
+-- index.html
+-- package.json
+-- tailwind.config.js
+-- vite.config.js
```

## UI And Styling Notes

The interface uses:

- Tailwind utility classes for layout and spacing
- custom CSS variables in `src/index.css`
- a dark editorial look with glassmorphism panels
- a `logo.png` favicon and brand image from `public/logo.png`

## Important Current Notes

- The app currently relies on Appwrite directly from the frontend.
- There is no separate backend server in this repository.
- TinyMCE falls back to a plain textarea if no API key is present.
- `public/vite.svg` still exists in the repo, but the favicon now points to `logo.png`.
- `.env` is currently tracked in this repository. If you plan to open-source or share the repo publicly, move secrets out of version control and rotate exposed keys.

## Possible Future Improvements

- add loading and error states across more pages
- add post ownership checks on edit routes before rendering the form
- add better empty-state handling for the all-posts page
- remove unused starter assets such as `vite.svg` if no longer needed
- move secrets out of the tracked `.env`
- add tests for auth flow and post CRUD flow

## Summary

WriteNest is a single-page blogging platform with:

- React and Vite on the frontend
- Redux for auth state
- Appwrite for authentication, data, and file storage
- TinyMCE for rich text editing
- protected content management routes for authenticated users

It is structured cleanly enough to keep growing into a fuller publishing dashboard without needing a custom backend server at this stage.
