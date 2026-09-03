import { Disclosure } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "مشکلی پیش اومد، دوباره امتحان کن.",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5"
      data-testid={dataTestid}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/40">{label}</span>
          {typeof currentInfo === "string" ? (
            <span className="text-sm font-bold text-white" data-testid="current-info">
              {currentInfo}
            </span>
          ) : (
            currentInfo
          )}
        </div>
        <button
          type={state ? "reset" : "button"}
          onClick={handleToggle}
          data-testid="edit-button"
          data-active={state}
          className="shrink-0 rounded-xl border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:border-purple-400/40 hover:text-white"
        >
          {state ? "انصراف" : "ویرایش"}
        </button>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
            {label} با موفقیت به‌روزرسانی شد.
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300">
            {errorMessage}
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-3 pt-4">
            <div>{children}</div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={pending}
                data-testid="save-button"
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
              >
                {pending ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
