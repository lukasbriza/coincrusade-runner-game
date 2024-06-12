import { NeuralNetworkOutputShape } from "../types"

export const resolvePerformance = (performance: number): NeuralNetworkOutputShape => {
    //DECREASE DIFF
    if (performance < 0.5) return [1, 0, 0]
    //INCREASE DIFF
    if (performance > 0.6) return [0, 0, 1]
    //DO NOTHING
    return [0, 1, 0]
}