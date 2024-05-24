export type IConfigurationManager = {
    maxPlatauCount: number
    minPlatauCount: number
    coinGenerationChance: number
    platformStartSpeed: number
    chestGenerationChance: number
    platauTentChance: number
    platauGrassChance: number
    platauTreeOrStumpChance: number
    maxStumpsAndTreesOnPlatau: number

    increaseMaxPlatauCount: (by?: number) => number
    decreaseMaxPlatauCount: (by?: number) => number
    increaseMinPlatauCount: (by?: number) => number
    decreaseMinPlatauCount: (by?: number) => number
    increaseCoinGenerationChance: (by?: number) => number
    decreaseCoinGenerationChance: (by?: number) => number
    increaseChestGenerationChance: (by?: number) => number
    decreaseChestGenerationChance: (by?: number) => number
    increasePlatformSpeed: (by?: number) => number
    decreasePlatformSpeed: (by?: number) => number
}