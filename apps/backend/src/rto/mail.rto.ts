import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator'

export class MailRto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly success: boolean

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly message: string
}
