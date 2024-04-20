import { Request, Response, NextFunction } from "express";
import { logEvents } from "../utils/logEvents.js";
import { envConfig } from "../constants/envConfig.js";
import CreateHttpError, { HttpError } from "http-errors";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  logEvents(`${err.name} : ${err.message}`, "errLog.txt");
  res
    .status(statusCode)
    .send("Something broke!")
    .json({
      message: err.message,
      name: err.name,
      stack: envConfig.NODE_ENV === "development" ? err.stack : "",
      code: statusCode,
    });
};

// create error in http
export const createError = (statusCode: number, message: string): HttpError => {
  const error = CreateHttpError(statusCode, message);
  throw error;
};
