import { Collection, Entity, OneToOne, Property } from "@mikro-orm/core";
import { Common } from "./CommonEntity";
import { Process } from "./ProcessEntity";
import { ProxyRule } from "./ProxyRuleEntity";

@Entity()
export class Service extends Common {
  @Property()
  rootDir: string = "";

  @Property()
  configPath: string = "";

  @Property()
  name!: string;

  @Property()
  port!: number;

  @Property()
  buildScript?: string;

  @Property()
  buildDir?: string;

  @Property()
  program!: string;

  @Property()
  proxyRule = new Collection<ProxyRule>(this);

  @OneToOne(() => Process)
  process?: Process;

  constructor() {
    super();
  }
}
