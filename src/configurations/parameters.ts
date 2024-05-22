import { AppParameters, IGeneratorParameters } from "../interfaces/_index"

export const GAME_PARAMETERS: AppParameters = {
    debug: true,
    playerGravityY: 800,
    powerJumpLoadDelay: 5,
    powerJumpMaxCap: 60,
    powerMultiplicator: 12,
    platformStartSpeed: 180,
    minimalPlatformSpeed: 50,

    knightStartFramerate: 12,
    knightMoveVelocityRightX: 300,
    knightMoveVelocityLeftX: -300,

    currentGenerator: "AllTest",
}

export const ENDLESS_PLAIN_GENERATOR_PARAMETERS: IGeneratorParameters = {
    coinGenerationChance: 0.3,
    maxCoinGenerationChance: 0.9,
    minCoinGenerationChance: 0.1,
    chestGenerationChance: 0.1,
    maxChestGenerationChance: 0.4,
    minChestGenerationChance: 0.1,
    maxPlatauCount: 6,
    minPlatauCount: 4,
}

export const ALL_PLATFORMS_TEST_GENERATOR_PARAMETERS: IGeneratorParameters = {
    coinGenerationChance: 0.5,
    maxCoinGenerationChance: 0.9,
    minCoinGenerationChance: 0.1,
    chestGenerationChance: 0.1,
    maxChestGenerationChance: 0.4,
    minChestGenerationChance: 0.1,
    maxPlatauCount: 6,
    minPlatauCount: 4,
}