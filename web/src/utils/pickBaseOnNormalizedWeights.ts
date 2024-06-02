export const pickBaseOnNormalizedWeights = (normalizedWeights: number[]) => {
    let cumulativeWeights = 0
    const randomValue = Math.random()

    for (let i = 0; i < normalizedWeights.length; i++) {
        cumulativeWeights = cumulativeWeights + normalizedWeights[i]
        if (randomValue < cumulativeWeights) {
            return i
        }
    }
    console.error("PickFromNormalizedWeights failed.")
    return 0
}