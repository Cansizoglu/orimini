'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react'
import { uploadImage } from './ImageUpload'

export type GalleryImage = { src: string; alt: string }

// Ürün galerisi: çoklu yükleme, sıralama ve her görsel için alt metin (SEO).
export default function ImageGallery({ value, onChange }: { value: GalleryImage[]; onChange: (v: GalleryImage[]) => void }) {
  const [uploading, setUploading] = useState(0)
  const images = Array.isArray(value) ? value : []

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(files.length)
    const added: GalleryImage[] = []
    for (const file of files) {
      try {
        added.push({ src: await uploadImage(file), alt: '' })
      } catch (err) {
        alert('Yükleme hatası: ' + (err as Error).message)
      }
      setUploading((n) => n - 1)
    }
    onChange([...images, ...added])
    e.target.value = ''
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= images.length) return
    const next = [...images]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  const update = (i: number, alt: string) => onChange(images.map((img, k) => (k === i ? { ...img, alt } : img)))
  const remove = (i: number) => onChange(images.filter((_, k) => k !== i))
  const addUrl = () => {
    const url = prompt('Görsel adresi (https://... ya da /images/...)')
    if (url?.trim()) onChange([...images, { src: url.trim(), alt: '' }])
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <div key={img.src + i} className="w-44 border rounded-lg p-2 bg-gray-50">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full h-28 object-cover rounded" />
              {i === 0 && <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">KAPAK</span>}
              <button type="button" onClick={() => remove(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center" title="Kaldır"><X size={14} /></button>
            </div>
            <input className="admin-input mt-2 text-xs" style={{ padding: '6px 8px' }} placeholder="Alt metin (görseli anlatın)" value={img.alt} onChange={(e) => update(i, e.target.value)} />
            <div className="flex justify-between mt-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30" title="Sola al"><ArrowLeft size={14} /></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30" title="Sağa al"><ArrowRight size={14} /></button>
            </div>
          </div>
        ))}
        <label className="flex flex-col items-center justify-center w-44 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          {uploading > 0 ? (
            <span className="text-xs text-gray-500">{uploading} görsel yükleniyor...</span>
          ) : (
            <>
              <Upload size={22} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 text-center">Görsel yükle<br />(birden fazla seçebilirsiniz)</span>
            </>
          )}
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" disabled={uploading > 0} />
        </label>
      </div>
      <button type="button" onClick={addUrl} className="mt-2 text-xs text-blue-600 hover:underline">+ Link ile görsel ekle</button>
    </div>
  )
}
