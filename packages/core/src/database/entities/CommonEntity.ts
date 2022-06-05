import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class Common {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date = new Date();

  @Property({ onUpdate: (entity) => new Date() })
  updatedAt?: Date = new Date();
}
