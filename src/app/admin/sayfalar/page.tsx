'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'
import Shortcodes from '@/components/admin/Shortcodes'

export default function AdminSayfalarPage() {
  return (
    <div>
      <AdminCrudPage
        table="pages"
        title="Sayfalar & Sözleşmeler"
        description="Hakkımızda, İletişim, Kargo ve İade, Beden Rehberi, SSS ile sözleşme/KVKK metinleri ve sayfa SEO ayarları. Yeni eklenen sayfalar /sayfa/slug adresinde yayınlanır, menüye Menüler'den ekleyebilirsiniz."
        newLabel="Yeni Sayfa"
        slugSource="title"
        canDelete={(item) => !item.is_system}
        viewUrl={(item) => (item.slug === 'anasayfa' ? '/' : item.is_system ? `/${item.slug}` : `/sayfa/${item.slug}`)}
        columns={[
          { key: 'title', label: 'Sayfa', render: (item) => <div><span className="font-semibold">{item.title}</span>{item.is_system && <span className="ml-2 admin-badge admin-badge-blue" style={{ cursor: 'default' }}>Sistem</span>}</div> },
          { key: 'slug', label: 'Adres', render: (item) => <span className="text-gray-400 text-xs font-mono">{item.slug === 'anasayfa' ? '/' : item.is_system ? `/${item.slug}` : `/sayfa/${item.slug}`}</span> },
        ]}
        fields={[
          { key: 'title', label: 'Sayfa başlığı (H1)', type: 'text', required: true },
          { key: 'slug', label: 'Slug (URL)', type: 'text', required: true, hint: 'Sistem sayfalarının slug\'ını değiştirmeyin.' },
          { key: 'short_title', label: 'Kısa ad (sayfa yolunda görünür)', type: 'text', hint: 'Boşsa sayfa başlığı kullanılır.' },
          { key: 'eyebrow', label: 'Üst küçük yazı', type: 'text' },
          { key: 'is_active', label: 'Yayında', type: 'checkbox' },
          { key: 'lead', label: 'Giriş yazısı (başlığın altındaki büyük yazı)', type: 'textarea' },
          { key: 'content', label: 'Sayfa içeriği', type: 'html' },
          { key: 'image_url', label: 'Görsel', type: 'image', section: 'Görsel ve buton' },
          { key: 'image_alt', label: 'Görsel alt metni', type: 'text', section: 'Görsel ve buton' },
          { key: 'button_text', label: 'Buton yazısı', type: 'text', section: 'Görsel ve buton' },
          { key: 'button_link', label: 'Buton linki (whatsapp, /urunler...)', type: 'text', section: 'Görsel ve buton' },
          { key: 'seo_title', label: '🔍 Meta başlık', type: 'text', wide: true, section: 'SEO' },
          { key: 'seo_description', label: '🔍 Meta açıklama', type: 'textarea', section: 'SEO' },
          { key: 'sort_order', label: 'Sıra', type: 'number', section: 'SEO' },
        ]}
        defaultValues={{ title: '', short_title: '', slug: '', eyebrow: '', lead: '', content: '', image_url: '', image_alt: '', button_text: '', button_link: '', seo_title: '', seo_description: '', sort_order: 0, is_active: true }}
      />
      <div className="mt-6"><Shortcodes /></div>
    </div>
  )
}
