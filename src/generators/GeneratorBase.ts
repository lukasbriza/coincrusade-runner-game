import _ from "lodash";
import { KEYS, PLATFORM_MAP_KEYS, SPRITE_KEYS, TILE } from "../constants";
import { MapTypeExtended, MapTypeMember } from "../interfaces/_index";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";

export class GeneratorBase {
    public manager: PlatformManager;

    constructor(manager: PlatformManager) {
        this.manager = manager
    }
    public dropCoin(chance: number): boolean {
        const random = Math.random()
        return random <= chance;
    }
    public computeCoinChances(mapType: MapTypeMember[][], coinDropChance: number): (string | null)[] {
        const coinArr: (string | null)[] = []

        //ITERATE THROUGH SLOPES
        mapType[0].forEach((_, column) => {
            //LOOK AT SLOPE
            if (this.canRenderCoin(mapType, column)) {
                const isCoinChance = this.dropCoin(coinDropChance)
                coinArr.push(isCoinChance ? "coin" : null)
                return
            }
            coinArr.push(null)
        })

        console.log({ mapType, coinArr })
        return coinArr
    }


    private canRenderCoin(mapType: MapTypeMember[][], columnIndex: number): boolean {
        const contraIndicationArray = [KEYS.ROCK1, KEYS.ROCK2, SPRITE_KEYS.SPRITE_WATER]
        const groundArray = [KEYS.GROUND, KEYS.SLIM_GROUND]

        let canRender: boolean = true
        let foundGround: boolean = false

        mapType.forEach((row) => {
            const targetMember = row[columnIndex]
            if (canRender !== false && foundGround === false) {
                if (contraIndicationArray.includes(targetMember as (KEYS | SPRITE_KEYS))) {
                    canRender = false
                }
                if (groundArray.includes(targetMember as KEYS)) {
                    foundGround = true
                }
            }
        })

        return canRender
    }

    public addRandomPlatau(map: MapTypeExtended) {
        let localMap = _.cloneDeep(map)

        const minPlatau = window.configurationManager.minPlatauCount
        const maxPlatau = window.configurationManager.maxPlatauCount
        const plataus = randomNumber(minPlatau, maxPlatau, true)
        const base = this.manager.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)

        for (let i = 0; i < plataus; i++) {
            localMap.coins.push(null)
            localMap.width = localMap.width + TILE.width
            localMap.map.forEach((row, i) => {
                localMap.map[i] = row.concat(base.map[i])
            })
        }

        return localMap
    }
}