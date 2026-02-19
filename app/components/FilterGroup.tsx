type FilterGroupProps = {
  label: string
  items: { value: string; count: number }[]
  selected: string[]
  colors: Record<string, { bg: string; border: string; text: string }>
  onToggle: (value: string) => void
  onInfo?: () => void
  onClear?: () => void
  compact?: boolean
}

export default function FilterGroup({
  label,
  items,
  selected,
  colors,
  onToggle,
  onInfo,
  onClear,
  compact = false,
}: FilterGroupProps) {
  const defaultColor = { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-700' }

  const header = (
    <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
      <div className="flex items-center gap-1.5">
        <h3 className={`font-semibold uppercase tracking-wider text-gray-900 ${compact ? 'text-xs' : 'text-xs'}`}>
          {label}
        </h3>
        {onInfo && (
          <button onClick={onInfo} className="text-gray-900 cursor-pointer">
            <svg className={compact ? 'w-4 h-4' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      {onClear && selected.length > 0 && (
        <button onClick={onClear} className="text-xs text-gray-400 hover:text-gray-600 underline">
          Effacer
        </button>
      )}
    </div>
  )

  const itemList = (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
      {items.map(({ value, count }) => {
        const c = colors[value] ?? defaultColor
        const isActive = selected.includes(value)

        if (compact) {
          return (
            <button
              key={value}
              onClick={() => onToggle(value)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                isActive ? `${c.bg} ${c.border} ${c.text}` : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <span className={`font-bold ${isActive ? c.text : 'text-gray-400'}`}>{count}</span>
              <span>{value}</span>
            </button>
          )
        }

        return (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`h-12 px-4 rounded-lg border-2 transition-all hover:shadow-md flex items-center gap-2 min-w-0 ${
              isActive ? `${c.bg} ${c.border}` : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className={`text-lg font-bold shrink-0 ${isActive ? c.text : 'text-gray-900'}`}>{count}</span>
            <span className="text-gray-300 shrink-0">·</span>
            <span className={`text-xs font-medium leading-tight text-left truncate ${isActive ? c.text : 'text-gray-600'}`} title={value}>
              {value}
            </span>
          </button>
        )
      })}
    </div>
  )

  if (compact) {
    return (
      <div>
        {header}
        {itemList}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      {header}
      {itemList}
    </div>
  )
}
