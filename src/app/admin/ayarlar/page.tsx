'use client'

import { useEffect, useState } from 'react'
import { Save, CheckCircle, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import Shortcodes from '@/components/admin/Shortcodes'
import { revalidateSite } from '@/components/admin/revalidate'
import { settingDefaults, settingGroups, type SettingField } from '@/lib/settings-schema'

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [initial, setInitial] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    createClient().from('site_settings').select('key, value').then(({ data }) => {
      const obj: Record<string, string> = { ...settingDefaults }
      data?.forEach((s) => { obj[s.key] = s.value ?? '' })
      setSettings(obj); setInitial(obj); setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const changed = Object.entries(settings)
      .filter(([k, v]) => v !== initial[k])
      .map(([key, value]) => ({ key, value }))
    // İlk kayıtta tüm varsayılanları da yaz ki veritabanı eksiksiz olsun.
    const rows = changed.length ? changed : Object.entries(settings).map(([key, value]) => ({ key, value }))
    const { error } = await createClient().from('site_settings').upsert(rows, { onConflict: 'key' })
    setSaving(false)
    if (error) { alert('Kaydedilemedi: ' + error.message); return }
    setInitial(settings)
    await revalidateSite()
    setSaved(true); setTimeout(() => setSaved(false), 3000)
  }

  const u = (key: string, val: string) => setSettings(prev => ({ ...prev, [key]: val }))

  const renderField = (f: SettingField) => {
    const val = settings[f.key] ?? ''
    switch (f.type) {
      case 'textarea': return <textarea className="admin-input" rows={3} value={val} onChange={(e) => u(f.key, e.target.value)} />
      case 'image': return <ImageUpload value={val} onChange={(url) => u(f.key, url)} />
      case 'number': return <input type="number" className="admin-input" value={val} onChange={(e) => u(f.key, e.target.value)} />
      case 'checkbox': return <div className="flex items-center gap-2 pt-1"><input type="checkbox" id={f.key} className="w-4 h-4" checked={val === 'true'} onChange={(e) => u(f.key, e.target.checked ? 'true' : 'false')} /><label htmlFor={f.key} className="text-sm font-semibold">{f.label}</label></div>
      case 'color': return <div className="flex items-center gap-2"><input type="color" value={val || '#ffffff'} onChange={(e) => u(f.key, e.target.value)} className="h-10 w-14 rounded border" /><input className="admin-input" value={val} onChange={(e) => u(f.key, e.target.value)} /></div>
      default: return <input className="admin-input" value={val} onChange={(e) => u(f.key, e.target.value)} />
    }
  }

  const q = query.trim().toLocaleLowerCase('tr-TR')
  const match = (f: SettingField) =>
    [f.label, f.hint, f.key, settings[f.key]].some((v) => (v ?? '').toLocaleLowerCase('tr-TR').includes(q))
  const groups = q
    ? settingGroups
        .map((g) => ({ ...g, fields: g.title.toLocaleLowerCase('tr-TR').includes(q) ? g.fields : g.fields.filter(match) }))
        .filter((g) => g.fields.length > 0)
    : settingGroups

  if (loading) return <p className="text-gray-400 p-4">Yükleniyor...</p>

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sticky top-0 md:top-0 z-10 bg-[#f1f5f9] py-2">
        <h1 className="text-2xl font-bold text-slate-800">Site Ayarları</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="flex items-center gap-1 text-green-600 text-sm font-semibold"><CheckCircle size={16} /> Kaydedildi!</span>}
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}</button>
        </div>
      </div>

      <div className="admin-card mb-4 flex items-center gap-2">
        <Search size={18} className="text-gray-400" />
        <input
          className="admin-input"
          placeholder="Ayar ara: sitede gördüğünüz yazıyı ya da ayar adını yazın (ör. Sepete ekle, logo, kargo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!q && <Shortcodes />}

      {groups.length === 0 && <p className="text-gray-400 p-4">&quot;{query}&quot; ile eşleşen ayar yok.</p>}

      {groups.map((g) => (
        <div key={g.title} className="admin-card mb-4">
          <h2 className="font-bold text-base text-slate-700 mb-1">{g.title}</h2>
          {g.description && <p className="text-xs text-gray-500 mb-3">{g.description}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {g.fields.map((f) => (
              <div key={f.key} className={f.wide || f.type === 'textarea' ? 'md:col-span-2' : ''}>
                {f.type !== 'checkbox' && <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>}
                {renderField(f)}
                {f.hint && <p className="text-xs text-gray-400 mt-1">{f.hint}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
