export const isDecorationSprite = (spriteName: string) => {
    const nameArr = spriteName.split(".")
    return nameArr.length > 1 && nameArr[nameArr.length - 1] === "{D}"
}