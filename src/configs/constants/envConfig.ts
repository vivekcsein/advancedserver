import * as dotenv from "dotenv";

dotenv.config();
if (!process.env.SERVER_PORT) {
    console.log("Port not initialised on env file");
    // process.exit(1);
}

const _envConfig = {
    PORT: parseInt(process.env.SERVER_PORT as string, 10) | 7164,

    NODE_ENV: process.env.NODE_ENV || 'development',

    databaseURL: process.env.MONGOURL as string,

}

export const envConfig = Object.freeze(_envConfig);