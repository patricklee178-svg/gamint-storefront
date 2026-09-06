import { html as emailVerification } from "./email-verification"
import { html as paymentSuccess } from "./payment-success"
import { html as gameDelivery } from "./game-delivery"
import { html as passwordReset } from "./password-reset"
import { html as welcome } from "./welcome"

export const templates: Record<string, string> = {
  "email-verification": emailVerification,
  "payment-success": paymentSuccess,
  "game-delivery": gameDelivery,
  "password-reset": passwordReset,
  welcome: welcome,
}
