import { AppParameters, IGeneratorParameters } from "../interfaces/_index"

export const GAME_PARAMETERS: AppParameters = {
    debug: false,
    playerGravityY: 800,
    powerJumpLoadDelay: 5,
    powerJumpMaxCap: 60,
    powerMultiplicator: 12,
    platformStartSpeed: 180,
    minimalPlatformSpeed: 50,

    knightStartFramerate: 12,
    knightMoveVelocityRightX: 300,
    knightMoveVelocityLeftX: -480,

    timeAdditionInSeconds: 20,
    addTimeEveryNumberOfCoins: 5,
    maxPlayerLives: 3,
    playerHealRateInSeconds: 30,
    onHitImmortalityDuration: 4000,
    baseTimeInMinutes: 2,
    difficultyChangeBorderMinGap: 0.2,

    currentGenerator: "NoAiAdaptive",
}

const GENERATOR_BASE_PARAMETERS = {
    coinGenerationChance: 0.5,
    maxCoinGenerationChance: 0.9,
    minCoinGenerationChance: 0.2,

    chestGenerationChance: 0.1,
    maxChestGenerationChance: 0.4,
    minChestGenerationChance: 0.1,

    skillFactorDefault: 0.5,
    platformDifficultyPickStepFactor: 0.3,

    maxPlatauCount: 4,
    minPlatauCount: 2,
    platauGrassChance: 0.5,
    platauTentChance: 0.1,
    platauTreeOrStumpChance: 0.3,
    maxStumpsAndTreesOnPlatau: 2,
}

export const ENDLESS_PLAIN_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.3, 0.7],

    coinDifficultyChangeDistributionValue: 0.1,
    chestDifficultyChangeDistributionValue: 0.1,
    platformSpeedDifficultyChangeDistributionValue: 0.1,
    platformPickDifficultyChangeDistributionValue: 0.1
}

export const ALL_PLATFORMS_TEST_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.3, 0.7],

    coinDifficultyChangeDistributionValue: 0.1,
    chestDifficultyChangeDistributionValue: 0.1,
    platformSpeedDifficultyChangeDistributionValue: 0.1,
    platformPickDifficultyChangeDistributionValue: 0.1
}

export const NO_AI_ADAPTIVE_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.4, 0.6],

    coinDifficultyChangeDistributionValue: 0.05,
    chestDifficultyChangeDistributionValue: 0.1,
    platformSpeedDifficultyChangeDistributionValue: 0.6,
    platformPickDifficultyChangeDistributionValue: 0.3
}