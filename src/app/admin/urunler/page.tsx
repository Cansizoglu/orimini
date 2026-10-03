'use client'

import { useEffect, useState } from 'react'
import AdminCrudPage from '@/components/admin/AdminCrudPage'
import { createClient } from '@/lib/supabase/client'

type Opt = { value: string; label: string }

const fmt = (n: unknown) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(Number(n) || 0)

export default function AdminUrunlerPage() {
  const [categories, setCategories] = useState<Opt[] | null>(null)
  const [sizes, setSizes] = useState<Opt[]>([])

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('categories').select('slug, name').order('sort_order'),
      supabase.from('sizes').select('slug, label').order('sort_order'),
    ]).then(([c, s]) => {
      setCategories((c.data || []).map((r) => ({ value: r.slug, label: r.name })))
      setSizes((s.data || []).map((r) => ({ value: r.slug, label: r.label })))
    })
  }, [])

  if (!categories) return <p className="text-gray-400">Yükleniyor...</p>
  const catName = (slug: string) => categories.find((c) => c.value === slug)?.label ?? slug ?? '-'

  return (
    <AdminCrudPage
      table="products"
      title="Ürünler"
      description="Fiyat, görseller, bedenler, açıklama ve SEO bilgileri. Kapak görseli galerideki ilk görseldir."
      newLabel="Yeni Ürün"
      slugSource="name"
      viewUrl={(item) => (item.slug ? `/urun/${item.slug}` : null)}
      columns={[
        { key: 'images', label: 'Görsel', render: (item) => item.images?.[0]?.src ? <img src={item.images[0].src} alt="" className="w-14 h-14 object-cover rounded" /> : '-' }, // eslint-disable-line @next/next/no-img-element
        { key: 'name', label: 'Ürün', render: (item) => <div><div className="font-semibold">{item.name}</div><div className="text-xs text-gray-400">{item.code}</div></div> },
        { key: 'category_slug', label: 'Kategori', render: (item) => catName(item.category_slug) },
        { key: 'price', label: 'Fiyat', render: (item) => <div>{item.old_price ? <del className="text-xs text-gray-400 mr-1">{fmt(item.old_price)}</del> : null}<span className="font-semibold">{fmt(item.price)}</span></div> },
        { key: 'is_featured', label: 'Öne çıkan', render: (item) => (item.is_featured ? '⭐' : '') },
      ]}
      fields={[
        { key: 'name', label: 'Ürün adı', type: 'text', required: true, section: 'Temel bilgiler' },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, placeholder: 'kirmizi-sirk-temali-kisa-salopet-takim', section: 'Temel bilgiler' },
        { key: 'code', label: 'Ürün kodu', type: 'text', placeholder: 'ORM-1001', section: 'Temel bilgiler' },
        { key: 'category_slug', label: 'Kategori', type: 'select', options: categories, required: true, section: 'Temel bilgiler' },
        { key: 'price', label: 'Fiyat (TL)', type: 'number', required: true, section: 'Temel bilgiler' },
        { key: 'old_price', label: 'Eski fiyat (indirim için, boş bırakılabilir)', type: 'number', section: 'Temel bilgiler' },
        { key: 'color', label: 'Renk', type: 'text', placeholder: 'Kırmızı / Beyaz', section: 'Temel bilgiler' },
        { key: 'badges', label: 'Rozetler (her satıra bir tane, ör. Kişiye Özel, Çok Satan, İndirim)', type: 'lines', section: 'Temel bilgiler' },
        { key: 'is_featured', label: 'Anasayfada öne çıkar', type: 'checkbox', section: 'Temel bilgiler' },
        { key: 'is_active', label: 'Sitede yayında', type: 'checkbox', section: 'Temel bilgiler' },
        { key: 'sort_order', label: 'Sıra', type: 'number', section: 'Temel bilgiler' },

        { key: 'images', label: 'Ürün görselleri', type: 'gallery', section: 'Görseller' },

        { key: 'sizes', label: 'Mevcut yaş / bedenler', type: 'multicheck', options: sizes, section: 'Beden' },

        { key: 'short_description', label: 'Kısa açıklama (fiyatın altında görünür)', type: 'textarea', section: 'Açıklamalar' },
        { key: 'description', label: 'Ürün açıklaması', type: 'html', section: 'Açıklamalar' },
        { key: 'set_contents', label: 'Set içeriği (her satıra bir parça)', type: 'lines', section: 'Açıklamalar' },
        { key: 'fabric', label: 'Kumaş', type: 'text', wide: true, section: 'Açıklamalar' },
        { key: 'care', label: 'Bakım talimatları (her satıra bir madde)', type: 'lines', section: 'Açıklamalar' },

        { key: 'personalization_enabled', label: 'Nakış (isim/tarih) alanı gösterilsin', type: 'checkbox', section: 'Kişiye özel nakış' },
        { key: 'personalization_label', label: 'Alan başlığı (boşsa site ayarlarındaki varsayılan)', type: 'text', section: 'Kişiye özel nakış' },
        { key: 'personalization_placeholder', label: 'Örnek yazı (boşsa varsayılan)', type: 'text', section: 'Kişiye özel nakış' },
        { key: 'personalization_note', label: 'Alt not (boşsa varsayılan)', type: 'textarea', section: 'Kişiye özel nakış' },

        { key: 'seo_title', label: '🔍 Meta başlık (~60 karakter)', type: 'text', wide: true, section: 'SEO' },
        { key: 'seo_description', label: '🔍 Meta açıklama (~155 karakter)', type: 'textarea', section: 'SEO' },
      ]}
      defaultValues={{
        name: '', slug: '', code: '', category_slug: categories[0]?.value ?? '', price: 0, old_price: null, color: '',
        badges: [], is_featured: false, is_active: true, sort_order: 0, images: [], sizes: [],
        short_description: '', description: '', set_contents: [], fabric: '', care: [],
        personalization_enabled: true, personalization_label: '', personalization_placeholder: '', personalization_note: '',
        seo_title: '', seo_description: '',
      }}
    />
  )
}
