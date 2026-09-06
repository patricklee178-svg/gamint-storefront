// Auto-generated from payment-success.html — do not edit the .html separately, keep them in sync.
export const html = `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>پرداخت شما با موفقیت انجام شد</title>
</head>
<body style="margin:0; padding:0; background-color:#05070b; font-family:Tahoma, Arial, sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#05070b;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#0a0d14; border:1px solid #1c1f2a; border-radius:20px; overflow:hidden;">

        <!-- Header / Logo -->
        <tr>
          <td align="center" style="padding:36px 32px 24px 32px;">
            <img src="https://gamint.ir/gamint-logo-email.png" width="140" alt="گیمینت" style="display:block; border:0;" />
          </td>
        </tr>

        <tr><td style="padding:0 32px;"><div style="height:1px; background-color:#1c1f2a; line-height:1px; font-size:1px;">&nbsp;</div></td></tr>

        <!-- Success icon + heading -->
        <tr>
          <td align="center" style="padding:32px 32px 8px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="width:64px; height:64px; background-color:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.4); border-radius:999px; font-size:30px; line-height:64px;">
                  ✅
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0 0; color:#ffffff; font-size:21px; font-weight:bold; line-height:1.6;">
              پرداخت شما با موفقیت انجام شد
            </p>
            <p style="margin:10px 0 0 0; color:#9ca3af; font-size:14px; line-height:1.9;">
              سفارش شماره <span style="color:#e5e7eb; font-weight:bold;">#{{order_id}}</span> ثبت شد و در حال آماده‌سازیه. جزئیات سفارش پایین آورده شده.
            </p>
          </td>
        </tr>

        <!-- Order summary card -->
        <tr>
          <td style="padding:28px 32px 8px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d1017; border:1px solid #1c1f2a; border-radius:14px;">
              <tr>
                <td style="padding:18px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:56px; padding-left:14px;">
                        <img src="{{product_thumbnail}}" width="56" height="56" alt="" style="display:block; border-radius:10px; border:1px solid #1c1f2a;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <p style="margin:0; color:#ffffff; font-size:14px; font-weight:bold;">{{product_title}}</p>
                        <p style="margin:4px 0 0 0; color:#6b7280; font-size:12px;">{{platform}} · تعداد: {{quantity}}</p>
                      </td>
                      <td style="vertical-align:middle; text-align:left; white-space:nowrap;">
                        <span style="color:#c4b5fd; font-size:13px; font-weight:bold;">{{item_price}} تومان</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr><td style="padding:0 20px;"><div style="height:1px; background-color:#1c1f2a; line-height:1px; font-size:1px;">&nbsp;</div></td></tr>
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color:#9ca3af; font-size:13px;">مبلغ کل پرداختی</td>
                      <td style="text-align:left; color:#ffffff; font-size:16px; font-weight:bold;">{{order_total}} تومان</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding:24px 32px 8px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:#7c3aed; background-image:linear-gradient(135deg, #7c3aed, #d946ef); border-radius:12px;">
                  <a href="{{order_url}}" style="display:inline-block; padding:14px 36px; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none;">مشاهده جزئیات سفارش</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:16px 32px 0 32px;">
            <p style="margin:0; color:#6b7280; font-size:12px; line-height:1.8;">
              به محض آماده شدن سفارش، یه ایمیل جداگونه با اطلاعات تحویل برات می‌فرستیم.
            </p>
          </td>
        </tr>

        <tr><td style="padding:28px 32px 0 32px;"><div style="height:1px; background-color:#1c1f2a; line-height:1px; font-size:1px;">&nbsp;</div></td></tr>

        <tr>
          <td style="padding:24px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="width:33%; color:#9ca3af; font-size:11px; padding:0 4px;">🛡️<br /><span style="color:#e5e7eb; font-weight:bold; font-size:11px;">ضمانت اصالت</span></td>
                <td align="center" style="width:33%; color:#9ca3af; font-size:11px; padding:0 4px;">⚡<br /><span style="color:#e5e7eb; font-weight:bold; font-size:11px;">تحویل فوری</span></td>
                <td align="center" style="width:33%; color:#9ca3af; font-size:11px; padding:0 4px;">🎧<br /><span style="color:#e5e7eb; font-weight:bold; font-size:11px;">پشتیبانی ۲۴/۷</span></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:24px 32px 36px 32px; background-color:#080a10;">
            <img src="https://gamint.ir/gamint-favicon.png" width="24" alt="" style="display:block; border:0; margin:0 auto 12px auto; border-radius:6px;" />
            <p style="margin:0; color:#6b7280; font-size:11px; line-height:1.8;">
              فروشگاه تخصصی بازی، اکانت ظرفیتی، گیفت‌کارت و اشتراک پلی‌استیشن
            </p>
            <p style="margin:10px 0 0 0; color:#4b5563; font-size:11px;">
              <a href="https://gamint.ir" style="color:#8b5cf6; text-decoration:none;">gamint.ir</a>
              &nbsp;·&nbsp;
              <a href="https://gamint.ir/contact" style="color:#8b5cf6; text-decoration:none;">پشتیبانی</a>
              &nbsp;·&nbsp;
              <a href="https://gamint.ir/terms" style="color:#8b5cf6; text-decoration:none;">قوانین</a>
            </p>
            <p style="margin:14px 0 0 0; color:#374151; font-size:10px;">© {{year}} گیمینت — تمامی حقوق محفوظ است.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`
