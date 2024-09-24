import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppConfig } from '../../app.config'

// eslint-disable-next-line import/no-relative-packages
import { PrismaClient } from './generated'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService<AppConfig, true>) {
    const databaseUrl = configService.get('DATABASE_URL', { infer: true })

    super({ datasourceUrl: databaseUrl })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
