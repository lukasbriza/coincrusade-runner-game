import { IChunkLog, NeuralPredictionRepsonse } from "../interfaces/_index";
import config from "../configurations/config.json"
import axios from "axios";

export const getNeuralPrediction = async (chunk: IChunkLog) => {
    const api = config.development ? config["api-dev"] : config.api
    try {
        const result = await axios.post<NeuralPredictionRepsonse>(api + "/hamlet/predict", { data: chunk })
        return result.data.data
    } catch (error) {
        console.log(error)
    }
}