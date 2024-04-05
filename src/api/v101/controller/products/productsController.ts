import { Router, Request, Response } from "express";
import { productsJson, writeProductsJson } from "../../../../configs/constants/staticJSON.js"
import { v4 as uuidv4 } from 'uuid';


const data = {
    products: productsJson,
    setProduct: (newData: any) => {
        data.products.productsData = newData;
    },
}

export const getAllProducts = (req: Request, res: Response) => {
    res.json(data.products);
}

export const createNewProduct = (req: Request, res: Response) => {
    const newProduct = {
        "id": uuidv4(),
        "name": req.body.name,
        "price": parseFloat(req.body.price) || 0,
        "description": req.body.description,
        ...req.body
    }
    if (!newProduct.name || !newProduct.price || !newProduct.desc) return res.status(400).send({ error: "Missing fields!" });

    try {
        // Write data to the JSON file using async/await
        writeProductsJson(newProduct);
        res.send('Data written to file successfully to json file');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to file');
    }
}

export const updateProduct = (req: Request, res: Response) => {
    let newdata = {
        name: "",
        price: "",

    }
    let updatedProdIndex = data.products.productsData.findIndex((item: any) => item.id === parseInt(req.params.productId));
    if (!updatedProdIndex) {
        return res.status(400).json({ "message: ": "No product provided to be updated." })
    }
    if (req.body.name) newdata.name = req.body.name;
    if (req.body.price) newdata.price = req.body.price;


    let updatedProd = [...data.products.productsData];


    // res.json({
    //     "id": uuidv4(),
    //     "name": req.body.name,
    //     "description": req.body.description,
    //     ...req.body
    // })
}

export const deleteProduct = (req: Request, res: Response) => {
    res.json({ "id": req.body.id })
}

export const getProduct = (req: Request, res: Response) => {
    const newdata = data.products.productsData.find((product: any) => product.id.toString() === req.params.id);
    if (!newdata) return res.status(404).send("Not found");
    else res.json(newdata);
}