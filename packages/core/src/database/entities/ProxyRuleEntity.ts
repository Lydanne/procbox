import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { Common } from "./CommonEntity";
import { Service } from "./ServiceEntity";

export enum ProxyStatus {
  CHECKING = "checking",
  STOPPED = "stopped",
  RUNNING = "running",
  DISABLED = "disabled",
}

export class KeyValue {
  key!: string;
  value!: string;
}

@Entity()
export class ProxyRule extends Common {
  @Property()
  name!: string;

  @ManyToOne()
  service!: Service;

  @Property()
  matchHeader: KeyValue[] = [];

  @Property()
  matchPath: string[] = [];

  @Property()
  matchHost: string[] = [];

  @Property()
  matchMethod: string[] = [];

  @Property()
  matchQuery: KeyValue[] = [];

  @Enum(() => ProxyStatus)
  status: ProxyStatus = ProxyStatus.CHECKING;

  constructor() {
    super();
  }
}
