'use client'
import AdminCrudPage, { type Column, type Field } from '@/components/admin/AdminCrudPage'

const fields: Field[] = [
  { key: 'label', label: 'Görünen yazı', type: 'text', required: true },
  { key: 'href', label: 'Link', type: 'text', required: true, placeholder: '/kategori/kiz-elbise', hint: 'Site içi linkler / ile başlar. Yeni sayfalar /sayfa/sayfa-adi adresindedir.' },
  { key: 'sort_order', label: 'Sıra', type: 'number' },
  { key: 'is_active', label: 'Aktif', type: 'checkbox' },
]

const columns: Column[] = [
  { key: 'label', label: 'Yazı', render: (item) => <span className="font-semibold">{item.label}</span> },
  { key: 'href', label: 'Link', render: (item) => <span className="text-xs font-mono text-gray-500">{item.href}</span> },
]

const defaults = { label: '', href: '', sort_order: 0, is_active: true }

export default function AdminMenulerPage() {
  return (
    <div className="space-y-12">
      <AdminCrudPage
        table="menu_items"
        title="Üst Menü (Header)"
        description="Logonun altındaki ana menü linkleri."
        newLabel="Link Ekle"
        nameKey="label"
        filter={{ key: 'location', value: 'header' }}
        fields={fields}
        columns={columns}
        defaultValues={defaults}
      />
      <AdminCrudPage
        table="menu_items"
        title="Mobil Menü Ek Linkleri"
        description="Telefonda menü açılınca ana menünün altında görünen ek linkler."
        newLabel="Link Ekle"
        nameKey="label"
        filter={{ key: 'location', value: 'mobile' }}
        fields={fields}
        columns={columns}
        defaultValues={defaults}
      />
      <AdminCrudPage
        table="menu_items"
        title="Footer - Kurumsal Linkler"
        description="Footer'daki Kurumsal sütunu. Kategoriler sütunu otomatik olarak kategorilerden gelir; sütun başlıkları Site Ayarları > Site metinleri bölümündedir."
        newLabel="Link Ekle"
        nameKey="label"
        filter={{ key: 'location', value: 'footer' }}
        fields={fields}
        columns={columns}
        defaultValues={defaults}
      />
    </div>
  )
}
