export const cleanTileName = (name: string) => {
    const nameArr = name.split(".")
    return nameArr[0]
}