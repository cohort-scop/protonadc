type InfoModalItem = {
  label: string
  color: string
  desc: string
}

type InfoModalProps = {
  title: string
  items: InfoModalItem[]
  onClose: () => void
}

export default function InfoModal({ title, items, onClose }: InfoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-5">{title}</h2>
        <dl className="space-y-4">
          {items.map(({ label, color, desc }) => (
            <div key={label}>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${color}`}>{label}</p>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </dl>
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg py-2 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
