import { createHub } from "../hub";
import useConfig from "./useConfig";

export function useConfigHub() {
  return createHub().hub(useConfigHub).provide(useConfig).export(useConfig);
}
