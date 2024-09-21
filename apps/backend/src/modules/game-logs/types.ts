import { ApiProperty } from '@nestjs/swagger'

export class GameLogsResponse {
  @ApiProperty()
  readonly id: string
}
