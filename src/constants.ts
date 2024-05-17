import { FontTypes, ImagesType, PlatformMapType, SpriteTypes } from "./interfaces/_index"

export const SCENE_KEYS = {
    MAIN: "game-scene"
}

export enum KEYS {
    GROUND = "ground",
    BACKGROUND = "background",
    KNIGHT_POWERBAR = "knight-powerbar",
    KNIGHT_SLIDE = "knight-slide"
}

export enum FONT_KEYS {
    MAIN = "main"
}

export enum SPRITE_KEYS {
    SPRITE_KNIGHT_RUN = "sprite-knight-run",
    SPRITE_KNIGHT_ATTACK = "sprite-knight-attack",
    SPRITE_KNIGHT_JUMP = "sprite-knight-jump",
    SPRITE_COIN = "sprite-coin"
}

export enum PLATFORM_MAP_KEYS {
    BASE = "base",
}

export enum ANIMATION_KEYS {
    ANIMATION_KNIGHT_RUN = "knight-run",
    ANIMATION_KNIGHT_JUMP = "knight-jump",
    ANIMATION_KNIGHT_ATTACK = "knight-attack",
    ANIMATION_SPRITE_COIN = "coin-rotate"
}

export const PLATFORMS_MAPS: PlatformMapType = {
    [PLATFORM_MAP_KEYS.BASE]: { path: "assets/platforms/maps/base.map.json" }

}
export const SPRITES: SpriteTypes = {
    [SPRITE_KEYS.SPRITE_KNIGHT_RUN]: { atlas: "assets/sprites/knight/run.json", sheet: "assets/sprites/knight/run.png" },
    [SPRITE_KEYS.SPRITE_KNIGHT_ATTACK]: { atlas: "assets/sprites/knight/attack.json", sheet: "assets/sprites/knight/attack.png" },
    [SPRITE_KEYS.SPRITE_KNIGHT_JUMP]: { atlas: "assets/sprites/knight/jump.json", sheet: "assets/sprites/knight/jump.png" },
    [SPRITE_KEYS.SPRITE_COIN]: { atlas: "assets/sprites/coin/coin.json", sheet: "assets/sprites/coin/coin.png" }
}

export const IMAGES: ImagesType = {
    [KEYS.BACKGROUND]: { path: "assets/background.png" },
    [KEYS.KNIGHT_POWERBAR]: { path: "assets/powerbar.png" },
    [KEYS.GROUND]: { path: "assets/platforms/basePlatform.png" },
    [KEYS.KNIGHT_SLIDE]: { path: "assets/slide.png" }

}

export const FONTS: FontTypes = {
    [FONT_KEYS.MAIN]: { sheet: "assets/fonts/main.png", bitmap: "assets/fonts/main.xml" }
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