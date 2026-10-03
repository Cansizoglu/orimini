'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminBannerlarPage() {
  return (
    <AdminCrudPage
      table="banners"
      title="Bannerlar / Kampanyalar"
      description="Aktif bannerlar anasayfada kart olarak görünür (yeri Anasayfa > Bannerlar bölümünden değiştirilir). Link olarak /urunler, /kategori/kiz-elbise ya da whatsapp yazabilirsiniz. Üst duyuru bandı Site Ayarları'ndadır."
      newLabel="Yeni Banner"
      columns={[
        { key: 'image_url', label: 'Görsel', render: (item) => item.image_url ? <img src={item.image_url} alt="" className="w-20 h-12 object-cover rounded" /> : <span className="inline-block w-20 h-12 rounded" style={{ background: item.bg_color }} /> }, // eslint-disable-line @next/next/no-img-element
        { key: 'title', label: 'Başlık', render: (item) => <span className="font-semibold">{item.title}</span> },
        { key: 'button_link', label: 'Link' },
      ]}
      fields={[
        { key: 'title', label: 'Başlık', type: 'text', required: true },
        { key: 'subtitle', label: 'Alt yazı', type: 'textarea' },
        { key: 'image_url', label: 'Görsel', type: 'image' },
        { key: 'bg_color', label: 'Arka plan rengi', type: 'color' },
        { key: 'button_text', label: 'Buton yazısı', type: 'text', placeholder: 'İncele' },
        { key: 'button_link', label: 'Buton linki', type: 'text', placeholder: '/kategori/kiz-elbise' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ title: '', subtitle: '', image_url: '', bg_color: '#F3DCD4', button_text: '', button_link: '', sort_order: 0, is_active: true }}
    />
  )
}
