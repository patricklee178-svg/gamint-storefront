type IconProps = { className?: string }

const base = "h-4 w-4"

export const TrashIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PlusIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)

export const MinusIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path d="M5 12h14" strokeLinecap="round" />
  </svg>
)

export const LockIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="9" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" strokeLinecap="round" />
  </svg>
)

export const TelegramIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="m3.5 12.4 16-7.4-3 15-5.3-4-3 3-.5-4.3-4.2-2.3Z" strokeLinejoin="round" />
    <path d="M19.5 5 8.2 14.7" strokeLinecap="round" />
  </svg>
)

export const WhatsappIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M6.5 17.5 4 20l2.6-.7A8 8 0 1 0 4.5 12 8 8 0 0 0 6.5 17.5Z" strokeLinejoin="round" />
    <path d="M9 10c0 3 2 5 5 5 .5 0 1-.3 1-1v-.7c0-.3-.2-.5-.5-.6l-1.4-.4c-.3 0-.5 0-.6.2l-.3.4c-1-.5-1.7-1.2-2.2-2.2l.4-.3c.2-.1.3-.4.2-.6l-.4-1.4c-.1-.3-.3-.5-.6-.5H9c-.6 0-1 .5-1 1Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const TicketIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v1.75a1.75 1.75 0 0 0 0 3.5v1.75A1.5 1.5 0 0 1 18.5 17h-13A1.5 1.5 0 0 1 4 15.5v-1.75a1.75 1.75 0 0 0 0-3.5V8.5Z" strokeLinejoin="round" />
  </svg>
)

export const CartOutlineIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" />
  </svg>
)

export const ReceiptIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2.5-1.5L3 21V6a3 3 0 0 1 3-3Z" strokeLinejoin="round" />
    <path d="M8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
  </svg>
)

export const BoltIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z" strokeLinejoin="round" />
  </svg>
)

export const RefundIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4 12a8 8 0 1 1 2.7 6" strokeLinecap="round" />
    <path d="M4 17v-4h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const HeadsetIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4 13v-1a8 8 0 1 1 16 0v1" strokeLinecap="round" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19v.5A2.5 2.5 0 0 1 16.5 22H13" strokeLinecap="round" />
  </svg>
)

export const ShieldCheckIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M12 3.5 19 6.5v5.2c0 4.7-3 7.8-7 8.8-4-1-7-4.1-7-8.8V6.5L12 3.5Z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CheckIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const TagIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M20 12.5 12.5 20a1.5 1.5 0 0 1-2.1 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.1L11.5 4H18a2 2 0 0 1 2 2v6.5Z" strokeLinejoin="round" />
    <circle cx="15" cy="8" r="1.3" />
  </svg>
)
