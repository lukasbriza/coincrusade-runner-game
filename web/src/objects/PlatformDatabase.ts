import { grass, KEYS, PLATFORM_MAP_KEYS, POOL_CONFIG, SPRITE_KEYS, TILE } from "../constants";
import { ImageWithDynamicBody, IPlatformDatabase, MapType, MapTypeExtended, MapTypeMember, SpriteWithDynamicBody, TranslationResult } from "../interfaces/_index";
import { AssetHelper } from '../helpers/AssetHelper';
import { Coin } from './Coin';
import { GameScene } from '../scenes/_index';
import { cleanTileName, isDecorationSprite, setupDynamicSpriteBase, setupImageBase } from '../utils/_index';
import { Water } from './Water';
import { setupAssetbase } from '../utils/setupAssetBase';
import * as _ from "lodash-es";


export class PlatformDatabase implements IPlatformDatabase {
    private scene: GameScene;
    private assetHelper: AssetHelper;
    public avaliablePlatformMaps: MapType[];
    public chunk: number = POOL_CONFIG.chunkSize;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.assetHelper = new AssetHelper(scene)
        const mapKeys = Object.keys(PLATFORM_MAP_KEYS)
        this.avaliablePlatformMaps = mapKeys.map(key => this.assetHelper.getPlatformMap(PLATFORM_MAP_KEYS[key as keyof typeof PLATFORM_MAP_KEYS]))
    }

    //INIT
    public generateInitialChunk(): TranslationResult {
        const baseMap = this.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)

        const iterations = Math.ceil(this.chunk / baseMap.width) * 2
        const chunkMap: MapTypeExtended[] = []

        for (let i = 0; i < iterations; i++) {
            let localMap = _.cloneDeep(baseMap)
            if (window.configurationManager.platauGrassChance > Math.random()) {
                const key = _.sample(grass)

                if (key) localMap.map[localMap.map.length - 2][0] = key ? (key.toString() + ".{D}") : 0
            }
            chunkMap.push({ ...localMap, coins: [null] })
        }
        return this.translateMaptypes(chunkMap, undefined)
    }

    //ABL METHODS
    public getPlatformMapByKey(key: PLATFORM_MAP_KEYS): MapType {
        return this.assetHelper.getPlatformMap(key)
    }
    public getPlatformMapsByDifficulty(difficulty: number): MapType[] {
        return this.avaliablePlatformMaps.filter(map => map.difficulty == difficulty)
    }
    public getAllMaps(): MapType[] {
        return this.avaliablePlatformMaps.filter(map => map.width > TILE.width)
    }
    public translateMaptypes(map: MapTypeExtended[], xStartPosition?: number): TranslationResult {
        const translateResult: TranslationResult[] = map.map((mapType, xOffset) => {
            const xStart = (xOffset * TILE.width) + (xStartPosition ?? 0)
            return this.translateMaptype(mapType, xStart)
        })
        return translateResult.reduce((prev, curr) => ({
            coins: prev.coins.concat(curr.coins),
            platforms: prev.platforms.concat(curr.platforms),
            decorations: prev.decorations.concat(curr.decorations)
        }))
    }

    //UTILITY METHODS
    public translateMaptype(jsonMap: MapTypeExtended, xStartPosition: number = 0): TranslationResult {
        //PLACE TILES AND DECORATIONS ON MAP
        const tiles = this.tileTranslationMatrix(jsonMap.map, xStartPosition)
        //PLACE COINS ON MAP
        const coins = this.coinTranslationMatrix(jsonMap.coins, xStartPosition)
        return { coins, ...tiles }
    }
    private tileTranslationMatrix(tileMap: MapTypeMember[][], xStartPosition: number = 0) {
        const platformSpeed = window.configurationManager.platformStartSpeed
        const platforms: SpriteWithDynamicBody[] = []
        const decorations: ImageWithDynamicBody[] = []

        tileMap.forEach((row, yOffset) => {
            const y = yOffset * TILE.height
            row.forEach((tile, xOffset) => {
                const x = (xOffset * TILE.width) + xStartPosition

                if (typeof tile === "string") {
                    const isDecoration = isDecorationSprite(tile)
                    let cleanName = cleanTileName(tile)

                    if (isDecoration) {
                        if (cleanName === "tree") {
                            const treeArray = [KEYS.TREE1, KEYS.TREE2]
                            console.log(_.sample(treeArray))
                            cleanName = _.sample(treeArray)?.toString() ?? "tree1"
                        }
                        if (cleanName === "grass") {
                            const grassArray = [KEYS.GRASS1, KEYS.GRASS2, KEYS.GRASS3, KEYS.GRASS4, KEYS.GRASS5, KEYS.GRASS6]
                            cleanName = _.sample(grassArray)?.toString() ?? "grass1"
                        }

                        const image = setupImageBase(
                            this.assetHelper,
                            cleanName,
                            x + (TILE.width / 2),
                            y + TILE.height
                        )
                        decorations.push(image)
                    }
                    if (!isDecoration) {
                        if (cleanName === SPRITE_KEYS.SPRITE_WATER) {
                            const water = new Water(this.scene, x, y)
                            water.setOrigin(0, 0)
                            setupAssetbase(water)
                            water.setVelocityX(platformSpeed * -1)
                            water.setPosition(x, y + (TILE.height - water.height))
                            platforms.push(water)
                            return
                        }

                        const sprite = setupDynamicSpriteBase(this.assetHelper, cleanName, x, y)
                        sprite.setOrigin(0, 0)

                        switch (cleanName) {
                            case KEYS.SLIM_GROUND:
                                sprite.setPosition(x, y + (TILE.height - sprite.body.height))
                                break
                            case KEYS.ROCK1:
                            case KEYS.ROCK2:
                                sprite.setPosition(x, y + (TILE.height - sprite.body.height))
                                sprite.setSize(sprite.width, sprite.height - 10)
                                sprite.setOffset(0, 10)
                        }

                        platforms.push(sprite)
                    }

                }
            })
        })
        return { platforms, decorations }
    }
    private coinTranslationMatrix(coinTileArr: (string | null)[], xStartPosition: number = 0): Coin[] {
        const platformSpeed = window.configurationManager.platformStartSpeed
        const coins: Coin[] = []

        coinTileArr.forEach((tile, xOffset) => {
            if (tile === "coin") {
                const x = (xOffset * TILE.width) + xStartPosition
                const coin = new Coin(this.scene, x + (TILE.width / 2), 0);
                coin.setOrigin(0.5, 0.5)
                setupAssetbase(coin)
                coin.setImmovable(false)
                coin.setVelocityX(platformSpeed * -1)
                coins.push(coin)
            }
        })
        return coins
    }
}