import * as _ from "lodash-es";
import { grass, KEYS, PLATFORM_MAP_KEYS, SPRITE_KEYS, stumpAndTrees, tents, TILE } from "../constants";
import { MapTypeExtended, MapTypeMember } from "../interfaces/_index";
import { PlatformManager } from "../objects/_index";
import { randomNumber } from "../utils/_index";

export class GeneratorBase {
    public manager: PlatformManager;

    constructor(manager: PlatformManager) {
        this.manager = manager
    }
    public getChance(chance: number): boolean {
        const random = Math.random()
        return random <= chance;
    }
    public computeCoinChances(mapType: MapTypeMember[][], coinDropChance: number): (string | null)[] {
        const coinArr: (string | null)[] = []

        //ITERATE THROUGH SLOPES
        mapType[0].forEach((_, column) => {
            if (this.canRenderCoin(mapType, column)) {
                const isCoinChance = this.getChance(coinDropChance)
                coinArr.push(isCoinChance ? "coin" : null)
                return
            }
            coinArr.push(null)
        })
        return coinArr
    }


    private canRenderCoin(mapType: MapTypeMember[][], columnIndex: number): boolean {
        const contraIndicationArray = [KEYS.ROCK1, KEYS.ROCK2, SPRITE_KEYS.SPRITE_WATER]
        const groundArray = [KEYS.GROUND, KEYS.SLIM_GROUND]

        let canRender: boolean = true
        let foundGround: boolean = false

        //LOOK AT SLOPE FOR COIN GENERATION
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
        const config = window.configurationManager


        let tentAdded = false
        let treeOrStumpCount = 0

        for (let i = 0; i < plataus; i++) {
            const tentChance = this.getChance(config.platauTentChance)
            const grassChance = this.getChance(config.platauGrassChance)
            const stumpOrTreeChance = this.getChance(config.platauTreeOrStumpChance)

            //NO COINS ON PLATAU
            localMap.coins.push(null)
            //UPDATE MAP WIDTH FOR TRANSLATION
            localMap.width = localMap.width + TILE.width
            //EXTEND JSON SCHEMA
            localMap.map.forEach((row, i) => {
                let decoration: number | KEYS = 0
                if (localMap.map.length - 2 === i) {

                    if (tentAdded == false && tentChance) {
                        const sample = _.sample(tents)
                        if (sample) decoration = sample
                        tentAdded = true
                    }
                    if (!decoration && config.maxStumpsAndTreesOnPlatau > treeOrStumpCount && stumpOrTreeChance) {
                        const sample = _.sample(stumpAndTrees)
                        if (sample) decoration = sample
                        treeOrStumpCount++
                    }

                    if (!decoration && grassChance) {
                        const sample = _.sample(grass)
                        if (sample) decoration = sample
                    }


                    localMap.map[i] = row.concat([decoration ? decoration.toString() + ".{D}" : 0])
                    return
                }

                localMap.map[i] = row.concat(base.map[i])
            })
        }

        return localMap
    }
}