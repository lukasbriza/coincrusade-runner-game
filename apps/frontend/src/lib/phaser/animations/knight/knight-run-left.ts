export const knightRunLeft = (knight: IKnight) => {
  knight.setOrigin(0.5, 0.5)
  knight.setFlipX(true)
  knight.setOffset(75, 65)
  knight.setVelocityX(-480)
}
