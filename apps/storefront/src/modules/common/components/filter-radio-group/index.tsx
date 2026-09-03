type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-xs font-bold text-white/70">{title}</p>
      <div className="flex flex-col gap-y-2" data-testid={dataTestId}>
        {items?.map((i) => {
          const active = i.value === value
          return (
            <label
              key={i.value}
              htmlFor={i.value}
              className="flex cursor-pointer items-center gap-x-2.5"
            >
              <input
                type="radio"
                checked={active}
                onChange={() => handleChange(i.value)}
                className="peer hidden"
                id={i.value}
                value={i.value}
              />
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition ${
                  active ? "border-purple-400" : "border-white/25"
                }`}
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />}
              </span>
              <span
                className={`text-xs transition ${
                  active ? "font-bold text-white" : "text-white/50"
                }`}
                data-testid="radio-label"
                data-active={active}
              >
                {i.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default FilterRadioGroup
