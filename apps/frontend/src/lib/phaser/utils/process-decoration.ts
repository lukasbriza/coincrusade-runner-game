import sample from 'lodash.sample'

import { grass, KEYS, trees } from '../assets'
import type { ImageWithDynamicBody, IScene, PlayerState } from '../types'

import { setupImageBase } from './setup-image-base'

export const processDecoration = (
  scene: IScene,
  state: PlayerState,
  cleanName: string,
  x: number,
  y: number,
  decorations: ImageWithDynamicBody[],
) => {
  if (cleanName === 'tree') {
    cleanName = sample(trees)?.toString() ?? KEYS.TREE1
  }
  if (cleanName === 'grass') {
    cleanName = sample(grass)?.toString() ?? KEYS.GRASS1
  }

  const image = setupImageBase(scene, state, cleanName, x, y)
  decorations.push(image)
}
