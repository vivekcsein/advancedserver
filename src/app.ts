import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { indexHTML, notFound404 } from "./configs/constants/import.js";
import { logger } from "./configs/middlewares/logger.js"

if (!process.env.SERVER_PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) | 7164;

const app: Express = express();

//logger middleware
app.use(logger)

app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use(express.static(process.cwd() + "/src/view"));
app.use(express.static(process.cwd() + "/public"));
app.use(express.json());

//API route
// app.get('/', (req, res: Response) => {
//     res.send('Hello From Server');
// });

//index page request
app.get("^/$|/index(.html)?", (req: Request, res: Response) => {
    res.sendFile(indexHTML);
});

//not found page app route
app.get("/*", (req: Request, res: Response) => {
    res.status(404).sendFile(notFound404);
});

// start server
const startserver = async () => {
    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
                resolve("server started");
            });
            server.on("error", (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error("Server can not start: ", error);
        process.exit(1);
    }
};
//start server
startserver();
