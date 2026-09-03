import { ChevronUpDown } from "@medusajs/icons"
import {
  SelectHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "انتخاب کن...", defaultValue, className: _className, children, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    return (
      <div className="relative flex h-11 w-full items-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white transition focus-within:border-purple-400/50 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-purple-500/10">
        <select
          ref={innerRef}
          defaultValue={defaultValue}
          {...props}
          className="flex-1 appearance-none bg-transparent px-4 py-2.5 outline-none [&>option]:bg-[#0c1018] [&>option]:text-white"
        >
          <option disabled value="">
            {placeholder}
          </option>
          {children}
        </select>
        <span className="pointer-events-none absolute right-4 flex items-center text-white/40">
          <ChevronUpDown />
        </span>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
