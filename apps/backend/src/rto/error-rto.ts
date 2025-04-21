import { ApiProperty } from '@nestjs/swagger'

export class ErrorRto {
  @ApiProperty()
  readonly message: string
}
