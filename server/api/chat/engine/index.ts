import {
  SimpleDocumentStore,
  storageContextFromDefaults,
  VectorStoreIndex,
} from "llamaindex";
import { STORAGE_CACHE_DIR } from "./shared";

export async function getDataSource() {
  const isDev = process.env.NODE_ENV === "development";
  const storageContext = await storageContextFromDefaults({
    persistDir: isDev ? STORAGE_CACHE_DIR : undefined,
  });

  const numberOfDocs = Object.keys(
    (storageContext.docStore as SimpleDocumentStore).toDict(),
  ).length;
  if (numberOfDocs === 0) {
    return null;
  }
  return await VectorStoreIndex.init({
    storageContext,
  });
}
