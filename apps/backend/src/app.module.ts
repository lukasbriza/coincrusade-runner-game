import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { validateConfig } from './app.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './middleware'
import { GameLogsModule } from './modules/game-logs'
import { NeuralNetworkModule } from './modules/neural-network'

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
      isGlobal: true,
      cache: true,
      validate: validateConfig,
    }),
    GameLogsModule,
    NeuralNetworkModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
