import dotenv from "dotenv";
import express, { Response } from "express";
import path from "path";
const compression = require("compression");

dotenv.config();
const PORT = process.env.PORT

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (_, res: Response) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})