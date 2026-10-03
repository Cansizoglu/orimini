'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: err } = await createClient().auth.signInWithPassword({ email, password })
    if (err) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-block bg-[#efe6d8] text-[#5a3825] font-extrabold text-2xl px-4 py-2 rounded-xl mb-3">OM</div>
          <h1 className="text-white text-xl font-bold">Orimini Yönetim Paneli</h1>
          <p className="text-slate-400 text-sm mt-1">Site içeriklerini buradan yönetin</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-2xl">
          {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
              <input type="email" className="admin-input" placeholder="ornek@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Şifre</label>
              <input type="password" className="admin-input" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className="admin-btn admin-btn-primary w-full justify-center py-3 disabled:opacity-50">
              <LogIn size={18} /> {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
