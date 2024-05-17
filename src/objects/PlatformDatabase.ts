import { v4 as uuidv4 } from 'uuid';
import { GAME_PARAMETERS } from "../configurations";
import { PLATFORM_MAP_KEYS, POOL_CONFIG, TILE } from "../constants";
import { MapType, MapTypeExtended, TranslationResult } from "../interfaces/_index";
import { AssetHelper } from '../helpers/AssetHelper';
import { Coin } from './Coin';
import { GameScene } from '../scenes/_index';
import { Types } from 'phaser';

export class PlatformDatabase {
    private scene: GameScene;
    private assetHelper: AssetHelper;
    public avaliablePlatforms: MapType[];
    public chunk: number = POOL_CONFIG.chunkSize;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.assetHelper = new AssetHelper(scene)
        const mapKeys = Object.keys(PLATFORM_MAP_KEYS)
        this.avaliablePlatforms = mapKeys.map(key => this.assetHelper.getPlatformMap(PLATFORM_MAP_KEYS[key as keyof typeof PLATFORM_MAP_KEYS]))
    }

    //INIT
    public generateInitialChunk() {
        const baseMap = this.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)
        const iterations = Math.ceil(this.chunk / baseMap.width) * 2
        const chunkMap: MapTypeExtended[] = []

        for (let i = 0; i < iterations; i++) {
            chunkMap.push({ ...baseMap, coins: [null] })
        }
        return this.translateMaptypes(chunkMap, undefined)
    }

    //ABL METHODS
    public getPlatformMapByKey(key: PLATFORM_MAP_KEYS): MapType {
        return this.assetHelper.getPlatformMap(key)
    }
    public getPlatformMapsByDifficulty(difficulty: number): MapType[] {
        return this.avaliablePlatforms.filter(map => map.difficulty == difficulty)
    }
    public translateMaptypes(map: MapTypeExtended[], xStartPosition?: number) {
        const translateResult: TranslationResult[] = map.map((mapType, xOffset) => {
            const xStart = (xOffset * TILE.width) + (xStartPosition ?? 0)
            return this.translateMaptype(mapType, xStart)
        })
        return translateResult.reduce((prev, curr) => ({ coins: prev.coins.concat(curr.coins), sprites: prev.sprites.concat(curr.sprites) }))
    }

    //UTILITY METHODS
    private translateMaptype(map: MapTypeExtended, xStartPosition: number = 0) {
        const sprites: Types.Physics.Arcade.SpriteWithDynamicBody[] = []
        const coins: Coin[] = []

        map.map.forEach((row, yOffset) => {
            const y = yOffset * TILE.height
            row.forEach((tile, xOffset) => {
                const x = (xOffset * TILE.width) + xStartPosition
                //HANDLE TILES
                //When string => is some sprite
                if (typeof tile === "string" && tile !== "coin") {
                    const sprite = this.assetHelper.addDynamicSprite(tile, x, y)
                    sprite.setOrigin(0, 0)
                    sprite.setImmovable(true)
                    sprite.setFriction(0, 0)
                    sprite.setName(uuidv4())
                    sprite.setVelocityX(GAME_PARAMETERS.platformStartSpeed * -1)
                    sprites.push(sprite)
                }
            })
        })

        map.coins.forEach((tile, xOffset) => {
            //HANDLE COINS
            if (tile === "coin") {
                const x = (xOffset * TILE.width) + xStartPosition
                const coin = new Coin(this.scene, x + (TILE.width / 2), 0);
                coin.setOrigin(0.5, 0.5)
                coin.setImmovable(false)
                coin.setFriction(0, 0)
                coin.setName(uuidv4())
                coin.setVelocityX(GAME_PARAMETERS.platformStartSpeed * -1)
                coins.push(coin)
            }
        })

        return { sprites, coins }
    }
}