import { Low, JSONFile } from "lowdb";
import config from "../config";

// Use JSON file for storage
const adapter = new JSONFile(config().dbFile);
export const db = new Low(adapter);
