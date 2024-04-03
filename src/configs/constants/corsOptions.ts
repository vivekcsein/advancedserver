import { Express, Request, Response, NextFunction } from "express";
import { CorsOptions } from "cors";
import { whitelistedServer } from "./serverlist.js";
// cors options
export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // if (!origin || whitelistedServer.indexOf(origin) !== -1) {
        if (!origin || whitelistedServer.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`Request made from outside`))
        }
    },
    optionsSuccessStatus: 200
}