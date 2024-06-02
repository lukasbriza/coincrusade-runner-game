export type IGeneratorParameters = {
    coinDifficultyChangeDistributionValue: number
    coinGenerationChance: number
    maxCoinGenerationChance: number
    minCoinGenerationChance: number

    chestDifficultyChangeDistributionValue: number
    chestGenerationChance: number
    maxChestGenerationChance: number
    minChestGenerationChance: number

    platformSpeedDifficultyChangeDistributionValue: number

    skillFactorDefault: number
    difficultyChangeBorders: [number, number]
    platformDifficultyPickStepFactor: number
    platformPickDifficultyChangeDistributionValue: number


    maxPlatauCount: number
    minPlatauCount: number
    platauTentChance: number
    platauGrassChance: number
    platauTreeOrStumpChance: number
    maxStumpsAndTreesOnPlatau: number
}