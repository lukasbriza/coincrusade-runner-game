import { ANIMATION_KEYS } from '../../assets'

export const knightJump = (knight: IKnight) => {
  if (!knight.inAir) {
    knight.inAir = true
    if (knight.body) {
      knight.body.velocity.y = -knight.powerBar.jumpPower * 12
    }
  }
  knight.powerBar.stopCollecting()
  knight.anims.play({ key: ANIMATION_KEYS.ANIMATION_KNIGHT_JUMP }, true)
}
