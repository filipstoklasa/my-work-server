import path from "path";
import { JSONFileSync } from "lowdb/node";
import { fileURLToPath } from "url";
import { DB } from "@app/models/db.js";
import { LowSyncWithLodash } from "./helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new LowSyncWithLodash<DB>(
  new JSONFileSync(path.resolve(__dirname, "template.json")),
  { projects: [] }
);

db.read();

export default db;
