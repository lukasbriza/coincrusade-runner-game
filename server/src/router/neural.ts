import { Router, Response, Request } from "express";
import { HamletReponseBody, HamletRequestBody } from "../types";
import { predictWithNnModel } from "../ml-models/index";

const neuralRouter = Router()

neuralRouter.post("/predict", async (req: Request<{}, {}, HamletRequestBody>, res: Response<HamletReponseBody>) => {
    try {
        const result = await predictWithNnModel(req.body.data)
        res.status(200).json({ data: result })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

export default neuralRouter