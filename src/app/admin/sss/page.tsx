'use client'
import AdminCrudPage from '@/components/admin/AdminCrudPage'

export default function AdminSssPage() {
  return (
    <AdminCrudPage
      table="faqs"
      title="Sıkça Sorulan Sorular"
      description="SSS sayfasında ve Google'daki soru-cevap sonuçlarında görünür. Cevaplarda {kargo_limit}, {telefon} gibi kısa kodlar kullanabilirsiniz."
      newLabel="Yeni Soru"
      nameKey="question"
      columns={[{ key: 'question', label: 'Soru', render: (item) => <span className="font-semibold">{item.question}</span> }]}
      fields={[
        { key: 'question', label: 'Soru', type: 'text', required: true, wide: true },
        { key: 'answer', label: 'Cevap', type: 'textarea', required: true },
        { key: 'sort_order', label: 'Sıra', type: 'number' },
        { key: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      defaultValues={{ question: '', answer: '', sort_order: 0, is_active: true }}
    />
  )
}
