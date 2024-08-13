import { ChunkLog } from "./gameData"
import { NeuralNetworkOutputShape } from "./tfNeuralNetwork"


export type HamletRequestBody = {
    data: ChunkLog
}

export type HamletReponseBody = {
    data: NeuralNetworkOutputShape
}