import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { logger } from "./configs/middlewares/logger.js"
import { errorHandler } from "./configs/middlewares/errorHandler.js"
import { corsOptions } from "./configs/constants/corsOptions.js"
import { defualtRoutes } from "./configs/constants/DefaultRoutes.js";

//api imports
import rootRoutes from "./api/v101/routes/rootRoutes.js"
import authRoutes from "./api/v101/routes/auth/authRoutes.js"
import products from "./api/v101/routes/products/products.js"

// express configurations
dotenv.config();
if (!process.env.SERVER_PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) | 7164;

//initialise express app
const app: Express = express();

//logger middleware
app.use(logger)

// applying cors(cross origin resource sharing policy )
app.use(cors(corsOptions));

// server side rendering
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(process.cwd() + "/src/view"));
// app.use(express.static(process.cwd() + "/public"));

// middleware for json files
app.use(express.json());

//index page request
app.use("/", rootRoutes)

// app.get("^/$|/index(.html)?", (req: Request, res: Response) => {
//     res.sendFile(indexHTML);
// });

// api routes for subdir
app.use("/", authRoutes)
app.use("/api/products", products)

//not found page app route
app.all("*", defualtRoutes);

//error handling
app.use(errorHandler)

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
