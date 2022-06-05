import { createProcboxCore } from "../src";
import {
  ProcessMode,
  ProcessStatus,
  ProcessType,
} from "../src/database/entities/ProcessEntity";
import useProcessManager from "../src/process-manager/useProcessManager";

describe("procbox-core.ts", () => {
  it("should create a procbox", async () => {
    const procbox = createProcboxCore({});

    await procbox.init();

    const { start, ps } = procbox.inject(useProcessManager);

    await start({
      name: "pb-server",
      type: ProcessType.SERVER,
      mode: ProcessMode.NORMAL,
      status: ProcessStatus.STARTED,
      restartCount: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      user: "",
      port: 8080,
    });

    expect(await ps()).toBeInstanceOf(Array);

    procbox.close();
  });
});
