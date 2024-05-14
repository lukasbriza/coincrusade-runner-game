import { ImagesType, PlatformMapType } from "./interfaces/_index"

export const SCENE_KEYS = {
    MAIN: "game-scene"
}

export enum KEYS {
    BACKGROUND = "background",
    SPRITE_KNIGHT_RUN = "sprite-knight-run",
    SPRITE_KNIGHT_ATTACK = "sprite-knight-attack",
    SPRITE_KNIGHT_JUMP = "sprite-knight-jump",
    SPRITE_KNIGHT_POWERBAR = "sprite-knight-powerbar"
}

export enum PLATFORM_KEYS {
    GROUND = "ground"
}

export enum PLATFORM_MAP_KEYS {
    BASE = "base"
}

export enum ANIMATION_KEYS {
    ANIMATION_KNIGHT_RUN = "knight-run",
    ANIMATION_KNIGHT_JUMP = "knight-jump",
    ANIMATION_KNIGHT_ATTACK = "knight-attack"
}

export const PLATFORMS = {
    [PLATFORM_KEYS.GROUND]: { path: "assets/platforms/basePlatform.png" },
}

export const PLATFORMS_MAPS: PlatformMapType[] = [
    { key: PLATFORM_MAP_KEYS.BASE, path: "assets/platforms/maps/base.map.json" }
]

export const IMAGES: ImagesType = {
    [KEYS.BACKGROUND]: { path: "assets/background.png" },
    [KEYS.SPRITE_KNIGHT_POWERBAR]: { path: "assets/powerbar.png" },
    [KEYS.SPRITE_KNIGHT_RUN]: { atlas: "assets/sprites/knight/run.json", sheet: "assets/sprites/knight/run.png" },
    [KEYS.SPRITE_KNIGHT_ATTACK]: { atlas: "assets/sprites/knight/attack.json", sheet: "assets/sprites/knight/attack.png" },
    [KEYS.SPRITE_KNIGHT_JUMP]: { atlas: "assets/sprites/knight/jump.json", sheet: "assets/sprites/knight/jump.png" }
}

export const TILE = { width: 90, height: 90 }

export const screenSizes = ({
    width: 15 * TILE.width,
    height: 7 * TILE.height
})

export const POOL_CONFIG = {
    tileSize: TILE,
    chunkSize: 15 * TILE.width,
    maxChunkPackageWidth: 3 * (15 * TILE.width),
    criticalPackageWidth: 2 * (15 * TILE.width)
}