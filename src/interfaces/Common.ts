import { Tilemaps, Types } from "phaser"
import { KEYS, PLATFORM_MAP_KEYS } from "../constants"

export type Image = { path: string }
export type Sprite = { atlas: string, sheet: string }

export type ImagesType = {
    [key in KEYS]: Image | Sprite
}

export type ColliderObject = Tilemaps.Tile | Types.Physics.Arcade.GameObjectWithBody
export type DynamicSprite = Types.Physics.Arcade.SpriteWithDynamicBody

export type PlatformMapType = { key: PLATFORM_MAP_KEYS, path: string }

type MapTypeMember = string | number

export type MapType = {
    width: number
    difficulty: number
    map: MapTypeMember[][]
}