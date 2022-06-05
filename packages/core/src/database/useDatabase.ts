import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import useConfig from "../config/useConfig";
import { defHook, onClose, onInit } from "../hub";
import { Process } from "./entities/ProcessEntity";
import { Service } from "./entities/ServiceEntity";
import { ProxyRule } from "./entities/ProxyRuleEntity";

export default defHook(function useDatabase() {
  let orm!: MikroORM;

  const { config } = useConfig();

  onInit(async () => {
    console.log("init useDatabase");
    orm = await MikroORM.init<SqliteDriver>(config().orm);
  });

  onClose(() => {
    console.log("close useDatabase");
    orm.close(true);
  });

  return {
    em: () => orm.em.fork(),
    processRepo: () => orm.em.fork().getRepository(Process),
    serviceRepo: () => orm.em.fork().getRepository(Service),
    proxyRuleRepo: () => orm.em.fork().getRepository(ProxyRule),
  };
});
