import { Request, NextFunction, Response } from "express";
import { logEvents } from "../utils/logEvents.js";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqlog.txt");
  // console.log(`req from = ${req.url}`);
  next();
};
