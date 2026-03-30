const DEFAULT_MODEL = 'openrouter/free';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function getVariable(req, name) {
  return (
    req.variables?.[name] ||
    req.env?.[name] ||
    ''
  );
}

function createErrorResponse(res, message, userMessage, status = 500) {
  return res.json(
    {
      error: message,
      userMessage,
    },
    status
  );
}

export default async ({ req, res, error }) => {
  if (req.method !== 'POST') {
    return createErrorResponse(
      res,
      `Method ${req.method} is not allowed`,
      'The WriteNest Assistant only accepts chat requests.',
      405
    );
  }

  const openRouterApiKey = getVariable(req, 'OPENROUTER_API_KEY');
  const openRouterModel = getVariable(req, 'OPENROUTER_MODEL') || DEFAULT_MODEL;

  if (!openRouterApiKey) {
    return createErrorResponse(
      res,
      'OPENROUTER_API_KEY is not configured',
      'The assistant backend is not configured yet. Add the OpenRouter API key to the Appwrite function variables.',
      500
    );
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!messages.length) {
      return createErrorResponse(
        res,
        'No messages were provided',
        'The assistant request was empty. Please try sending your message again.',
        400
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'WriteNest Assistant',
      },
      body: JSON.stringify({
        model: openRouterModel,
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!response.ok) {
      const message = data.error?.message || 'OpenRouter API error';
      const userMessage =
        response.status === 401 || response.status === 403
          ? 'The OpenRouter API key is missing, invalid, or blocked for this model.'
          : response.status === 402
            ? 'The OpenRouter account needs credits or a different model before the assistant can respond.'
            : response.status === 429
              ? 'The assistant has reached the current OpenRouter rate or free-model limit. Please try again shortly.'
              : 'The assistant could not reach OpenRouter right now. Please try again in a moment.';

      return createErrorResponse(res, message, userMessage, response.status);
    }

    if (!reply) {
      return createErrorResponse(
        res,
        'OpenRouter returned an empty response',
        'The assistant did not return a message. Please try again.',
        502
      );
    }

    return res.json({ reply }, 200);
  } catch (caughtError) {
    error(caughtError.message || caughtError);

    return createErrorResponse(
      res,
      caughtError.message || 'Unexpected assistant function error',
      'The assistant backend is unavailable right now. Please try again in a moment.',
      500
    );
  }
};
