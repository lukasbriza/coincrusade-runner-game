import { Events, GameObjects, Physics, Scene, Time, Types } from "phaser"
import { EVENTS, FONT_KEYS, KEYS, PLATFORM_MAP_KEYS, SPRITE_KEYS } from "../constants"
import { MapType } from "./Common"

export type IGrouphelper = {
    getLastMemberOfGroupByX: () => GameObjects.GameObject | undefined
    findFirstMemberOfGroupByX: (additionalCondition?: (children: GameObjects.GameObject) => boolean) => GameObjects.GameObject | undefined
    findAllMembersByCondition: (condition: (children: GameObjects.GameObject) => boolean) => GameObjects.GameObject[]
    getMemberByName: <T extends GameObjects.GameObject>(name: string) => T | undefined
}

export type IAssetHelper = {
    scene: Scene
    loadSprite: (key: SPRITE_KEYS) => void
    loadSprites: (keys: SPRITE_KEYS[]) => void
    loadImage: (key: KEYS) => void
    loadImages: (keys: KEYS[]) => void
    loadPlatformMap: (key: PLATFORM_MAP_KEYS) => void
    loadPlatformMaps: (keys: PLATFORM_MAP_KEYS[]) => void
    loadFont: (key: FONT_KEYS) => void
    addImage: (key: KEYS, x?: number, y?: number) => GameObjects.Image
    addSprite: (key: SPRITE_KEYS, x?: number, y?: number) => GameObjects.Sprite
    addDynamicSprite: (key: string, x?: number, y?: number) => Types.Physics.Arcade.SpriteWithDynamicBody
    addDynamicImage: (key: string, x?: number, y?: number) => Types.Physics.Arcade.ImageWithDynamicBody
    addExistingSprite: (sprite: Physics.Arcade.Sprite, physics: boolean) => Physics.Arcade.Sprite
    addText: (key: FONT_KEYS, x: number, y: number, text?: string) => GameObjects.BitmapText
    getPlatformMap: (key: PLATFORM_MAP_KEYS) => MapType
}

export type IEventHelper = {
    scene: Scene
    dispatch: (key: EVENTS, ...args: unknown[]) => void
    addListener: (key: EVENTS, cb: Function, context?: unknown) => Events.EventEmitter
    timer: (delay: number, cb: () => void, scope: unknown, repeat?: number, loop?: boolean) => Time.TimerEvent
    removeTimer: (timer: Time.TimerEvent) => void
}