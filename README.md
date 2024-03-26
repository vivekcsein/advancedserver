<h1>
node express advanced server template for production grade applications
</h1>

<p>
create a folder ( name = server)

    mkdir server

</p>

<p>
create package.json using this command on terminal
</p>
       
       pnpm init
<p>
change type to module from commonjs
</p>

       "type": "module",

<p>
initialize typescript
</p>

     npm i -g typescript
     pnpm tsc --init

<p>
changes commit to tsconfig.json:-
</p>

    {
     "compilerOptions": {
     "target": "ES2020",
     "module": "NodeNext",
     "moduleResolution": "NodeNext",
     "rootDir": "./src",
     "outDir": "./dist",
     "strict": true,
      }
    }

<p>
create .gitignore file on root level
</p>

    /node_modules
    /dist/
    /build
    .env
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

<p>
create src folder & file name app.ts or frnzserver.ts
</p>
<p>
Install dependencies
</p>

    pnpm add express dotenv cors date-fns valibot

<p>
Install Dev dependencies
</p>

    pnpm add --save-dev @types/express @types/node @types/cors @types/uuid
    pnpm add --save-dev typescript nodemon rimraf concurrently uuid eslint

<p>
change script in package.json to start server 
</p>

    "build": "rimraf dist && pnpm tsc",
    "prestart": "pnpm build",
    "start": "node ./dist/app.js",
    "watch": "pnpm tsc -w",
    "serve": "nodemon ./dist/app.js",
    "dev": "concurrently \"pnpm tsc -w\"  \"nodemon ./dist/app.js\"",

<p>
put code on app.ts
</p>

    import express, { Express, Response } from "express";
    import \* as dotenv from "dotenv";
    import cors from "cors";
    dotenv.config();

    if (!process.env.SERVER_PORT) {
        process.exit(1);
    }
    const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) | 7164;
    const app: Express = express();
    app.use(cors());
    app.use(express.json());

    //API route
    app.get('/', (req, res: Response) => {
        res.send('Hello From Server');
    });

    // start server
    const startserver = async () => {
    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            resolve("server started");
        });
        server.on('error', (error) => {
        reject(error);
        });
    });
    } catch (error) {
        console.error("Server can not start: ", error);
        process.exit(1);
      }
    }
    startserver();

<p>
  start server with pnpm dev cammand
</p>

    pnpm dev

<p>
  basic prettier config

    "singleQuote":false ,
    "trailingComma": "es5",
    "tabWidth": 2,
    "useTabs": false,
    "semi": true

</p>

<p>update packages
    
    pnpm outdated

    pnpm update

</p>
