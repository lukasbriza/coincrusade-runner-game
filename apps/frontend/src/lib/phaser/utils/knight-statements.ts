import { TILE_WIDTH } from '../constants'

export const isKnightOnRightSideOfWorld = (knight: IKnight) => {
  if (knight.body) {
    return knight.body.x + knight.body.width >= knight.scene.renderer.width - TILE_WIDTH / 2
  }
  return false
}

export const isKnightOnLeftSideOfWorld = (knight: IKnight) => {
  if (knight.body) {
    return knight.body.x <= 10 && !knight.immortalAnimation
  }
  return false
}

export const isKnightOnLeftSideCorner = (knight: IKnight) => {
  if (knight.body) {
    return knight.body.x <= 0 && !knight.immortalAnimation
  }
  return false
}
