"use client"

import { useActionState, useEffect, useRef, useState, useTransition } from "react"

import { uploadAvatar, removeAvatar } from "@lib/data/customer"

type Props = {
  initial: string
  initialAvatarUrl?: string | null
  size?: number
}

const AvatarUpload = ({ initial, initialAvatarUrl, size = 56 }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [state, formAction, isUploading] = useActionState(uploadAvatar, null)
  const [isRemoving, startRemoveTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success && state.avatarUrl) {
      setAvatarUrl(state.avatarUrl)
      setPreview(null)
      setError(null)
    } else if (state?.success === false) {
      setError(state.error || "خطا در آپلود تصویر.")
      setPreview(null)
    }
  }, [state])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setError(null)
    formRef.current?.requestSubmit()
  }

  const handleRemove = () => {
    setAvatarUrl(null)
    setPreview(null)
    startRemoveTransition(async () => {
      await removeAvatar()
    })
  }

  const displayUrl = preview || avatarUrl

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <form ref={formRef} action={formAction}>
        <input
          ref={inputRef}
          type="file"
          name="avatar"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
      </form>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        title="تغییر عکس پروفایل"
        className="group relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-lg font-black text-white transition"
      >
        {displayUrl ? (
          <img src={displayUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}

        <span
          className={`absolute inset-0 grid place-items-center bg-black/50 text-[10px] font-bold opacity-0 transition group-hover:opacity-100 ${
            isUploading ? "opacity-100" : ""
          }`}
        >
          {isUploading ? "..." : "تغییر"}
        </span>
      </button>

      {displayUrl && !isUploading && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={isRemoving}
          title="حذف عکس پروفایل"
          className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-[#0a0d14] text-white/60 transition hover:text-rose-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {error && (
        <p className="absolute top-full mt-1 w-max max-w-[160px] text-[10px] text-rose-400">{error}</p>
      )}
    </div>
  )
}

export default AvatarUpload
