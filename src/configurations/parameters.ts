export const GAME_PARAMETERS = {
    debug: true,
    playerGravityY: 500,
    powerJumpLoadSpeed: 10,
    powerJumpMaxCap: 50,
    powerMultiplicator: 12,
    platformStartSpeed: 250,

    knightStartFramerate: 12,
    knightMoveVelocityRightX: 200,
    knightMoveVelocityLeftX: -160
} as const

export const ENDLESS_PLAIN_GENERATOR_PARAMETERS = {
    coinGenerationChance: 0.3
}