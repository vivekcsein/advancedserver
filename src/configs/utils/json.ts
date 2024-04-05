import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";
import { json } from "express";
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
        return new Error(`file does not exists`)
    }
}

// write data on json file
export const writeDataOnJson = (dir: string, filename: string, newdata: any) => {
    const currDir = path.join(__dirname, dir, filename);
    if (fs.existsSync(currDir)) {
        // console.log("already file exists");
        const bufferdata = fs.readFileSync(currDir);
        const data = JSON.parse(bufferdata.toString("utf-8"));
        // write mergedData to the file
        const mergedData = mergeNewData(data, newdata);
        // merge newdata with existing data
        fs.writeFileSync(currDir, JSON.stringify(mergedData));
    }
    else {
        console.log("The provided directory is invalid.");
        // if file does not exist, create a new one with newdata
        fs.writeFile(currDir, JSON.stringify(newdata, null, 2), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('JSON file has been created');
            }
        })
    }
};

const mergeNewData = (data: any, newdata: any) => {
    return {
        productsData: [...data.productsData, newdata]
    }
}