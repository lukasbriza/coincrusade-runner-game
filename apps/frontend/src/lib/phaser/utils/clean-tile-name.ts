export const cleanTileName = (name: string) => {
  const nameArray = name.split('.')
  return nameArray[0]
}
