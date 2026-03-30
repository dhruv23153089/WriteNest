import { Client, ExecutionMethod, Functions } from "appwrite";
import conf from "../conf/conf.js";

export class AssistantService {
  client = new Client();
  functions;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.functions = new Functions(this.client);
  }

  createError(message, userMessage) {
    const error = new Error(message);
    error.userMessage = userMessage;
    return error;
  }

  async chat(messages) {
    if (!conf.appwriteAssistantFunctionId) {
      throw this.createError(
        "Appwrite assistant function ID not configured",
        "The WriteNest Assistant is not configured yet. Add the Appwrite assistant function ID to enable chat."
      );
    }

    const execution = await this.functions.createExecution({
      functionId: conf.appwriteAssistantFunctionId,
      body: JSON.stringify({ messages }),
      async: false,
      path: "/chat",
      method: ExecutionMethod.POST,
      headers: {
        "content-type": "application/json",
      },
    });

    if (!execution.responseBody) {
      throw this.createError(
        "Assistant function returned an empty response",
        "The WriteNest Assistant is unavailable right now. Please try again in a moment."
      );
    }

    let payload;

    try {
      payload = JSON.parse(execution.responseBody);
    } catch {
      throw this.createError(
        "Assistant function returned invalid JSON",
        "The WriteNest Assistant returned an unreadable response. Please try again in a moment."
      );
    }

    if (execution.responseStatusCode >= 400 || payload.error) {
      throw this.createError(
        payload.error || `Assistant function failed with status ${execution.responseStatusCode}`,
        payload.userMessage ||
          "The WriteNest Assistant is unavailable right now. Please try again in a moment."
      );
    }

    if (!payload.reply) {
      throw this.createError(
        "Assistant function response is missing a reply",
        "The WriteNest Assistant did not return a message. Please try again."
      );
    }

    return payload.reply;
  }
}

export default new AssistantService();
