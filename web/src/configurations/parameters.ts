import { AppParameters, IGeneratorParameters } from "../interfaces/_index"

export const GAME_PARAMETERS: AppParameters = {
    debug: false,
    playerGravityY: 800,
    powerJumpLoadDelay: 5,
    powerJumpMaxCap: 60,
    platformStartSpeed: 180,
    minimalPlatformSpeed: 50,

    knightMoveVelocityRightX: 300,
    knightMoveVelocityLeftX: -480,

    timeAdditionInSeconds: 20,
    addTimeEveryNumberOfCoins: 5,
    maxPlayerLives: 3,
    playerHealRateInSeconds: 30,
    baseTimeInMinutes: 2,

    sendLogs: false
}

const GENERATOR_BASE_PARAMETERS = {
    coinGenerationChance: 0.5,
    maxCoinGenerationChance: 0.9,
    minCoinGenerationChance: 0.2,

    chestGenerationChance: 0.1,
    maxChestGenerationChance: 0.4,
    minChestGenerationChance: 0.1,

    skillFactorDefault: 1,
    platformDifficultyPickStepFactor: 0.3,

    maxPlatauCount: 4,
    minPlatauCount: 2,
    platauGrassChance: 0.5,
    platauTentChance: 0.1,
    platauTreeOrStumpChance: 0.3,
    maxStumpsAndTreesOnPlatau: 2,
}

export const LINEAR_GENERATOR: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,

    //INT VALUES
    changeDistribution: {
        coinChance: 2,
        platformSpeed: 5,
        platformDifficulty: 3,
    }
}

export const NEURAL_NETWORK_GENERATOR: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,

    //INT VALUES
    changeDistribution: {
        coinChance: 2,
        platformSpeed: 5,
        platformDifficulty: 3,
    }
}

export const HAMLET_SYSTEM_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,

    //INT VALUES
    changeDistribution: {
        coinChance: 2,
        platformSpeed: 5,
        platformDifficulty: 3,
    }
}

export const REINFORCEMENT_LEARNING_GENERATOR: IGeneratorParameters = {

    ...GENERATOR_BASE_PARAMETERS,

    //INT VALUES
    changeDistribution: {
        coinChance: 2,
        platformSpeed: 5,
        platformDifficulty: 3,
    }
}

export const NO_AI_ADAPTIVE_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,

    //INT VALUES
    changeDistribution: {
        coinChance: 2,
        platformSpeed: 5,
        platformDifficulty: 3,
    }
}

