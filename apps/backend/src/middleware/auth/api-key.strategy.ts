import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import Strategy from 'passport-headerapikey'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  private readonly configService: ConfigService

  constructor(configService: ConfigService) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      true,
      (apiKey: string, done: (error: Error | null, data: boolean | null) => object) => this.validate(apiKey, done),
    )
    this.configService = configService
  }

  public validate = (apiKey: string, done: (error: Error | null, data: boolean | null) => object) => {
    if (this.configService.get<string>('API_KEY') === apiKey) {
      done(null, true)
    }
    done(new UnauthorizedException(), null)
  }
}
