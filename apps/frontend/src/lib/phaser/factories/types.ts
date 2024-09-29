import type { Tilemaps, Types, Sound } from 'phaser'

export type ColliderObject = Tilemaps.Tile | Types.Physics.Arcade.GameObjectWithBody
export type SoundObject = Sound.HTML5AudioSound | Sound.NoAudioSound | Sound.WebAudioSound
