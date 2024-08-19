import { knightRunSetup } from './knight-run-setup'

export const knightRunReset = (knight: IKnight) => {
  knightRunSetup(knight)
  knight.setVelocityX(300)
}
