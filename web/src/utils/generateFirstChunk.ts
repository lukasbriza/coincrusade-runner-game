import { TILE } from "../constants"
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index"
import * as _ from "lodash-es";

export const generateFirstchunk = (generator: IPlatformGenerator, finalMaps: MapTypeExtended[], lenght: number, maxLenght: number) => {
    const maps1 = generator.getPlatformMapsByDifficulty(1)
    const maps2 = generator.getPlatformMapsByDifficulty(2)
    const maps = [...maps1, ...maps2]
    const map = _.sample(maps) ?? maps[0]
    const coinArr: (string | null)[] = generator.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
    const extendedMap = { coins: coinArr, ...map } as MapTypeExtended
    const extendedMapWithPlatau = generator.addRandomPlatau(extendedMap)
    finalMaps.push(extendedMapWithPlatau)
    extendedMap.map[0].forEach(() => { lenght = lenght + TILE.width })

    if (lenght < maxLenght) {
        generateFirstchunk(generator, finalMaps, lenght, maxLenght)
    }
}