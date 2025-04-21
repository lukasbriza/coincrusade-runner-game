import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class MailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly subject: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly text: string
}
