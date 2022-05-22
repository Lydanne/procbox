import { Common } from "./CommonEntity";
import { ProxyRecord } from "./ProxyRecordEntity";

export enum ServeStatus {
  STOPPED = "stopped",
  STARTING = "starting",
  STARTED = "started",
  STOPPING = "stopping",
  DEAD = "dead",
  RUNNING = "running",
}

export class Serve extends Common {
  name!: string;

  pid!: number;

  status: ServeStatus = ServeStatus.STARTED;

  port!: number;

  subapps?: ProxyRecord[];

  constructor() {
    super();
  }
}
