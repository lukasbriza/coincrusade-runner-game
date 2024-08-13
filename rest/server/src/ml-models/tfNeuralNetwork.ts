import tf from "@tensorflow/tfjs"
require("tfjs-node-save");
import { getConnection } from "../db";
import { ChunkLog, EvalLogType, GameDataSchemaType, NeuralNetworkInputShape, NeuralNetworkOutputShape } from "../types";
import { computePerformance } from "./computePerformance";
import { resolvePerformance } from "./resolvePerformance";


const model = tf.sequential()
model.add(tf.layers.dense({ units: 16, activation: "relu", inputShape: [7] })) //input shape represents array of inputs from which is difficulty computed
model.add(tf.layers.dense({ units: 16, activation: "relu" }))
model.add(tf.layers.dense({ units: 3, activation: "softmax" }))

model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] })

const prepareData = async () => {
    const conn = await getConnection()
    const gamedata = await conn?.model<GameDataSchemaType>("GameData").find()

    const evalSequences: ChunkLog[] = []

    const evalData: [NeuralNetworkInputShape, NeuralNetworkOutputShape][] = []

    if (gamedata) {
        gamedata?.forEach((record) => {
            const logs = record.logs.filter(l => l.suggestedAction !== null)

            logs.forEach(log => {
                evalSequences.push(log)
            })
        })

        //PREPARE TRAIN DATA
        evalSequences.forEach(sequence => {
            const mapSum = sequence.mapDifficulties.reduce((prev, acc) => (prev ?? 0) + acc)
            const { performance, platformPerformanceModifier } = computePerformance(sequence)

            const perfomanceResult: NeuralNetworkOutputShape = resolvePerformance(performance)

            evalData.push([
                [
                    mapSum,
                    sequence.pickedCoins,
                    sequence.generatedCoins,
                    sequence.lostLives,
                    sequence.elapsedSeconds,
                    sequence.gainedSeconds,
                    platformPerformanceModifier
                ], perfomanceResult
            ])
        })

        const increaseData = evalData.filter(x => x[1][2] === 1)
        const neutralData = evalData.filter(x => x[1][1] === 1)
        const decreaseData = evalData.filter(x => x[1][0] === 1)

        const iLenght = increaseData.length
        const iFloor = Math.floor(iLenght / 3)
        const nLenght = neutralData.length
        const nFloor = Math.floor(nLenght / 3)
        const dLenght = decreaseData.length
        const dFloor = Math.floor(dLenght / 3)

        const iControlData = increaseData.slice(0, iFloor)
        const nControlData = neutralData.slice(0, nFloor)
        const dControlData = decreaseData.slice(0, dFloor)
        const iTrainData = increaseData.slice(iFloor + 1, increaseData.length - 1)
        const nTrainData = neutralData.slice(nFloor + 1, neutralData.length - 1)
        const dTrainData = decreaseData.slice(dFloor + 1, decreaseData.length - 1)

        return { trainData: iTrainData.concat(nTrainData, dTrainData), testData: iControlData.concat(nControlData, dControlData) }
    }
}

export const trainModel = async () => {
    const data = await prepareData()
    if (data) {

        await model.fit(tf.tensor2d(data.trainData.map(x => x[0])), tf.tensor2d(data.trainData.map(x => x[1])), {
            epochs: 220,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log({ epoch, loss: logs?.loss })
                }
            }
        })

        const evalLog: EvalLogType[] = []

        data.testData.forEach(d => {
            let biggestValueIndex = 0
            const inputdata = tf.tensor2d([d[0]])
            const prediction = model.predict(inputdata) as tf.Tensor<any>
            const weights = prediction.arraySync()[0] as NeuralNetworkOutputShape
            weights.forEach((w, i) => {
                if (i === 0) return
                if (w > weights[biggestValueIndex]) {
                    biggestValueIndex = i
                }
            })

            const evaluation = d[1][biggestValueIndex] === 1
            evalLog.push({ evaluation, input: d[0], wantedOutput: d[1], prediction: weights })
        })

        const stat = (evalLog.filter(x => x.evaluation === true).length / evalLog.length) * 100
        console.log({ stat })
        await model.save("file://C:/Users/lukas/Desktop/Repository/coincrusade-runner-game/server/src/ml-models")
        return
    }
    console.log("Model was not trained. Unable to get train data.")
}


