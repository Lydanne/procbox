import { join, resolve } from "path";

class Config {
  port = 3000;
  rootPath = resolve(join(__dirname, ".."));
  runtimePath = join(this.rootPath, "./runtime");
  dbFile = join(this.runtimePath, "./database.json");
}

export default () => new Config();
