import { v4 as uuidv4 } from 'uuid';
import { GAME_PARAMETERS } from "../configurations";
import { PLATFORM_MAP_KEYS, PLATFORMS_MAPS, POOL_CONFIG, TILE } from "../constants";
import { DynamicSprite, MapType } from "../interfaces/_index";
import { GameScene } from "../scenes/_index";
import { Types } from 'phaser';

export class PlatformDatabase {
    public scene: GameScene
    public avaliablePlatforms: MapType[]
    public chunk: number

    constructor(scene: GameScene) {
        this.scene = scene
        this.chunk = POOL_CONFIG.chunkSize
        this.avaliablePlatforms = PLATFORMS_MAPS.map(map => this.scene.assetManager.getPlatformMap(map.key))
    }
    //INIT
    public generateInitialChunk() {
        const baseMap = this.getPlatformMapByKey(PLATFORM_MAP_KEYS.BASE)
        const iterations = Math.ceil(this.chunk / baseMap.width) * 2
        const chunkMap: MapType[] = []

        for (let i = 0; i < iterations; i++) {
            chunkMap.push(baseMap)
        }
        return this.translateMaptypes(chunkMap)
    }

    //ABL METHODS
    public getPlatformMapByKey(key: PLATFORM_MAP_KEYS): MapType {
        return this.scene.assetManager.getPlatformMap(key)
    }

    public getPlatformMapsByDifficulty(difficulty: number): MapType[] {
        return this.avaliablePlatforms.filter(map => map.difficulty == difficulty)
    }

    public translateMaptypes(map: MapType[]) {
        const spriteMap: DynamicSprite[][] = map.map((mapType, xOffset) => {
            return this.translateMaptype(mapType, xOffset * TILE.width)
        })
        return spriteMap.reduce((prev, curr) => prev.concat(curr))
    }

    //UTILITY METHODS
    private translateMaptype(map: MapType, xStartPosition: number = 0): Types.Physics.Arcade.SpriteWithDynamicBody[] {
        const sprites: DynamicSprite[] = []

        map.map.forEach((row, yOffset) => {
            const y = yOffset * TILE.height
            row.forEach((tile, xOffset) => {
                const x = (xOffset * TILE.width) + xStartPosition

                //When string => is some sprite
                if (typeof tile === "string") {
                    const sprite = this.scene.physics.add.sprite(x, y, tile)
                    sprite.setOrigin(0, 0)
                    sprite.setImmovable(true)
                    sprite.setFriction(0, 0)
                    sprite.setName(uuidv4())
                    sprite.setVelocityX(GAME_PARAMETERS.platformStartSpeed * -1)
                    sprites.push(sprite)
                }
            })
        })

        return sprites
    }
}