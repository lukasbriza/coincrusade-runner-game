import { ApiProperty } from '@nestjs/swagger'

export class NeuralNetworkRto {
  @ApiProperty()
  readonly increase: number
  @ApiProperty()
  readonly stay: number
  @ApiProperty()
  readonly decrease: number
}
