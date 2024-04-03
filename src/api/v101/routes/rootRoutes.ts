import { Router, Request, Response, NextFunction } from "express";
import { indexHTML } from "../../../configs/constants/staticHTML.js";
const router = Router();

router.get("^/$|/index(.html)?", (req: Request, res: Response) => {
    res.sendFile(indexHTML);
});

export default router;
