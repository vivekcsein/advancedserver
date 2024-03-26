import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewDir = "../../../src/view"
const logDir = "../../../src/"

//exported html files paths
export const indexHTML = path.join(__dirname, viewDir, "index.html");
export const notFound404 = path.join(__dirname, viewDir, "notFound-404.html");

//exported folder paths
export const logFolder = path.join(__dirname, logDir);