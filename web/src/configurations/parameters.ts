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
    difficultyChangeBorders: [0.4, 0.6],

    //INT VALUES
    changeDistribution: {
        coinChance: 3,
        platformSpeed: 6,
        platformDifficulty: 4,
        chestChance: 1
    }
}

export const NEURAL_NETWORK_GENERATOR: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.4, 0.6],

    //INT VALUES
    changeDistribution: {
        coinChance: 1,
        platformSpeed: 6,
        platformDifficulty: 3,
        chestChance: 2
    }
}

export const HAMLET_SYSTEM_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.4, 0.6],

    //INT VALUES
    changeDistribution: {
        coinChance: 1,
        platformSpeed: 6,
        platformDifficulty: 3,
        chestChance: 1
    }
}

export const REINFORCEMENT_LEARNING_GENERATOR: IGeneratorParameters = {

    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.4, 0.6],

    //INT VALUES
    changeDistribution: {
        coinChance: 1,
        platformSpeed: 6,
        platformDifficulty: 3,
        chestChance: 1
    }
}

export const NO_AI_ADAPTIVE_GENERATOR_PARAMETERS: IGeneratorParameters = {
    ...GENERATOR_BASE_PARAMETERS,
    difficultyChangeBorders: [0.4, 0.6],

    //INT VALUES
    changeDistribution: {
        coinChance: 1,
        platformSpeed: 6,
        platformDifficulty: 3,
        chestChance: 1
    }
}

