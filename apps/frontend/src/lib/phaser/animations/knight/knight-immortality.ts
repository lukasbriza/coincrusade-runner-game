import type { Knight } from '../../factories'

export const knightImmortality = (knight: Knight) => {
  if (!knight.immortalEvent) {
    knight.immortalAnimation = true
    const delay = 250
    const repeat = Math.floor(4000 / delay)

    const callback = () => {
      if (!knight.tinted) {
        knight.setTintFill(0xff_ff_ff)
        knight.tinted = true
        return
      }
      knight.clearTint()
      knight.tinted = false
    }
    const clear = () => {
      knight.clearTint()
      if (knight.immortalEvent) {
        knight.timerHelper.removeTimer(knight.immortalEvent)
      }
      knight.immortalEvent = undefined
      knight.immortalAnimation = false
    }

    knight.immortalEvent = knight.timerHelper.timer(callback, delay, this, repeat, false)
    knight.timerHelper.timer(clear, (repeat + 1) * delay, this, undefined, false)
  }
}
