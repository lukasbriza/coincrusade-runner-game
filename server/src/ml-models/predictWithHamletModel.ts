import tf from "@tensorflow/tfjs"
import { ChunkLog, NeuralNetworkInputShape, NeuralNetworkOutputShape } from "../types";

import path from "path";
import { computePlatformModifier } from "./computePlatformModifier";


export const predictWithHamletModel = async (chunk: ChunkLog) => {
    const input: NeuralNetworkInputShape = [
        chunk.mapDifficulties.reduce((a, b) => a + b),
        chunk.pickedCoins,
        chunk.generatedCoins,
        chunk.lostLives,
        chunk.elapsedSeconds,
        chunk.gainedSeconds,
        computePlatformModifier(0.3, 300, chunk.platformSpeed)
    ]
    const model = await tf.loadLayersModel("file://" + path.resolve("dist", "ml-models", "trained_models", "hamlet_86", "model.json"))
    const prediction = model.predict(tf.tensor2d([input]))
    const result = (prediction as tf.Tensor<any>).arraySync()[0] as NeuralNetworkOutputShape
    return result
}