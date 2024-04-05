import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";
import { json } from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// imports from json.ts
import { writeDataOnJson, readDataFromJson } from "../utils/json.js"

const dataDir = "../../../data"
//dir
export const productsDir = path.join(__dirname, dataDir, "products.json");
// 
//export data
export const productsJson = readDataFromJson(dataDir, "products.json");

export const writeProductsJson = (newProduct: any) => {
    return new Promise((resolve, reject) => {
        try {
            let result = writeDataOnJson(dataDir, "products.json", newProduct);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}