import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = "../../../src/data"

const productsDir = path.join(__dirname, dataDir, "products.json");
const jsondata = fs.readFileSync(productsDir);
export const productsJson = JSON.parse(jsondata.toString("utf-8"));  // parse the json
