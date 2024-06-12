import { Router, Response, Request } from "express";
import { HamletReponseBody, HamletRequestBody } from "../types";
import { predictWithHamletModel } from "../ml-models/index";

const hamletRouter = Router()

hamletRouter.post("/predict", async (req: Request<{}, {}, HamletRequestBody>, res: Response<HamletReponseBody>) => {
    try {
        const result = await predictWithHamletModel(req.body.data)
        res.status(200).json({ data: result })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

export default hamletRouter