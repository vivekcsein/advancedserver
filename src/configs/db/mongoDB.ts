import mongoose from "mongoose";

import { envConfig } from "../constants/envConfig.js";

const mongoOptions = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4
}

const connectMongoDB = async () => {
  // connection to databse
  try {
    mongoose.connection.on("connected", () =>
      console.log(`Mongoose is connected successfully }`)
    );
    mongoose.connection.on("error", (err) =>
      console.log(`Database error: ${err}`)
    );
    //connect mongodb function
    // await mongoose.connect(envConfig.databaseURL, mongoOptions);
    await mongoose.connect(envConfig.databaseURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting database: ", error);
    process.exit(1);
  }
};

export default connectMongoDB;
