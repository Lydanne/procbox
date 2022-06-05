import { Entity, Enum, OneToOne, Property } from "@mikro-orm/core";
import { Common } from "./CommonEntity";
import { Service } from "./ServiceEntity";
// import { Service } from "./ServiceEntity";

export enum ProcessStatus {
  STOPPED = "stopped",
  STARTING = "starting",
  STARTED = "started",
  STOPPING = "stopping",
  DEAD = "dead",
  RUNNING = "running",
}

export enum ProcessMode {
  NORMAL = "normal",
  CLUSTER = "cluster",
  CONTAINER = "container",
}

export enum ProcessType {
  SERVER = "server",
  GATEWAY = "gateway",
  PLUGIN = "plugin",
}

@Entity()
export class Process extends Common {
  @Property()
  name!: string;

  @Property()
  pid?: number;

  @Enum()
  type: ProcessType = ProcessType.SERVER;

  @Enum()
  mode: ProcessMode = ProcessMode.NORMAL;

  @Enum()
  status: ProcessStatus = ProcessStatus.STARTED;

  @Property()
  restartCount: number = 0;

  @Property()
  cpuUsage: number = 0;

  @Property()
  memoryUsage: number = 0;

  @Property()
  user: string = "";

  @Property()
  port!: number;

  @OneToOne(() => Service, (service) => service.process)
  service?: Service;

  constructor() {
    super();
  }
}
