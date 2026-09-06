import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils"
import {
  Logger,
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"
import { Resend } from "resend"
import { templates } from "../../emails"

type ResendOptions = {
  api_key: string
  from: string
}

type InjectedDependencies = {
  logger: Logger
}

const TEMPLATE_SUBJECTS: Record<string, string> = {
  "email-verification": "تأیید ایمیل و ورود به حساب گیمینت",
  "payment-success": "پرداخت شما با موفقیت انجام شد",
  "game-delivery": "بازی‌ت آماده‌ست!",
  "password-reset": "بازیابی رمز عبور گیمینت",
  welcome: "به گیمینت خوش اومدی",
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend"
  private resendClient: Resend
  private options: ResendOptions
  private logger: Logger

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this.resendClient = new Resend(options.api_key)
    this.options = options
    this.logger = logger
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `api_key` is required in the resend provider's options."
      )
    }
    if (!options.from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `from` is required in the resend provider's options."
      )
    }
  }

  private renderTemplate(html: string, data: Record<string, unknown>): string {
    const withYear = { year: new Date().getFullYear(), ...data }

    return html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key) => {
      const value = withYear[key]
      return value === undefined || value === null ? "" : String(value)
    })
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const templateName = notification.template
    const html = templates[templateName]

    if (!html) {
      this.logger.error(
        `[resend] Couldn't find email template "${templateName}".`
      )
      return {}
    }

    const data = (notification.data as Record<string, unknown>) || {}
    const renderedHtml = this.renderTemplate(html, data)
    const subject =
      (data.subject as string) || TEMPLATE_SUBJECTS[templateName] || "گیمینت"

    const { data: sent, error } = await this.resendClient.emails.send({
      from: this.options.from,
      to: [notification.to],
      subject,
      html: renderedHtml,
    })

    if (error || !sent) {
      this.logger.error(
        `[resend] Failed to send "${templateName}" email to ${notification.to}: ${
          error?.message || "unknown error"
        }`
      )
      return {}
    }

    return { id: sent.id }
  }
}

export default ResendNotificationProviderService
