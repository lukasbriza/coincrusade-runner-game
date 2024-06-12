import express, { Response, json } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
import swaggerUi from "swagger-ui-express"
import swaggerJson from "./swagger-output.json"


const compression = require("compression");
dotenv.config();

import "./db/conn"
import "./ml-models/tfNeuralNetwork"
import gameDataRouter from "./router/gameData";
import hamletRouter from "./router/hamlet";

const PORT = process.env.PORT

const app = express();
app.use(compression());
app.use(json());
app.use(cors());
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, "public")))

/* api routes */
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use("/api", gameDataRouter)
app.use("/api/hamlet", hamletRouter)

app.get("/", (_, res: Response) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})


app.listen(PORT, async () => {
    console.log(`Running on port ${PORT}.`)
})

