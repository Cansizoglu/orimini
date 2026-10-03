'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'
import Shortcodes from '@/components/admin/Shortcodes'

export default function AdminAnasayfaPage() {
  return (
    <div>
      <AdminCrudPage
        table="home_sections"
        title="Anasayfa Bölümleri"
        description="Anasayfadaki her bölümün yazıları, görselleri ve butonları. Sıra numarasıyla bölümlerin yerini değiştirebilir, durum rozetine tıklayarak gizleyebilirsiniz."
        allowCreate={false}
        canDelete={() => false}
        nameKey="admin_label"
        viewUrl={() => '/'}
        columns={[
          { key: 'admin_label', label: 'Bölüm', render: (item) => <span className="font-semibold">{item.admin_label || item.section_key}</span> },
          { key: 'title', label: 'Başlık', render: (item) => <span className="text-sm text-gray-500">{item.title || '-'}</span> },
        ]}
        fields={[
          { key: 'eyebrow', label: 'Üst küçük yazı', type: 'text' },
          { key: 'title', label: 'Başlık', type: 'text' },
          { key: 'content', label: 'Açıklama yazısı', type: 'textarea' },
          { key: 'items', label: 'Maddeler (her satıra bir madde)', type: 'textarea', hint: 'Hero: kısa maddeler. Güven bandı: ikon | başlık | açıklama (ikonlar: nakis, kalp, kargo, kalkan, whatsapp, cetvel). Adımlar: başlık | açıklama. Kişiye özel: tik listesi.' },
          { key: 'image_url', label: 'Görsel', type: 'image', section: 'Görsel' },
          { key: 'image_alt', label: 'Görsel alt metni (SEO)', type: 'text', section: 'Görsel' },
          { key: 'button_text', label: 'Buton yazısı', type: 'text', section: 'Butonlar' },
          { key: 'button_link', label: 'Buton linki', type: 'text', section: 'Butonlar', placeholder: '/urunler veya whatsapp' },
          { key: 'button2_text', label: '2. buton yazısı (sadece hero)', type: 'text', section: 'Butonlar' },
          { key: 'button2_link', label: '2. buton linki', type: 'text', section: 'Butonlar' },
          { key: 'sort_order', label: 'Sıra', type: 'number', section: 'Butonlar' },
          { key: 'is_active', label: 'Görünsün', type: 'checkbox', section: 'Butonlar' },
        ]}
        defaultValues={{}}
      />
      <div className="mt-6"><Shortcodes /></div>
    </div>
  )
}
