import { AppParameters } from "../interfaces/_index"

export const GAME_PARAMETERS: AppParameters = {
    debug: true,
    playerGravityY: 800,
    powerJumpLoadDelay: 5,
    powerJumpMaxCap: 50,
    powerMultiplicator: 12,
    platformStartSpeed: 150,

    knightStartFramerate: 12,
    knightMoveVelocityRightX: 300,
    knightMoveVelocityLeftX: -300,

    currentGenerator: "AllTest",
    maxPlatauCount: 6,
    minPlatauCount: 4,
}

export const ENDLESS_PLAIN_GENERATOR_PARAMETERS = {
    coinGenerationChance: 0.3
}

export const ALL_PLATFORMS_TEST_GENERATOR = {
    coinGenerationChance: 0.3,
}