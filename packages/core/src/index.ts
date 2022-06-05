import { createHub } from "./hub";
import { useConfigHub } from "./config/useConfigHub";
import { useDatabaseHub } from "./database/useDatabaseHub";
import useProcessManager from "./process-manager/useProcessManager";
import useServiceManager from "./service-manager/useServiceManager";

export function createProcboxCore(options: any) {
  const hub = createHub();
  hub.import(useConfigHub);
  hub.import(useDatabaseHub);
  hub.provide(useProcessManager);
  hub.provide(useServiceManager);
  return hub;
}
