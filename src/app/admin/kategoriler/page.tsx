'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminKategorilerPage() {
  return (
    <AdminCrudPage
      table="categories"
      title="Kategoriler"
      description="Kategori sayfaları, anasayfadaki kategori kartları ve footer'daki kategori linkleri buradan gelir. Slug değişirse ürünler otomatik taşınır; üst menü linkini Menüler'den güncelleyin."
      newLabel="Yeni Kategori"
      slugSource="name"
      viewUrl={(item) => (item.slug ? `/kategori/${item.slug}` : null)}
      columns={[
        { key: 'image_url', label: 'Görsel', render: (item) => item.image_url ? <img src={item.image_url} alt="" className="w-14 h-14 object-cover rounded" /> : '-' }, // eslint-disable-line @next/next/no-img-element
        { key: 'name', label: 'Kategori', render: (item) => <span className="font-semibold">{item.name}</span> },
        { key: 'slug', label: 'Slug', render: (item) => <span className="text-gray-400 text-xs font-mono">{item.slug}</span> },
      ]}
      fields={[
        { key: 'name', label: 'Kategori adı', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true },
        { key: 'short_name', label: 'Kısa ad (ürün kartlarında)', type: 'text' },
        { key: 'tint', label: 'Kart arka plan rengi', type: 'color' },
        { key: 'description', label: 'Açıklama (kategori sayfasının üstünde)', type: 'textarea' },
        { key: 'image_url', label: 'Kategori görseli', type: 'image' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
        { key: 'seo_title', label: '🔍 Meta başlık', type: 'text', wide: true, section: 'SEO' },
        { key: 'seo_description', label: '🔍 Meta açıklama', type: 'textarea', section: 'SEO' },
      ]}
      defaultValues={{ name: '', slug: '', short_name: '', tint: '#F3DCD4', description: '', image_url: '', sort_order: 0, is_active: true, seo_title: '', seo_description: '' }}
    />
  )
}
