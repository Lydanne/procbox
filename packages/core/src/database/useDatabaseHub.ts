import { createHub } from "../hub";
import useDatabase from "./useDatabase";

export function useDatabaseHub() {
  return createHub()
    .hub(useDatabaseHub)
    .provide(useDatabase)
    .export(useDatabase);
}
