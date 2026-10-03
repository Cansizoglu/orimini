'use client'

import { useEffect, useRef } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link, Heading2, Heading3, AlignLeft, AlignCenter, Code, Undo, Redo, Type, Minus, ImagePlus } from 'lucide-react'
import { uploadImage } from './ImageUpload'

interface Props {
  value: string
  onChange: (html: string) => void
  rows?: number
  placeholder?: string
}

export default function RichEditor({ value, onChange, rows = 10, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const sourceMode = useRef(false)

  // Dışarıdan gelen değer değişirse (başka kayıt açılınca) editörü güncelle; yazarken dokunma.
  useEffect(() => {
    const el = editorRef.current
    if (!el || sourceMode.current) return
    if (el.innerHTML !== (value || '') && !el.contains(document.activeElement)) {
      el.innerHTML = value || ''
    }
  }, [value])

  const emit = () => {
    const el = editorRef.current
    if (!el) return
    onChange(sourceMode.current ? el.innerText : el.innerHTML)
  }

  const exec = (command: string, val?: string) => {
    if (sourceMode.current) return
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    emit()
  }

  const insertLink = () => {
    const url = prompt('Link URL girin (site içi için /sayfa-adi):', 'https://')
    if (url) exec('createLink', url)
  }

  const insertImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        exec('insertImage', await uploadImage(file))
      } catch (err) {
        alert('Yükleme hatası: ' + (err as Error).message)
      }
    }
    input.click()
  }

  const toggleSource = () => {
    const el = editorRef.current
    if (!el) return
    if (sourceMode.current) {
      el.innerHTML = el.innerText
      sourceMode.current = false
      el.style.fontFamily = ''
      el.style.whiteSpace = ''
    } else {
      el.innerText = el.innerHTML
      sourceMode.current = true
      el.style.fontFamily = 'monospace'
      el.style.whiteSpace = 'pre-wrap'
    }
    emit()
  }

  const btnClass = "p-1.5 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
  const sepClass = "w-px h-6 bg-gray-300 mx-1"

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        <button type="button" onClick={() => exec('undo')} className={btnClass} title="Geri Al"><Undo size={16} /></button>
        <button type="button" onClick={() => exec('redo')} className={btnClass} title="İleri Al"><Redo size={16} /></button>
        <div className={sepClass} />
        <button type="button" onClick={() => exec('formatBlock', 'h2')} className={btnClass} title="Başlık 2"><Heading2 size={16} /></button>
        <button type="button" onClick={() => exec('formatBlock', 'h3')} className={btnClass} title="Başlık 3"><Heading3 size={16} /></button>
        <button type="button" onClick={() => exec('formatBlock', 'p')} className={btnClass} title="Paragraf"><Type size={16} /></button>
        <div className={sepClass} />
        <button type="button" onClick={() => exec('bold')} className={btnClass} title="Kalın"><Bold size={16} /></button>
        <button type="button" onClick={() => exec('italic')} className={btnClass} title="İtalik"><Italic size={16} /></button>
        <button type="button" onClick={() => exec('underline')} className={btnClass} title="Altı Çizili"><Underline size={16} /></button>
        <div className={sepClass} />
        <button type="button" onClick={() => exec('insertUnorderedList')} className={btnClass} title="Madde İşaretli Liste"><List size={16} /></button>
        <button type="button" onClick={() => exec('insertOrderedList')} className={btnClass} title="Numaralı Liste"><ListOrdered size={16} /></button>
        <div className={sepClass} />
        <button type="button" onClick={() => exec('justifyLeft')} className={btnClass} title="Sola Hizala"><AlignLeft size={16} /></button>
        <button type="button" onClick={() => exec('justifyCenter')} className={btnClass} title="Ortala"><AlignCenter size={16} /></button>
        <div className={sepClass} />
        <button type="button" onClick={insertLink} className={btnClass} title="Link Ekle"><Link size={16} /></button>
        <button type="button" onClick={insertImage} className={btnClass} title="Görsel Ekle"><ImagePlus size={16} /></button>
        <button type="button" onClick={() => exec('insertHorizontalRule')} className={btnClass} title="Yatay Çizgi"><Minus size={16} /></button>
        <button type="button" onClick={toggleSource} className={`${btnClass} ml-auto text-xs font-mono`} title="HTML Kaynak Kodu"><Code size={16} /></button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={emit}
        onBlur={emit}
        className="admin-rich p-4 outline-none overflow-y-auto"
        style={{ minHeight: `${(rows || 10) * 24}px`, maxHeight: '500px', lineHeight: '1.7', fontSize: '14px' }}
        data-placeholder={placeholder || 'İçerik yazın...'}
        suppressContentEditableWarning
      />
    </div>
  )
}
