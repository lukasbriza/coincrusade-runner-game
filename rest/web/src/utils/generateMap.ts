import { TILE } from "../constants";
import { IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import * as _ from "lodash-es";

export const generateMap = (generator: IPlatformGenerator, finalMaps: MapTypeExtended[], lenght: number, maxLenght: number) => {
  const wantedDifficultyValue = generator.weightedMapDifficultyPick()
  const mapsByDifficulty = generator.getPlatformMapsByDifficulty(wantedDifficultyValue)
  const map = _.sample(mapsByDifficulty) ?? mapsByDifficulty[0]

  const coins: (string | null)[] = generator.computeCoinChances(map.map, window.configurationManager.coinGenerationChance)
  const extendedMap = { coins, ...map } as MapTypeExtended
  const extendedMapWithPlatau = generator.addRandomPlatau(extendedMap)
  finalMaps.push(extendedMapWithPlatau)
  extendedMap.map[0].forEach(() => { lenght = lenght + TILE.width })

  if (lenght < maxLenght) {
    generateMap(generator, finalMaps, lenght, maxLenght)
  }
}
