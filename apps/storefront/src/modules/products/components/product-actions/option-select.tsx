import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-xs font-bold text-white/50">{title}</span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={`h-10 flex-1 rounded-xl border px-3 text-sm font-bold transition ${
                isSelected
                  ? "border-purple-400 bg-purple-600 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
              }`}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
