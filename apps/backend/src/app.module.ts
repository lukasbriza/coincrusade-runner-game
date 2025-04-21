import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { validateConfig } from './app.config'
import { CoincrusadeGatewayModule } from './gateway/coincrusade-gateway.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '../.env.dev' : '../.env',
      isGlobal: true,
      cache: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validate: validateConfig,
    }),
    CoincrusadeGatewayModule,
  ],
})
export class AppModule {}
