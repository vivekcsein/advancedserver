
import mongoose from "mongoose";

import { envConfig } from "../constants/envConfig.js";

const connectDB = async () => {

    // connection to databse
    try {
        mongoose.connection.on("connected", () => console.log(`Mongoose is connected successfully }`));
        mongoose.connection.on("error", (err) => console.log(`Database error: ${err}`));
        // await mongoose.connect(envConfig.databaseURL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useFindAndModify: false,
        //     useCreateIndex: true
        // });

        await mongoose.connect(envConfig.databaseURL);
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Error connecting database: ", error);
        process.exit(1);

    }
}

export default connectDB;
