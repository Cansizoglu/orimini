'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Plus, Pencil, Trash2, Save, X, Search, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import ImageGallery from '@/components/admin/ImageGallery'
import RichEditor from '@/components/admin/RichEditor'
import { revalidateSite, slugify } from '@/components/admin/revalidate'

interface ContentItem { id: string; [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any

type Option = string | { value: string; label: string }

export interface Field {
  key: string; label: string
  type: 'text' | 'textarea' | 'html' | 'number' | 'checkbox' | 'image' | 'select' | 'lines' | 'color' | 'date' | 'gallery' | 'multicheck'
  options?: Option[]; required?: boolean; placeholder?: string; hint?: string
  wide?: boolean
  section?: string
}

export interface Column {
  key: string; label: string
  render?: (item: ContentItem) => React.ReactNode
}

interface Props {
  table: string; title: string; description?: string; fields: Field[]
  defaultValues: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  orderBy?: string; orderAsc?: boolean; nameKey?: string
  slugSource?: string
  columns?: Column[]
  filter?: { key: string; value: string }
  viewUrl?: (item: ContentItem) => string | null
  canDelete?: (item: ContentItem) => boolean
  newLabel?: string
  allowCreate?: boolean
}

const optValue = (o: Option) => (typeof o === 'string' ? o : o.value)
const optLabel = (o: Option) => (typeof o === 'string' ? o : o.label)

export default function AdminCrudPage({
  table, title, description, fields, defaultValues, orderBy = 'sort_order', orderAsc = true, nameKey,
  slugSource, columns, filter, viewUrl, canDelete, newLabel = 'Yeni Ekle', allowCreate = true,
}: Props) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [editing, setEditing] = useState<Record<string, any> | null>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [query, setQuery] = useState('')

  const filterKey = filter?.key
  const filterValue = filter?.value
  const load = useCallback(async () => {
    const supabase = createClient()
    let q = supabase.from(table).select('*')
    if (filterKey && filterValue !== undefined) q = q.eq(filterKey, filterValue)
    const { data, error } = await q.order(orderBy, { ascending: orderAsc })
    if (error) alert('Liste yüklenemedi: ' + error.message)
    setItems(data || []); setLoading(false)
  }, [table, orderBy, orderAsc, filterKey, filterValue])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [load])

