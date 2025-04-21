import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'

import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_MODULE_HOST'),
          secure: true,
          port: 465,
          auth: {
            user: configService.get('MAIL_MODULE_USER'),
            pass: configService.get('MAIL_MODULE_PASSPHRASE'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
