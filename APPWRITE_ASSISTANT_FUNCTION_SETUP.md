# Appwrite Assistant Function Setup

This project now expects the chatbot request to go through an Appwrite Function instead of calling OpenRouter directly from the browser.

## Manifest

The repo now includes an Appwrite CLI manifest at:

`appwrite.config.json`

It defines a function with:

- id: `write-nest-assistant`
- runtime: `node-22`
- entrypoint: `src/main.js`
- path: `appwrite-functions/write-nest-assistant`

## 1. Push the function from this repo

From the project root:

```bash
appwrite login
appwrite push functions
```

If Appwrite asks which function to push, choose `write-nest-assistant`.

## 2. Add function environment variables

In the Appwrite Console, open the `write-nest-assistant` function and add:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`

Recommended value for `OPENROUTER_MODEL`:

`openrouter/free`

Redeploy the function after adding or changing variables.

## 3. Execute permissions

The manifest currently sets execute permission to:

- `any`

That keeps the chatbot usable for both guests and logged-in users. If you want to restrict usage, change the function permissions in Appwrite and redeploy.

## 4. Frontend wiring

The frontend is already configured to call:

```env
VITE_APPWRITE_ASSISTANT_FUNCTION_ID="write-nest-assistant"
```

Restart the Vite dev server after changing `.env`.

## 5. Test

1. Open the WriteNest app.
2. Open the chatbot.
3. Send a message.

If the function is configured correctly, the browser will call Appwrite, and Appwrite will call OpenRouter privately from the function runtime.
