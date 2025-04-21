import { ApiProperty } from '@nestjs/swagger'

export class HealthCheckRto {
  @ApiProperty()
  readonly health: string
}
