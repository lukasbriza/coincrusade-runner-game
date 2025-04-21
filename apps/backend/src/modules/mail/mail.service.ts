/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(subject: string, text: string) {
    try {
      await this.mailerService.sendMail({
        to: this.configService.get('MAIL_RECIPIENT') ?? '',
        from: 'info@coincrusade.com',
        subject,
        text: '',
        html: `<p>${text}</p>`,
      })

      return {
        success: true,
        message: 'Email sent successfully',
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: 'Email not sent',
      }
    }
  }
}
