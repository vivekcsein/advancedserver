import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// imports from json.ts
import {
  readDataFromJson,
  writeDataOnJson,
  updateDataInJson,
  deleteDataInJson,
} from "../utils/json.js";

const dataDir = "../../../data";
//dir
export const productsDir = path.join(__dirname, dataDir, "products.json");
//
//export data
export const productsJson = readDataFromJson(dataDir, "products.json");

export const writeProductsJson = (newProduct: Partial<ProductData>) => {
  return new Promise((resolve, reject) => {
    try {
      let result = writeDataOnJson(dataDir, "products.json", newProduct);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProductJson = (
  newdata: Partial<ProductData>,
  productIndex: number
) => {
  return new Promise((resolve, reject) => {
    try {
      let result = updateDataInJson(
        dataDir,
        "products.json",
        newdata,
        productIndex
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteProductJson = (productIndex: number) => {
  return new Promise((resolve, reject) => {
    try {
      let result = deleteDataInJson(dataDir, "products.json", productIndex);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
