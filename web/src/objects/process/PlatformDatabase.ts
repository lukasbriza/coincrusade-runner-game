import { grass, KEYS, PLATFORM_MAP_KEYS, POOL_CONFIG, SPRITE_KEYS, TILE } from "../../constants";
import { ImageWithDynamicBody, IPlatformDatabase, MapTypeExtended, SpriteWithDynamicBody, TranslationResult } from "../../interfaces/_index";
import { Coin } from '../entity/Coin';
import { GameScene } from '../../scenes/_index';
import { cleanTileName, isDecorationSprite, isObstacleSprite, setupDynamicSpriteBase, setupImageBase } from '../../utils/_index';
import { Water } from '../entity/Water';
import { setupAssetbase } from '../../utils/setupAssetBase';
import { Eventhelper, AssetHelper } from "../../helpers/_index";
import { Physics } from "phaser";
import * as _ from "lodash-es";


export class PlatformDatabase implements IPlatformDatabase {
    public scene: GameScene;
    private assetHelper: AssetHelper;
    public eventHelper: Eventhelper;
    public chunk: number = POOL_CONFIG.chunkSize;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.assetHelper = new AssetHelper(scene)
        this.eventHelper = new Eventhelper(scene)
    }

    //INIT
    public generateInitialChunk(): TranslationResult {
        const baseMap = this.assetHelper.getPlatformMap(PLATFORM_MAP_KEYS.BASE)
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
        return this.translateMapTypes(chunkMap, 0)
    }

    //ABL METHODS
    public translateMapTypes(map: MapTypeExtended[], xStartPosition: number): TranslationResult {
        let cumulativeMapWidth = 0
        const translateResult: TranslationResult[] = map.map((mapType, xOffset) => {
            //RESOLVE IF LAST FROM CHUNK
            const isLastFromChunk = (xOffset === (map.length - 1) && mapType.difficulty !== 0)

            const xStart = cumulativeMapWidth + xStartPosition
            cumulativeMapWidth = cumulativeMapWidth + mapType.width
            return this.translateMapType(mapType, xStart, isLastFromChunk)
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
    public translateMapType(jsonMap: MapTypeExtended, xStartPosition: number = 0, lastMapFromGeneratedChunk: boolean = false): TranslationResult {
        //PLACE TILES AND DECORATIONS ON MAP
        const tiles = this.tileTranslationMatrix(jsonMap, xStartPosition, lastMapFromGeneratedChunk)
        //PLACE COINS ON MAP
        const coins = this.coinTranslationMatrix(jsonMap.coins, xStartPosition)
        return { coins, ...tiles }
    }
    private tileTranslationMatrix(jsonMap: MapTypeExtended, xStartPosition: number = 0, lastMapFromGeneratedChunk: boolean) {
        const tileMap = jsonMap.map
        const platforms: SpriteWithDynamicBody[] = []
        const decorations: ImageWithDynamicBody[] = []
        const obstacles: SpriteWithDynamicBody[] = []
        const slopeTriggers: SpriteWithDynamicBody[] = []

        tileMap.forEach((row, yOffset) => {
            const y = yOffset * TILE.height

            row.forEach((tile, xOffset) => {
                const x = (xOffset * TILE.width) + xStartPosition
                const isBottomTile = yOffset === (tileMap.length - 1)
                const isFirstColumn = xOffset === 0
                const chunkEnd = lastMapFromGeneratedChunk && xOffset === (row.length - 1)

                if (isBottomTile) {
                    const slopeTrigger = setupDynamicSpriteBase(this.assetHelper, KEYS.GROUND, x, y)
                    slopeTrigger.resetCollisionCategory()
                    slopeTrigger.setAlpha(0)
                    slopeTrigger.setDataEnabled()
                    slopeTrigger.setData("isSlopeTrigger", true)

                    //MARK FOR CHUNK END LOG
                    if (chunkEnd) {
                        slopeTrigger.setData("chunkEnd", true)
                        slopeTrigger.setAlpha(0)
                        slopeTrigger.setDepth(10)
                        slopeTrigger.setTintFill(0xff0000)
                    }
                    //MARK FOR MAP DIFFICULTY LOG
                    if (isFirstColumn) {
                        slopeTrigger.setData("mapDifficulty", jsonMap.difficulty)
                    }
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

                        this.setupPlatform(cleanName, x, y, platforms)
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