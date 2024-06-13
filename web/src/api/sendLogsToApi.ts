import { IChunkLog } from "../interfaces/_index";
import config from "../configurations/config.json"
import axios from "axios";


export const sendLogsToApi = async (logs: IChunkLog[]) => {
    if (logs.length > 2) {
        const api = config.development ? config["api-dev"] : config.api
        try {
            await axios.post(api + "/game-data", { data: logs })
        } catch (error) {
            console.log(error)
        }
    }
}