import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"

const GamintHomePage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Container>
        <div className="flex flex-col gap-y-2">
          <Heading level="h1">مدیریت صفحه اصلی GAMINT</Heading>

          <Text className="text-ui-fg-subtle">
            از این بخش می‌توانی محتوای صفحه اصلی سایت را بدون ترمینال مدیریت کنی.
          </Text>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-y-2">
          <Heading level="h2">Hero صفحه اصلی</Heading>

          <Text>
            در مرحله بعد ویرایش تصویر، عنوان، متن، دکمه و موقعیت Hero را اینجا اضافه می‌کنیم.
          </Text>
        </div>
      </Container>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "مدیریت صفحه اصلی",
})

export default GamintHomePage
