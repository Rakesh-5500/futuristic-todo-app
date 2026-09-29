# AstraTask (futuristic-todo-app)

AstraTask — futuristic cross-device todo studio.

This repo contains a Vite + React + TypeScript scaffold with:

- Firebase Authentication (Google)
- Firestore real-time sync (per-user todos)
- Theme toggle (light/dark)
- Exports: JSON, CSV
- Google Drive upload helper (requires Google API client configuration)
- Tailwind CSS for styling

Getting started

1. Install

   npm install

2. Create a Firebase project and enable Authentication (Google) and Firestore.

3. Add environment variables in a .env file at the project root:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

(Optionally) For Google Drive upload, configure an OAuth client id and add it to the app and follow Google Drive API docs.

4. Run

   npm run dev

Notes and next steps

- The Google Drive upload in this scaffold is a placeholder that alerts the user; to fully enable it you'll need to implement OAuth 2.0 (or use the gapi client) and perform a multipart upload to Drive.

- For multi-user list-sharing, add a shared collections/permissions model (e.g., "lists" collection with member uids) — the app currently stores per-user todos under users/{uid}/todos.

- Customize UI/UX animations and expand functionality (reminders, categories, attachments) as needed.
