import { Router, Response, Request } from "express";
import { GameDataRequestBody, GameDataSchemaType } from "../types";
import { getConnection } from "../db";

const gameDataRouter = Router()

gameDataRouter.post("/game-data", async (req: Request<{}, {}, GameDataRequestBody>, res: Response) => {
  const data = req.body.data
  try {
    const conn = await getConnection()
    const newModel = await conn?.model<GameDataSchemaType>("GameData").create({ logs: data })
    await newModel?.save()

  } catch (error) {
    console.log(error)
    res.sendStatus(500).json(error)
  }
  res.sendStatus(200)
})

export default gameDataRouter
