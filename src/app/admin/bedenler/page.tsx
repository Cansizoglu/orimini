'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminBedenlerPage() {
  return (
    <AdminCrudPage
      table="sizes"
      title="Bedenler"
      description="Ürün sayfasındaki beden seçenekleri ve Beden Rehberi tablosu. Slug ürünlerde kayıtlıdır; değiştirirseniz ürünlerde bedeni yeniden seçin."
      newLabel="Yeni Beden"
      slugSource="label"
      nameKey="label"
      columns={[
        { key: 'label', label: 'Beden', render: (item) => <span className="font-semibold">{item.label}</span> },
        { key: 'size_group', label: 'Grup', render: (item) => (item.size_group === 'cocuk' ? 'Çocuk' : 'Bebek') },
        { key: 'height', label: 'Boy' },
        { key: 'weight', label: 'Kilo' },
      ]}
      fields={[
        { key: 'label', label: 'Beden adı', type: 'text', required: true, placeholder: '0-3 Ay' },
        { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: '0-3-ay' },
        { key: 'size_group', label: 'Grup', type: 'select', options: [{ value: 'bebek', label: 'Bebek' }, { value: 'cocuk', label: 'Çocuk' }] },
        { key: 'height', label: 'Boy aralığı', type: 'text', placeholder: '56 - 62 cm' },
        { key: 'weight', label: 'Kilo aralığı', type: 'text', placeholder: '3 - 5,5 kg' },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ label: '', slug: '', size_group: 'bebek', height: '', weight: '', sort_order: 0, is_active: true }}
    />
  )
}
