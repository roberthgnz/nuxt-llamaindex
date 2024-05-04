import { Message, StreamingTextResponse } from "ai";
import { ChatMessage, MessageContent } from "llamaindex";
import { createChatEngine } from "./engine/chat";
import { initSettings } from "./engine/settings";
import { LlamaIndexStream } from "./llamaindex-stream";

initSettings();

const convertMessageContent = (
  textMessage: string,
  imageUrl: string | undefined,
): MessageContent => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: "text",
      text: textMessage,
    },
    {
      type: "image_url",
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messages, data }: { messages: Message[]; data: any } = body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== "user") {
      throw createError(
        {
          statusCode: 400,
          message:
            "messages are required in the request body and the last message must be from the user",
        },
      );
    }

    const session = await useSession(event, {
      password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
    });

    const chatEngine = await createChatEngine(session.data.model);

    const userMessageContent = convertMessageContent(
      userMessage.content,
      data?.imageUrl,
    );

    const response = await chatEngine.chat({
      message: userMessageContent,
      chatHistory: messages as ChatMessage[],
      stream: true,
    });

    const { stream, data: streamData } = LlamaIndexStream(response, {
      parserOptions: {
        image_url: data?.imageUrl,
      },
    });

    return new StreamingTextResponse(stream, {}, streamData);
  } catch (error) {
    console.error("[LlamaIndex]", error);
    throw createError(
      {
        statusCode: 500,
        message: (error as Error).message,
      },
    );
  }
})
