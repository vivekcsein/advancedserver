import { Router, Request, Response, NextFunction } from "express";
import { signInPage, signUpPage } from "../../../../configs/constants/importFiles.js"
const router = Router();

router.get("/signin(.html)?", (req: Request, res: Response) => {
    res.sendFile(signInPage);
});
router.get("/signup(.html)?", (req: Request, res: Response) => {
    res.sendFile(signUpPage);
});

export default router;