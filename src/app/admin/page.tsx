'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ShoppingBag, FolderTree, Megaphone, FileText, HelpCircle, MessageSquare, Settings, Home, AlertTriangle, KeyRound } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [pwMessage, setPwMessage] = useState<string | null>(null)

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { setPwMessage('Şifre en az 8 karakter olmalı.'); return }
    const { error } = await createClient().auth.updateUser({ password })
    setPwMessage(error ? 'Şifre değiştirilemedi: ' + error.message : 'Şifreniz değiştirildi.')
    if (!error) setPassword('')
  }

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data: admin } = user ? await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle() : { data: null }
      setIsAdmin(Boolean(admin))
      const tables = ['products', 'categories', 'banners', 'pages', 'faqs', 'reviews']
      const results: Record<string, number> = {}
      await Promise.all(tables.map(async (t) => {
        const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
        results[t] = count || 0
      }))
      const { count: pending } = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('is_approved', false)
      results.pending_reviews = pending || 0
      setStats(results)
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Ürünler', count: stats.products, icon: ShoppingBag, href: '/admin/urunler', color: 'bg-purple-500' },
    { label: 'Kategoriler', count: stats.categories, icon: FolderTree, href: '/admin/kategoriler', color: 'bg-cyan-500' },
    { label: 'Bannerlar', count: stats.banners, icon: Megaphone, href: '/admin/bannerlar', color: 'bg-orange-500' },
    { label: 'Sayfalar', count: stats.pages, icon: FileText, href: '/admin/sayfalar', color: 'bg-emerald-500' },
    { label: 'SSS', count: stats.faqs, icon: HelpCircle, href: '/admin/sss', color: 'bg-blue-500' },
    { label: 'Ürün Yorumları', count: stats.reviews, icon: MessageSquare, href: '/admin/yorumlar', color: 'bg-yellow-500', badge: stats.pending_reviews },
  ]

  const quick = [
    { label: 'Logo, telefon, WhatsApp, footer', href: '/admin/ayarlar', icon: Settings },
    { label: 'Anasayfa yazıları ve görselleri', href: '/admin/anasayfa', icon: Home },
    { label: 'Hakkımızda, iletişim, sözleşmeler', href: '/admin/sayfalar', icon: FileText },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>
      {isAdmin === false && (
        <div className="admin-card mb-6 border-2 border-red-200 flex gap-3 items-start">
          <AlertTriangle className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700">Bu hesap admin listesinde değil; değişiklikler kaydedilmez. Hesabın <code>admin_users</code> tablosuna eklenmesi gerekiyor.</p>
        </div>
      )}
      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <a key={card.label} href={card.href} className="admin-card hover:shadow-md transition-all relative">
              <div className="flex items-center gap-4">
                <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <card.icon size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{card.count ?? '-'}</div>
                  <div className="text-sm text-slate-500">{card.label}</div>
                </div>
              </div>
              {card.badge ? (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{card.badge} onay bekliyor</span>
              ) : null}
            </a>
          ))}
        </div>
      )}
      <h2 className="font-bold text-slate-700 mb-3">Hızlı erişim</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quick.map((q) => (
          <a key={q.href} href={q.href} className="admin-card hover:shadow-md transition-all flex items-center gap-3 text-sm font-semibold text-slate-700">
            <q.icon size={18} className="text-blue-600" /> {q.label}
          </a>
        ))}
      </div>

      <form onSubmit={changePassword} className="admin-card mt-8 max-w-md">
        <h2 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><KeyRound size={18} /> Şifre değiştir</h2>
        <input type="password" className="admin-input" placeholder="Yeni şifre (en az 8 karakter)" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {pwMessage && <p className="text-sm mt-2 text-slate-600">{pwMessage}</p>}
        <button type="submit" className="admin-btn admin-btn-primary mt-3">Şifreyi kaydet</button>
      </form>
    </div>
  )
}
