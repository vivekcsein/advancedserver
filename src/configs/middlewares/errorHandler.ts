import { Request, Response, NextFunction } from "express";
import { logEvents } from "../utils/logEvents.js"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name} : ${err.message}`, "errLog.txt");
    console.error(err.stack);
    res.status(500).send("Something broke!");
}
