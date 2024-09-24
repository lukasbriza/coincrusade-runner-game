export const getChance = (chance: number) => {
  const random = Math.random()
  return random <= chance
}
