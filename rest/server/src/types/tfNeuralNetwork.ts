export type NeuralNetworkInputShape = [number, number, number, number, number, number, number]
export type NeuralNetworkOutputShape = [number, number, number]
export type EvalLogType = {
    evaluation: boolean
    input: NeuralNetworkInputShape
    wantedOutput: NeuralNetworkOutputShape
    prediction: NeuralNetworkOutputShape
}