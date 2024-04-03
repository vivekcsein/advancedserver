import { Router, Request, Response } from "express";
import { signInPage, signUpPage } from "../../../../configs/constants/staticHTML.js"
const router = Router();

router.get("/signin(.html)?", (req: Request, res: Response) => {
    res.sendFile(signInPage);
});
router.get("/signup(.html)?", (req: Request, res: Response) => {
    res.sendFile(signUpPage);
});

export default router;