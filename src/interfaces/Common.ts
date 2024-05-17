import { Tilemaps, Types } from "phaser"
import { FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SPRITE_KEYS } from "../constants"
import { Coin } from "../objects/_index"

export type Image = { path: string }
export type Sprite = { atlas: string, sheet: string }

export type ImagesType = {
    [key in KEYS]: Image
}

export type SpriteTypes = {
    [key in SPRITE_KEYS]: Sprite
}

export type ColliderObject = Tilemaps.Tile | Types.Physics.Arcade.GameObjectWithBody
export type TranslationResult = { sprites: Types.Physics.Arcade.SpriteWithDynamicBody[], coins: Coin[] }

export type PlatformMapType = {
    [key in PLATFORM_MAP_KEYS]: { path: string }
}

export type FontTypes = {
    [key in FONT_KEYS]: { sheet: string, bitmap: string }
}

type MapTypeMember = string | number

export type MapType = {
    width: number
    difficulty: number
    map: MapTypeMember[][]
}

export type MapTypeExtended = { coins: (string | null)[] } & MapType