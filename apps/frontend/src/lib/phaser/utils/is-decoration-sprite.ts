export const isDecorationSprite = (spriteName: string) => {
  const nameArray = spriteName.split('.')
  return nameArray.length > 1 && nameArray.at(-1) === '{D}'
}
