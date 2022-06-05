import { join, resolve } from "path";

export class GlobalConfig {
  rootPath = resolve(join(__dirname, ".."));
  runtimePath = join(this.rootPath, "./runtime");

  static get() {
    return new GlobalConfig();
  }
}
