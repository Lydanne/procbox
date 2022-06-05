import { Process } from "../database/entities/ProcessEntity";
import { defHook, useHub } from "../hub";
import useDatabase from "../database/useDatabase";

export interface StartDto extends Omit<Process, "id"> {}

export default defHook(function useProcessManager() {
  const { inject, isLoadedProvide } = useHub();
  const { processRepo } = useDatabase();

  const ps = () => {
    return processRepo().findAll();
  };

  const start = async (processDto: StartDto) => {
    const process = processRepo().create(processDto);
    process.pid = 1;
    await processRepo().persistAndFlush(process);
    return process;
  };

  return {
    ps,
    start,
  };
});
