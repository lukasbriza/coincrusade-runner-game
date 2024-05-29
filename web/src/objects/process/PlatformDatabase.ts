import { grass, KEYS, PLATFORM_MAP_KEYS, POOL_CONFIG, SPRITE_KEYS, TILE } from "../../constants";
import { ImageWithDynamicBody, IPlatformDatabase, MapType, MapTypeExtended, MapTypeMember, SpriteWithDynamicBody, TranslationResult } from "../../interfaces/_index";
import { Coin } from '../entity/Coin';
import { GameScene } from '../../scenes/_index';
import { cleanTileName, isDecorationSprite, isObstacleSprite, setupDynamicSpriteBase, setupImageBase } from '../../utils/_index';
import { Water } from '../entity/Water';
import { setupAssetbase } from '../../utils/setupAssetBase';
import * as _ from "lodash-es";
import { Eventhelper, AssetHelper } from "../../helpers/_index";
import { Physics } from "phaser";


export class PlatformDatabase implements IPlatformDatabase {
    private scene: GameScene;
    private assetHelper: AssetHelper;

    public eventHelper: Eventhelper;
    public avaliablePlatformMaps: MapType[];
    public chunk: number = POOL_CONFIG.chunkSize;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.assetHelper = new AssetHelper(scene)
        this.eventHelper = new Eventhelper(scene)

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
            decorations: prev.decorations.concat(curr.decorations),
            obstacles: prev.obstacles.concat(curr.obstacles),
            slopeTriggers: prev.slopeTriggers.concat(curr.slopeTriggers)
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
        const platforms: SpriteWithDynamicBody[] = []
        const decorations: ImageWithDynamicBody[] = []
        const obstacles: SpriteWithDynamicBody[] = []
        const slopeTriggers: SpriteWithDynamicBody[] = []

        tileMap.forEach((row, yOffset) => {
            const y = yOffset * TILE.height
            row.forEach((tile, xOffset) => {
                const x = (xOffset * TILE.width) + xStartPosition
                const isBottomTile = yOffset === (tileMap.length - 1)

                if (isBottomTile) {
                    const slopeTrigger = setupDynamicSpriteBase(this.assetHelper, KEYS.GROUND, x, y)
                    slopeTrigger.resetCollisionCategory()
                    slopeTrigger.setAlpha(0)
                    slopeTriggers.push(slopeTrigger)
                }

                if (typeof tile === "string") {
                    let cleanName = cleanTileName(tile)
                    const isDecoration = isDecorationSprite(tile)
                    const isObstacle = isObstacleSprite(cleanName)

                    if (isDecoration) {
                        const decX = x + (TILE.width / 2)
                        const decY = y + TILE.height
                        this.processDecoration(cleanName, decX, decY, decorations)
                    }
                    if (!isDecoration) {
                        if (isObstacle) {
                            this.processObstacle(cleanName, x, y, obstacles)
                            return
                        }

                        const sprite = setupDynamicSpriteBase(this.assetHelper, cleanName, x, y)
                        switch (cleanName) {
                            case KEYS.SLIM_GROUND:
                                sprite.setPosition(x, y + (TILE.height - sprite.body.height))
                                break
                        }
                        platforms.push(sprite)
                    }

                }
            })
        })
        return { platforms, decorations, obstacles, slopeTriggers }
    }
    private coinTranslationMatrix(coinTileArr: (string | null)[], xStartPosition: number = 0): Coin[] {
        const coins: Coin[] = []

        coinTileArr.forEach((tile, xOffset) => {
            if (tile === "coin") {
                const x = (xOffset * TILE.width) + xStartPosition
                const coin = new Coin(this.scene, x + (TILE.width / 2), 0);
                coin.setPosition(x + (TILE.width / 2) - coin.body!.width / 2, 0)
                setupAssetbase(coin)
                coin.setImmovable(false)
                coins.push(coin)
            }
        })
        return coins
    }

    //UTILS
    private processDecoration(cleanName: string, x: number, y: number, decorations: ImageWithDynamicBody[]) {
        if (cleanName === "tree") {
            const treeArray = [KEYS.TREE1, KEYS.TREE2]
            cleanName = _.sample(treeArray)?.toString() ?? "tree1"
        }
        if (cleanName === "grass") {
            const grassArray = [KEYS.GRASS1, KEYS.GRASS2, KEYS.GRASS3, KEYS.GRASS4, KEYS.GRASS5, KEYS.GRASS6]
            cleanName = _.sample(grassArray)?.toString() ?? "grass1"
        }

        const image = setupImageBase(
            this.assetHelper,
            cleanName,
            x,
            y
        )
        decorations.push(image)
    }
    private processObstacle(cleanName: string, x: number, y: number, obstacles: SpriteWithDynamicBody[]) {
        let obstacle: Physics.Arcade.Sprite | undefined = undefined

        switch (cleanName) {
            case SPRITE_KEYS.SPRITE_WATER:
                const water = new Water(this.scene, x, y)
                setupAssetbase(water)
                water.setPosition(x, y + (TILE.height - water.height))
                obstacle = water
                break
            case KEYS.ROCK1:
            case KEYS.ROCK2:
                const sprite = setupDynamicSpriteBase(this.assetHelper, cleanName, x, y)
                sprite.setPosition(x, y + (TILE.height - sprite.body.height))
                sprite.setSize(sprite.width, sprite.height - 10)
                sprite.setOffset(0, 10)
                obstacle = sprite
                break
        }

        obstacle && obstacles.push(obstacle)
    }
    private setupPlatform(cleanName: string, x: number, y: number, platforms: SpriteWithDynamicBody[]) {
        const sprite = setupDynamicSpriteBase(this.assetHelper, cleanName, x, y)
        switch (cleanName) {
            case KEYS.SLIM_GROUND:
                sprite.setPosition(x, y + (TILE.height - sprite.body.height))
                break
        }
        platforms.push(sprite)
    }
}