  const handleEdit = (item: ContentItem) => {
    setEditing(JSON.parse(JSON.stringify(item)))
    setSlugTouched(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleNew = () => {
    const nextOrder = items.reduce((m, i) => Math.max(m, Number(i.sort_order) || 0), 0) + 1
    setEditing({ ...defaultValues, ...(filter ? { [filter.key]: filter.value } : {}), ...('sort_order' in defaultValues ? { sort_order: nextOrder } : {}) })
    setSlugTouched(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const updateField = (key: string, value: unknown) => setEditing((prev) => {
    if (!prev) return null
    const next = { ...prev, [key]: value }
    if (slugSource && key === slugSource && !slugTouched && !prev.id) next.slug = slugify(String(value))
    return next
  })

  const save = async () => {
    if (!editing || saving) return
    const missing = fields.filter((f) => f.required && !String(editing[f.key] ?? '').trim())
    if (missing.length) { alert('Zorunlu alanlar: ' + missing.map((f) => f.label).join(', ')); return }
    setSaving(true)
    const supabase = createClient()
    const payload: Record<string, unknown> = {}
    for (const f of fields) payload[f.key] = editing[f.key] ?? null
    if (filter) payload[filter.key] = filter.value

    try {
      const { error } = editing.id
        ? await supabase.from(table).update(payload).eq('id', editing.id)
        : await supabase.from(table).insert([payload])
      if (error) { alert('Hata: ' + error.message); setSaving(false); return }
      setEditing(null); await load()
      await revalidateSite()
    } catch { alert('Beklenmeyen hata') }
    setSaving(false)
  }

  const remove = async (item: ContentItem) => {
    if (!confirm(`"${item[dk] ?? 'Kayıt'}" silinsin mi? Bu işlem geri alınamaz.`)) return
    const { error } = await createClient().from(table).delete().eq('id', item.id)
    if (error) { alert('Silinemedi: ' + error.message); return }
    if (editing?.id === item.id) setEditing(null)
    await load()
    await revalidateSite()
  }

  const toggleActive = async (item: ContentItem) => {
    const key = 'is_active' in item ? 'is_active' : 'is_approved' in item ? 'is_approved' : null
    if (!key) return
    const { error } = await createClient().from(table).update({ [key]: !item[key] }).eq('id', item.id)
    if (error) { alert('Hata: ' + error.message); return }
    await load()
    await revalidateSite()
  }

  const renderField = (field: Field) => {
    if (!editing) return null
    const val = editing[field.key] ?? ''
    switch (field.type) {
      case 'textarea': return <textarea className="admin-input" rows={3} value={val} onChange={(e) => updateField(field.key, e.target.value)} placeholder={field.placeholder} />
      case 'lines': return <textarea className="admin-input" rows={4} value={Array.isArray(val) ? val.join('\n') : val} onChange={(e) => updateField(field.key, e.target.value.split('\n'))} onBlur={(e) => updateField(field.key, e.target.value.split('\n').map((l) => l.trim()).filter(Boolean))} placeholder={field.placeholder || 'Her satıra bir madde'} />
      case 'html': return <RichEditor value={val} onChange={(html) => updateField(field.key, html)} rows={10} placeholder={field.placeholder} />
      case 'number': return <input type="number" step="any" className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value === '' ? null : Number(e.target.value))} placeholder={field.placeholder} />
      case 'checkbox': return <div className="flex items-center gap-2 pt-2"><input type="checkbox" checked={val === true} onChange={(e) => updateField(field.key, e.target.checked)} id={`f-${field.key}`} className="w-4 h-4" /><label htmlFor={`f-${field.key}`} className="text-sm font-semibold">{field.label}</label></div>
      case 'image': return <ImageUpload value={val} onChange={(url) => updateField(field.key, url)} />
      case 'gallery': return <ImageGallery value={Array.isArray(val) ? val : []} onChange={(v) => updateField(field.key, v)} />
      case 'color': return <div className="flex items-center gap-2"><input type="color" value={val || '#ffffff'} onChange={(e) => updateField(field.key, e.target.value)} className="h-10 w-14 rounded border" /><input className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value)} placeholder="#F3DCD4" /></div>
      case 'date': return <input type="date" className="admin-input" value={String(val).slice(0, 10)} onChange={(e) => updateField(field.key, e.target.value)} />
      case 'select': return <select className="admin-input" value={val} onChange={(e) => updateField(field.key, e.target.value)}><option value="">Seçin</option>{field.options?.map(o => <option key={optValue(o)} value={optValue(o)}>{optLabel(o)}</option>)}</select>
      case 'multicheck': {
        const selected: string[] = Array.isArray(val) ? val : []
        const toggle = (v: string) => updateField(field.key, selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v])
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((o) => {
              const v = optValue(o)
              const on = selected.includes(v)
              return <button type="button" key={v} onClick={() => toggle(v)} className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${on ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>{optLabel(o)}</button>
            })}
            {field.options && field.options.length > 0 && (
              <button type="button" onClick={() => updateField(field.key, selected.length === field.options!.length ? [] : field.options!.map(optValue))} className="px-3 py-1.5 text-xs text-blue-600 hover:underline">{selected.length === field.options.length ? 'Hiçbiri' : 'Tümünü seç'}</button>
            )}
          </div>
        )
      }
      default: return <input className="admin-input" value={val} onChange={(e) => { if (field.key === 'slug') setSlugTouched(true); updateField(field.key, e.target.value) }} placeholder={field.placeholder} />
    }
  }

  const dk = nameKey || fields.find(f => f.key === 'name')?.key || fields.find(f => f.key === 'title')?.key || fields[0]?.key
  const statusKey = items[0] && ('is_active' in items[0] ? 'is_active' : 'is_approved' in items[0] ? 'is_approved' : null)

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR')
    if (!q) return items
    return items.filter((i) => Object.values(i).some((v) => typeof v === 'string' && v.toLocaleLowerCase('tr-TR').includes(q)))
  }, [items, query])

  // Alanları bölüm başlıklarına göre grupla
  const sections = useMemo(() => {
    const out: { title?: string; fields: Field[] }[] = []
    for (const f of fields) {
      const last = out[out.length - 1]
      if (!last || (f.section && f.section !== last.title)) out.push({ title: f.section, fields: [f] })
      else last.fields.push(f)
    }
    return out
  }, [fields])

  const defaultColumns: Column[] = [
    { key: dk, label: 'Başlık', render: (item) => <span className="font-semibold">{String(item[dk] ?? '-')}</span> },
    ...(fields.some((f) => f.key === 'slug') ? [{ key: 'slug', label: 'Slug', render: (item: ContentItem) => <span className="text-gray-400 text-xs font-mono">{item.slug || '-'}</span> }] : []),
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {allowCreate && <button onClick={handleNew} className="admin-btn admin-btn-primary"><Plus size={18} /> {newLabel}</button>}
      </div>
      {description && <p className="text-sm text-gray-500 mb-6">{description}</p>}
      {!description && <div className="mb-4" />}

      {editing && (
        <div className="admin-card mb-6 border-2 border-blue-200">
          <h2 className="font-bold text-lg mb-4 text-blue-700">{editing.id ? '✏️ Düzenle' : '➕ Yeni Ekle'}</h2>
          {sections.map((sec, si) => (
            <div key={si} className={sec.title ? 'bg-slate-50 rounded-lg p-4 mb-4' : 'mb-4'}>
              {sec.title && <h3 className="font-bold text-sm text-slate-600 mb-3">{sec.title}</h3>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.fields.map((field) => (
                  <div key={field.key} className={field.wide || ['html', 'textarea', 'lines', 'gallery', 'multicheck'].includes(field.type) ? 'md:col-span-2' : ''}>
                    {field.type !== 'checkbox' && <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label} {field.required && <span className="text-red-500">*</span>}</label>}
                    {renderField(field)}
                    {field.hint && <p className="text-xs text-gray-400 mt-1">{field.hint}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-3 border-t sticky bottom-0 bg-white">
            <button onClick={save} disabled={saving} className="admin-btn admin-btn-primary disabled:opacity-50"><Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            <button onClick={() => setEditing(null)} className="admin-btn admin-btn-secondary"><X size={16} /> İptal</button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        {items.length > 6 && (
          <div className="relative mb-4 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="admin-input" style={{ paddingLeft: 34 }} placeholder="Ara..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        )}
        {loading ? <p className="text-gray-400 py-4">Yükleniyor...</p> : visible.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Henüz kayıt yok.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>#</th>{(columns || defaultColumns).map((c) => <th key={c.key}>{c.label}</th>)}{statusKey && <th>Durum</th>}{'sort_order' in (items[0] || {}) && <th>Sıra</th>}<th>İşlem</th></tr></thead>
            <tbody>
              {visible.map((item, i) => (
                <tr key={item.id} className={editing?.id === item.id ? 'bg-blue-50' : ''}>
                  <td>{i + 1}</td>
                  {(columns || defaultColumns).map((c) => <td key={c.key}>{c.render ? c.render(item) : String(item[c.key] ?? '-')}</td>)}
                  {statusKey && (
                    <td>
                      <button onClick={() => toggleActive(item)} title="Durumu değiştir" className={`admin-badge ${item[statusKey] ? 'admin-badge-green' : statusKey === 'is_approved' ? 'admin-badge-yellow' : 'admin-badge-red'}`}>
                        {statusKey === 'is_approved' ? (item[statusKey] ? 'Onaylı' : 'Onay bekliyor') : item[statusKey] ? 'Aktif' : 'Pasif'}
                      </button>
                    </td>
                  )}
                  {'sort_order' in item && <td>{item.sort_order ?? '-'}</td>}
                  <td><div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="admin-btn admin-btn-secondary text-xs" title="Düzenle"><Pencil size={14} /></button>
                    {viewUrl?.(item) && <a href={viewUrl(item)!} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary text-xs" title="Sitede gör"><ExternalLink size={14} /></a>}
                    {(canDelete ? canDelete(item) : true) && <button onClick={() => remove(item)} className="admin-btn admin-btn-danger text-xs" title="Sil"><Trash2 size={14} /></button>}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
