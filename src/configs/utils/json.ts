import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//read data from json
export const readDataFromJson = (dir: string, filename: string) => {
  const currDir = path.join(__dirname, dir, filename);
  //checks if file exists or not
  if (fs.existsSync(currDir)) {
    // parse the json
    const bufferdata = fs.readFileSync(currDir);
    return JSON.parse(bufferdata.toString("utf-8"));
  } else {
    return new Error(`file does not exists`);
  }
};

// write data on json file
export const writeDataOnJson = (
  dir: string,
  filename: string,
  newdata: Partial<ProductData>
) => {
  const currDir = path.join(__dirname, dir, filename);
  if (fs.existsSync(currDir)) {
    // console.log("already file exists");
    const bufferdata = fs.readFileSync(currDir);
    const data = JSON.parse(bufferdata.toString("utf-8"));
    // write mergedData to the file
    const mergedData = mergeNewData(data, newdata);
    // merge newdata with existing data
    fs.writeFileSync(currDir, JSON.stringify(mergedData));
  } else {
    console.log("The provided directory is invalid.");
    // if file does not exist, create a new one with newdata
    fs.writeFile(currDir, JSON.stringify(newdata, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("JSON file has been created");
      }
    });
  }
};

// update on json data
export const updateDataInJson = (
  dir: string,
  filename: string,
  newdata: Partial<ProductData>,
  index: number
) => {
  const currDir = path.join(__dirname, dir, filename);
  if (fs.existsSync(currDir)) {
    const bufferdata = fs.readFileSync(currDir);
    const data = JSON.parse(bufferdata.toString("utf-8"));
    // write mergedData to the file
    const mergedData = updateNewData(data, newdata, index);
    // merge newdata with existing data
    fs.writeFileSync(currDir, JSON.stringify(mergedData));
  } else {
    return new Error(`file does not exists`);
  }
};

//delete products on json data
export const deleteDataInJson = (
  dir: string,
  filename: string,
  index: number
) => {
  const currDir = path.join(__dirname, dir, filename);
  if (fs.existsSync(currDir)) {
    const bufferdata = fs.readFileSync(currDir);
    const data = JSON.parse(bufferdata.toString("utf-8"));
    // write mergedData to the file
    const mergedData = deleteData(data, index);
    // merge newdata with existing data
    fs.writeFileSync(currDir, JSON.stringify(mergedData));
  } else {
    return new Error(`file does not exists`);
  }
};

//merge new data into previous data
const mergeNewData = (data: any, newdata: any) => {
  return {
    productsData: [...data.productsData, newdata],
  };
};

// logic to update new data
const updateNewData = (
  data: ProductsData,
  newData: Partial<ProductData>,
  index: number
): ProductsData => {
  const updatedData = { ...data };
  const currData = updatedData.productsData[index];
  if (newData.name) {
    currData.name = newData.name;
  }
  if (newData.price) {
    currData.price = newData.price;
  }
  if (newData.desc) {
    currData.desc = newData.desc;
  }
  return updatedData;
};

// logic to delete data
const deleteData = (data: ProductsData, index: number): ProductsData => {
  const updatedData = { ...data };
  const filteredProducts = updatedData.productsData.filter(
    (_val, i) => i !== index
  );
  updatedData.productsData = filteredProducts;
  return updatedData;
};
