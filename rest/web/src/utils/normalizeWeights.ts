export const normalizeWeights = (weights: number[]) => {
    const weightSum = weights.reduce((prev, acc) => prev + acc, 0)
    const normalizedWeights = weights.map(weight => weight / weightSum)
    return normalizedWeights
}