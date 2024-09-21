import { obstacles } from '../assets'

export const isObstacleSprite = (cleanName: string) => obstacles.map((name) => name.toString()).includes(cleanName)
