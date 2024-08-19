import { ANIMATION_KEYS } from '../../assets'
import type { Knight } from '../../factories'

export const knightDead = (knight: Knight) => {
  const callback = () => {
    knight.removeListeners()
    knight.clearTint()
    knight.setVelocityX(0)
    if (knight.body?.x && knight.body.x < 10) {
      knight.setPosition(10, knight.body?.y)
    }
    knight.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_DEAD }, false)
  }
  knight.timerHelper.timer(callback, 300, knight, undefined, false)
}
