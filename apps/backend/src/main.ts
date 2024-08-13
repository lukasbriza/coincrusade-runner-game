import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppConfig } from './app.config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, transform: true }))
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService<AppConfig, true>)
  const cors = configService.get('CORS', { infer: true })
  const environment = configService.get('NODE_ENV', { infer: true })
  const port = configService.get('PORT', { infer: true })

  if (environment === 'development') {
    const config = new DocumentBuilder()
      .setTitle('NestJs Swagger')
      .setDescription('NestJs App API')
      .setVersion('1.0')
      .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
      .addSecurityRequirements('X-API-KEY')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/swagger', app, document)

    // eslint-disable-next-line no-console
    console.log(`Swager running on: http://localhost:${port}/api/swagger`)
    console.log(`Application running on : http://localhost:${port}`)
  }

  if (cors) {
    app.enableCors({ origin: cors, credentials: true })
  }

  await app.listen(port)
}
// eslint-disable-next-line no-void
void bootstrap()
