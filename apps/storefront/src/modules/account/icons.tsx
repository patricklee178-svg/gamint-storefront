type IconProps = { className?: string }

const base = "h-[18px] w-[18px]"

export const GridIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
)

export const PackageIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M21 8.5v7L12 21l-9-5.5v-7L12 3l9 5.5Z" strokeLinejoin="round" />
    <path d="M3 8.5 12 14l9-5.5M12 14v7" strokeLinejoin="round" />
  </svg>
)

export const GamepadIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M6.5 8h11a4 4 0 0 1 3.9 4.86l-.9 4A3 3 0 0 1 17.6 19c-.9 0-1.75-.44-2.27-1.18L14 16H10l-1.33 1.82A2.8 2.8 0 0 1 6.4 19a3 3 0 0 1-2.9-2.14l-.9-4A4 4 0 0 1 6.5 8Z" strokeLinejoin="round" />
    <path d="M8 11v3M6.5 12.5h3M16 11.5h.01M18.5 13h.01" strokeLinecap="round" />
  </svg>
)

export const ClockIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const GiftIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.5" y="9" width="17" height="4" rx="1" />
    <path d="M5.5 13v6.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V13M12 9v11.5" strokeLinejoin="round" />
    <path d="M12 9c-1.2-3.2-3.4-4.5-4.8-3.6C5.8 6.2 6.6 9 12 9Zm0 0c1.2-3.2 3.4-4.5 4.8-3.6C18.2 6.2 17.4 9 12 9Z" strokeLinejoin="round" />
  </svg>
)

export const HeartIcon = ({ className = base, filled = false }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M12 20s-7.5-4.6-9.7-9.4C.8 7 2.6 3.8 6 3.4c2-.2 3.7.8 6 3.1 2.3-2.3 4-3.3 6-3.1 3.4.4 5.2 3.6 3.7 7.2C19.5 15.4 12 20 12 20Z" strokeLinejoin="round" />
  </svg>
)

export const UserIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.2-3.7 4.2-5.5 7.5-5.5s6.3 1.8 7.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const MapPinIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const ShieldIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M12 3.5 19 6.5v5.2c0 4.7-3 7.8-7 8.8-4-1-7-4.1-7-8.8V6.5L12 3.5Z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const LogOutIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M9 21H5.5a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 5.5 3H9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17 21 12 16 7M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const WalletIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const TicketIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v1.75a1.75 1.75 0 0 0 0 3.5v1.75A1.5 1.5 0 0 1 18.5 17h-13A1.5 1.5 0 0 1 4 15.5v-1.75a1.75 1.75 0 0 0 0-3.5V8.5Z" strokeLinejoin="round" />
    <path d="M10 7v10" strokeDasharray="1.6 2" />
  </svg>
)

export const CheckCircleIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.2 2.3 2.3 4.7-4.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BoltIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5L13 3Z" strokeLinejoin="round" />
  </svg>
)

export const BadgeCheckIcon = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="m12 3 2.2 1.3 2.5-.3 1 2.3 2.3 1-.3 2.5L21 12l-1.3 2.2.3 2.5-2.3 1-1 2.3-2.5-.3L12 21l-2.2-1.3-2.5.3-1-2.3-2.3-1 .3-2.5L3 12l1.3-2.2-.3-2.5 2.3-1 1-2.3 2.5.3L12 3Z" strokeLinejoin="round" />
    <path d="m8.5 12.2 2.3 2.3 4.7-4.9" strokeLinecap="round" strokeLinejoin="round" />
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
