import { KEYS, SPRITE_KEYS } from "../constants";

export const isObstacleSprite = (cleanName: string) => {
    switch (cleanName) {
        case SPRITE_KEYS.SPRITE_WATER:
        case KEYS.ROCK1:
        case KEYS.ROCK2:
            return true
        default:
            return false
    }
}