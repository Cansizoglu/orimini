'use client'

import { useState } from 'react'
import { Upload, X, Link as LinkIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export async function uploadImage(file: File) {
  const supabase = createClient()
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('img').upload(fileName, file, { cacheControl: '31536000' })
  if (error) throw error
  return supabase.storage.from('img').getPublicUrl(fileName).data.publicUrl
}

export default function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      onChange(await uploadImage(file))
    } catch (err) {
      alert('Yükleme hatası: ' + (err as Error).message)
    }
    setUploading(false)
    e.target.value = ''
  }

  const askUrl = () => {
    const url = prompt('Görsel adresi (https://... ya da /images/...)', value || '')
    if (url !== null) onChange(url.trim())
  }

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Yüklenen görsel" className="w-40 h-28 object-cover rounded-lg border bg-gray-50" />
          <button type="button" onClick={() => onChange('')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center" title="Görseli kaldır">
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          {uploading ? (
            <span className="text-xs text-gray-500">Yükleniyor...</span>
          ) : (
            <>
              <Upload size={20} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Görsel Yükle</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      )}
      <button type="button" onClick={askUrl} className="mt-1 flex items-center gap-1 text-xs text-blue-600 hover:underline">
        <LinkIcon size={12} /> Link ile ekle
      </button>
    </div>
  )
}
