import { Request, Response } from "express";
import {
  productsJson,
  writeProductsJson,
  updateProductJson,
  deleteProductJson,
} from "../../../../configs/constants/staticJSON.js";
// import { v4 as uuidv4 } from 'uuid';

const data = {
  products: productsJson,
  setProduct: (newData: any) => {
    data.products.productsData = newData;
  },
};

export const getAllProducts = (req: Request, res: Response) => {
  res.json(data.products);
};

export const createNewProduct = (req: Request, res: Response) => {
  const newData = {
    // "id": uuidv4(),
    id: data.products.productsData.length + 1,
    name: req.body.name,
    price: parseFloat(req.body.price) || 0,
    description: req.body.description,
    ...req.body,
  };
  if (!newData.name || !newData.price || !newData.desc)
    return res.status(400).send({ error: "Missing fields!" });

  try {
    // Write data to the JSON file using async/await
    writeProductsJson(newData);
    res.send("Data written to file successfully to json file");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error writing to file");
  }
};

export const updateProduct = (req: Request, res: Response) => {
  let newData: ProductData = {
    id: parseInt(req.body.id),
    name: "",
    price: "",
    desc: "",
  };
  let updatedProdIndex: number = data.products.productsData.findIndex(
    (item: any) => item.id === parseInt(req.body.id)
  );

  if (!updatedProdIndex) {
    return res
      .status(400)
      .json({ "message: ": "No product provided to be updated." });
  }
  if (req.body.name) newData.name = req.body.name;
  if (req.body.price) newData.price = req.body.price;
  if (req.body.desc) newData.desc = req.body.desc;

  try {
    // Write data to the JSON file using async/await
    updateProductJson(newData, updatedProdIndex);
    res.send("Data updated successfully to json file");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating to file");
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  let updatedProdIndex: number = data.products.productsData.findIndex(
    (item: any) => item.id === parseInt(req.body.id)
  );
  if (!updatedProdIndex) {
    return res
      .status(400)
      .json({ "message: ": "No product provided to be updated." });
  }
  try {
    // Write data to the JSON file using async/await
    deleteProductJson(updatedProdIndex);
    res.send("Data Delete successfully from json file");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data to file");
  }
};

export const getProduct = (req: Request, res: Response) => {
  const newdata = data.products.productsData.find(
    (product: any) => product.id.toString() === req.params.id
  );
  if (!newdata) return res.status(404).send("Not found");
  else res.json(newdata);
};
