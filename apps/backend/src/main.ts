import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi'

import { AppConfig } from './app.config'
import { AppModule } from './app.module'

if (process.env.NODE_ENV === 'development') {
  config({ path: '.env.local' })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, transform: true }))
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService<AppConfig, true>)
  const cors = configService.get('CORS', { infer: true })
  const environment = configService.get('NODE_ENV', { infer: true })
  const port = configService.get('PORT', { infer: true })

  if (environment === 'development') {
    const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle('NestJs WS')
      .setDescription('NestJs App Websocket API')
      .setVersion('1.0')
      .build()

    const asyncApiDocument = AsyncApiModule.createDocument(app, asyncApiOptions)
    await AsyncApiModule.setup('api/asyncapi', app, asyncApiDocument)

    // eslint-disable-next-line no-console
    console.log(`Application running on : http://localhost:${port}`)
  }

  if (cors) {
    app.enableCors({ origin: cors, credentials: true })
  }

  await app.listen(port)
}
// eslint-disable-next-line no-void
void bootstrap()
