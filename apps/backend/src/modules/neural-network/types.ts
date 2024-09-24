import { ApiProperty } from '@nestjs/swagger'

export type NeuralNetworkInputShape = [number, number, number, number, number, number, number]
export type NeuralNetworkOutputShape = [number, number, number]

export class NeuralNetworkResponse {
  @ApiProperty()
  readonly increase: number
  @ApiProperty()
  readonly stay: number
  @ApiProperty()
  readonly decrease: number
}
