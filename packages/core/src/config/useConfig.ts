import { defHook, Hub, onInit, useHub } from "../hub";
import { join } from "path";
import { GlobalConfig } from "@procbox/shared";
import { Process } from "../database/entities/ProcessEntity";
import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Service } from "../database/entities/ServiceEntity";
import { ProxyRule } from "../database/entities/ProxyRuleEntity";

export class Config extends GlobalConfig {
  dbFile = join(this.runtimePath, "./database.sqlite");

  orm: Options<SqliteDriver> = {
    entities: [Process, Service, ProxyRule],
    dbName: this.dbFile,
    type: "sqlite",
    baseDir: `${this.runtimePath}`,
    metadataProvider: ReflectMetadataProvider,
  };

  static override get() {
    return new Config();
  }
}

export default defHook(function useConfig() {
  onInit(() => {
    console.log("init useConfig");
  });

  return {
    config: () => new Config(),
  };
});
