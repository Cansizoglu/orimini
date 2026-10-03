import { shortcodes } from '@/lib/site'

// Metinlerde kullanılabilecek kısa kodların listesi.
export default function Shortcodes() {
  return (
    <details className="admin-card mb-6 text-sm">
      <summary className="font-semibold text-slate-700 cursor-pointer">Kısa kodlar: metne yazınca sitede gerçek değere dönüşür</summary>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        {shortcodes.map((s) => (
          <div key={s.code}><code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700">{s.code}</code> <span className="text-gray-500">{s.label}</span></div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">Buton linklerine <code>whatsapp</code> yazarsanız WhatsApp&apos;a gider; <code>whatsapp:Merhaba...</code> şeklinde hazır mesaj da verebilirsiniz.</p>
    </details>
  )
}
