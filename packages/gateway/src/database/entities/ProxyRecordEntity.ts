import { Common } from "./CommonEntity";
import { Serve } from "./ServeEntity";

export enum ProxyStatus {
  CHECKING = "checking",
  STOPPED = "stopped",
  RUNNING = "running",
  DISABLED = "disabled",
}

export class ProxyRecord extends Common {
  rootPath: string = "";

  configPath: string = "";

  name!: string;

  port!: number;

  serve!: Serve;

  pid: number = 0;

  status: ProxyStatus = ProxyStatus.CHECKING;

  constructor() {
    super();
  }
}
