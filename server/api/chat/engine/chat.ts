import { ContextChatEngine, Settings, ReplicateLLM, ALL_AVAILABLE_REPLICATE_MODELS } from "llamaindex";
import { getDataSource } from "./index";

export async function createChatEngine(model?: string) {
  const index = await getDataSource();
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`,
    );
  }
  const retriever = index.asRetriever();
  retriever.similarityTopK = 3;

  Settings.llm = new ReplicateLLM({
    model: model as keyof typeof ALL_AVAILABLE_REPLICATE_MODELS,
  });

  return new ContextChatEngine({
    // chatModel: Settings.llm,
    retriever,
  });
}
