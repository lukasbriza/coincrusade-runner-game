import { FontTypes, ImagesType, PlatformMapType, SpriteTypes } from "./interfaces/_index"

export const SCENE_KEYS = {
    MAIN: "game-scene"
}

export enum KEYS {
    GROUND = "ground",
    BACKGROUND = "background",
    KNIGHT_POWERBAR = "knight-powerbar",
    KNIGHT_SLIDE = "knight-slide",
    GRASS1 = "grass1",
    GRASS2 = "grass2",
    ROCK1 = "rock1",
    ROCK2 = "rock2",
    SLIM_GROUND = "slim",
    STUMP = "stump1",
    TREE = "tree1"
}

export enum FONT_KEYS {
    MAIN = "main"
}

export enum SPRITE_KEYS {
    SPRITE_KNIGHT_RUN = "sprite-knight-run",
    SPRITE_KNIGHT_ATTACK = "sprite-knight-attack",
    SPRITE_KNIGHT_JUMP = "sprite-knight-jump",
    SPRITE_COIN = "sprite-coin",
    SPRITE_WATER = "water"
}

export enum PLATFORM_MAP_KEYS {
    BASE = "base",

    FLAT1 = "flat1",
    FLAT2 = "flat2",
    FLAT3 = "flat3",
    FLAT4 = "flat4",
    FLAT5 = "flat5",
    FLAT6 = "flat6",
    FLAT7 = "flat7",
    FLAT8 = "flat8",
    FLAT9 = "flat9",
    FLAT10 = "flat10",
    FLAT11 = "flat11",

    ISLAND1 = "island1",
    ISLAND2 = "island2",
    ISLAND3 = "island3",
    ISLAND4 = "island4",
    ISLAND5 = "island5",
    ISLAND6 = "island6",
    ISLAND7 = "island7",
    ISLAND8 = "island8",
    ISLAND9 = "island9",
    ISLAND10 = "island10",
    ISLAND11 = "island11",
    ISLAND12 = "island12",

    SEA1 = "sea1",
    SEA2 = "sea2",
    SEA3 = "sea3",
    SEA4 = "sea4",
}

export enum ANIMATION_KEYS {
    ANIMATION_KNIGHT_RUN = "knight-run",
    ANIMATION_KNIGHT_JUMP = "knight-jump",
    ANIMATION_KNIGHT_ATTACK = "knight-attack",
    ANIMATION_SPRITE_COIN = "coin-rotate",
    ANIMATION_SPRITE_WATER = "water-waves"
}

export const PLATFORMS_MAPS: PlatformMapType = {
    [PLATFORM_MAP_KEYS.BASE]: { path: "assets/platforms/maps/base.map.json" },

    [PLATFORM_MAP_KEYS.FLAT1]: { path: "assets/platforms/maps/flat/flat1.map.json" },
    [PLATFORM_MAP_KEYS.FLAT2]: { path: "assets/platforms/maps/flat/flat2.map.json" },
    [PLATFORM_MAP_KEYS.FLAT3]: { path: "assets/platforms/maps/flat/flat3.map.json" },
    [PLATFORM_MAP_KEYS.FLAT4]: { path: "assets/platforms/maps/flat/flat4.map.json" },
    [PLATFORM_MAP_KEYS.FLAT5]: { path: "assets/platforms/maps/flat/flat5.map.json" },
    [PLATFORM_MAP_KEYS.FLAT6]: { path: "assets/platforms/maps/flat/flat6.map.json" },
    [PLATFORM_MAP_KEYS.FLAT7]: { path: "assets/platforms/maps/flat/flat7.map.json" },
    [PLATFORM_MAP_KEYS.FLAT8]: { path: "assets/platforms/maps/flat/flat8.map.json" },
    [PLATFORM_MAP_KEYS.FLAT9]: { path: "assets/platforms/maps/flat/flat9.map.json" },
    [PLATFORM_MAP_KEYS.FLAT10]: { path: "assets/platforms/maps/flat/flat10.map.json" },
    [PLATFORM_MAP_KEYS.FLAT11]: { path: "assets/platforms/maps/flat/flat11.map.json" },

    [PLATFORM_MAP_KEYS.ISLAND1]: { path: "assets/platforms/maps/island/island1.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND2]: { path: "assets/platforms/maps/island/island2.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND3]: { path: "assets/platforms/maps/island/island3.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND4]: { path: "assets/platforms/maps/island/island4.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND5]: { path: "assets/platforms/maps/island/island5.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND6]: { path: "assets/platforms/maps/island/island6.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND7]: { path: "assets/platforms/maps/island/island7.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND8]: { path: "assets/platforms/maps/island/island8.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND9]: { path: "assets/platforms/maps/island/island9.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND10]: { path: "assets/platforms/maps/island/island10.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND11]: { path: "assets/platforms/maps/island/island11.map.json" },
    [PLATFORM_MAP_KEYS.ISLAND12]: { path: "assets/platforms/maps/island/island12.map.json" },

    [PLATFORM_MAP_KEYS.SEA1]: { path: "assets/platforms/maps/sea/sea1.map.json" },
    [PLATFORM_MAP_KEYS.SEA2]: { path: "assets/platforms/maps/sea/sea2.map.json" },
    [PLATFORM_MAP_KEYS.SEA3]: { path: "assets/platforms/maps/sea/sea3.map.json" },
    [PLATFORM_MAP_KEYS.SEA4]: { path: "assets/platforms/maps/sea/sea4.map.json" },
}
export const SPRITES: SpriteTypes = {
    [SPRITE_KEYS.SPRITE_KNIGHT_RUN]: { atlas: "assets/sprites/knight/run.json", sheet: "assets/sprites/knight/run.png" },
    [SPRITE_KEYS.SPRITE_KNIGHT_ATTACK]: { atlas: "assets/sprites/knight/attack.json", sheet: "assets/sprites/knight/attack.png" },
    [SPRITE_KEYS.SPRITE_KNIGHT_JUMP]: { atlas: "assets/sprites/knight/jump.json", sheet: "assets/sprites/knight/jump.png" },
    [SPRITE_KEYS.SPRITE_COIN]: { atlas: "assets/sprites/coin/coin.json", sheet: "assets/sprites/coin/coin.png" },
    [SPRITE_KEYS.SPRITE_WATER]: { atlas: "assets/sprites/water/water.json", sheet: "assets/sprites/water/water.png" }
}

export const IMAGES: ImagesType = {
    [KEYS.BACKGROUND]: { path: "assets/background.png" },
    [KEYS.KNIGHT_POWERBAR]: { path: "assets/powerbar.png" },
    [KEYS.KNIGHT_SLIDE]: { path: "assets/slide.png" },
    [KEYS.GROUND]: { path: "assets/platforms/basePlatform.png" },
    [KEYS.GRASS1]: { path: "assets/platforms/grass1.png" },
    [KEYS.GRASS2]: { path: "assets/platforms/grass2.png" },
    [KEYS.ROCK1]: { path: "assets/platforms/rock1.png" },
    [KEYS.ROCK2]: { path: "assets/platforms/rock2.png" },
    [KEYS.TREE]: { path: "assets/platforms/tree1.png" },
    [KEYS.SLIM_GROUND]: { path: "assets/platforms/slim.png" },
    [KEYS.STUMP]: { path: "assets/platforms/stump1.png" }
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