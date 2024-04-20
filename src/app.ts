import express, { Express } from "express";
import cors from "cors";

// import configs
import { envConfig } from "./configs/constants/envConfig.js";
import { logger } from "./configs/middlewares/logger.js";
import { errorHandler } from "./configs/middlewares/errorHandler.js";
import { corsOptions } from "./configs/utils/corsOptions.js";
import { defaultRoutes } from "./configs/utils/DefaultRoutes.js";

//root || static api imports || routes
import rootRoutes from "./api/v101/routes/root/rootRoutes.js";
import authRoutes from "./api/v101/routes/auth/authRoutes.js";
import products from "./api/v101/routes/products/products.js";

// backend api routes

//import database connection
import connectMongoDB from "./configs/db/mongoDB.js";

const PORT: number = envConfig.PORT;
if (!PORT) {
  console.log("port not found");
  process.exit(1);
}

//initialise express app
const app: Express = express();

//logger middleware
app.use(logger);

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
app.use("/", rootRoutes);

// api routes for frontend pages
app.use("/", authRoutes);
app.use("/api/products", products);

//not found page app route
app.all("*", defaultRoutes);

//global error handling
app.use(errorHandler);

// start server
const startserver = async () => {
  try {
    // request database connection before start server
    await connectMongoDB();
    //  server config
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
