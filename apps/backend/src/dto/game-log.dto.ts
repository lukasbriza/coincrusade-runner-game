import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ArrayMinSize,
  ValidateNested,
  IsDateString,
} from 'class-validator'

export class Log {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkLostLives: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkElapsedSeconds: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkGainedSeconds: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkPickedCoins: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkGeneratedCoins: number

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly chunkMapDifficulties: number[]

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkPlatformSpeed: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly chunkDifficultySkore: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly gameTotalElapsedSeconds: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly gameTotalGainedSeconds: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly gameEngine: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly engineSuggestedAction?: 'decrease' | 'increase' | 'neutral'

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly chunkCreated: Date
}

@ApiExtraModels(Log)
export class GameLogDto {
  @ApiProperty({ type: 'array', oneOf: [{ $ref: getSchemaPath(Log) }] })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Log)
  readonly logs: Log[]
}
