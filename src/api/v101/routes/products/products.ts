import { Router, Request, Response } from "express";
const router = Router();
import { productsJson } from "../../../../configs/constants/staticJSON.js"
import { v4 as uuidv4 } from 'uuid';

router.route("/")
    .get((req: Request, res: Response) => {
        res.json(productsJson);
    })
    .post((req: Request, res: Response) => {
        res.json({
            "id": uuidv4(),
            "name": req.body.name,
            "description": req.body.description,
            ...req.body
        })
    })
    .put((req: Request, res: Response) => {
        res.json({
            "id": uuidv4(),
            "name": req.body.name,
            "description": req.body.description,
            ...req.body
        })
    })
    .delete((req: Request, res: Response) => {
        res.json({ "id": req.body.id })
    });

router.route("/:id")
    .get((req: Request, res: Response) => {
        const data = productsJson.productsData.find((product: any) => product.id.toString() === req.params.id);
        if (!data) return res.status(404).send("Not found");
        else res.json(data);
    })


export default router;