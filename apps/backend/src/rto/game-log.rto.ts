import { ApiProperty } from '@nestjs/swagger'

export class GameLogsRto {
  @ApiProperty()
  readonly id: string
}
