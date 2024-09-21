import type { KEYS } from '../assets'
import { obstacles, platform } from '../assets'
import type { MapTypeMember } from '../types'

export const canRenderCoin = (mapType: MapTypeMember[][], columnIndex: number) => {
  let canRender = true
  let foundGround = false

  for (const row of mapType) {
    const targetMember = row[columnIndex] as KEYS
    if (canRender !== false && foundGround === false) {
      if (obstacles.includes(targetMember)) {
        canRender = false
      }
      if (platform.includes(targetMember)) {
        foundGround = true
      }
    }
  }
  return canRender
}
