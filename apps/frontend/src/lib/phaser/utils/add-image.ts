import type { Scene } from 'phaser'

import type { KEYS } from '../assets'

export const addImage = (scene: Scene, key: KEYS, x?: number, y?: number) => scene.add.image(x ?? 0, y ?? 0, key)
