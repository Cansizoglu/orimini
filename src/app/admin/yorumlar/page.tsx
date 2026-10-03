'use client'

import { useEffect, useState } from 'react'
import AdminCrudPage from '@/components/admin/AdminCrudPage'
import { createClient } from '@/lib/supabase/client'

export default function AdminYorumlarPage() {
  const [products, setProducts] = useState<{ value: string; label: string }[] | null>(null)

  useEffect(() => {
    createClient().from('products').select('slug, name').order('sort_order').then(({ data }) => {
      setProducts((data || []).map((p) => ({ value: p.slug, label: p.name })))
    })
  }, [])

  if (!products) return <p className="text-gray-400">Yükleniyor...</p>
  const name = (slug: string) => products.find((p) => p.value === slug)?.label ?? slug

  return (
    <AdminCrudPage
      table="reviews"
      title="Ürün Yorumları"
      description="Siteden gönderilen yorumlar 'Onay bekliyor' olarak düşer. Durum rozetine tıklayarak onaylayın; sadece onaylı yorumlar sitede görünür. Yalnızca gerçek müşteri yorumlarını yayınlayın."
      newLabel="Yorum Ekle"
      orderBy="created_at"
      orderAsc={false}
      nameKey="author"
      columns={[
        { key: 'author', label: 'Yazan', render: (item) => <div><div className="font-semibold">{item.author}</div><div className="text-xs text-gray-400">{item.city}</div></div> },
        { key: 'product_slug', label: 'Ürün', render: (item) => <span className="text-sm">{name(item.product_slug)}</span> },
        { key: 'rating', label: 'Puan', render: (item) => <span className="text-yellow-500">{'★'.repeat(item.rating)}<span className="text-gray-300">{'★'.repeat(5 - item.rating)}</span></span> },
        { key: 'comment', label: 'Yorum', render: (item) => <span className="text-sm text-gray-600 line-clamp-2 max-w-md block">{item.comment}</span> },
      ]}
      fields={[
        { key: 'product_slug', label: 'Ürün', type: 'select', options: products, required: true },
        { key: 'author', label: 'Ad', type: 'text', required: true },
        { key: 'city', label: 'Şehir', type: 'text' },
        { key: 'rating', label: 'Puan (1-5)', type: 'select', options: ['5', '4', '3', '2', '1'] },
        { key: 'review_date', label: 'Tarih', type: 'date' },
        { key: 'comment', label: 'Yorum', type: 'textarea', required: true },
        { key: 'is_approved', label: 'Onaylı (sitede görünsün)', type: 'checkbox' },
      ]}
      defaultValues={{ product_slug: products[0]?.value ?? '', author: '', city: '', rating: '5', review_date: new Date().toISOString().slice(0, 10), comment: '', is_approved: true }}
    />
  )
}
