export type IGeneratorParameters = {
    coinGenerationChance: number
    maxCoinGenerationChance: number
    minCoinGenerationChance: number

    chestGenerationChance: number
    maxChestGenerationChance: number
    minChestGenerationChance: number

    skillFactorDefault: number
    difficultyChangeBorders: [number, number]
    platformDifficultyPickStepFactor: number


    maxPlatauCount: number
    minPlatauCount: number
    platauTentChance: number
    platauGrassChance: number
    platauTreeOrStumpChance: number
    maxStumpsAndTreesOnPlatau: number

    changeDistribution: {
        coinChance: number
        platformSpeed: number
        platformDifficulty: number
        chestChance: number
    }
}