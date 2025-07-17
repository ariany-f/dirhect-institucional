import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import './RichTextEditor.css'

const MenuBar = ({ editor }) => {
  if (!editor) return null
  return (
    <div className="rte-toolbar">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}><b>B</b></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}><i>I</i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}><u>U</u></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>• Lista</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>1. Lista</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>⯇</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>≡</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>⯈</button>
      <button type="button" onClick={() => {
        const url = window.prompt('URL do link')
        if (url) editor.chain().focus().setLink({ href: url }).run()
      }}>🔗</button>
      <button type="button" onClick={() => {
        const url = window.prompt('URL da imagem')
        if (url) editor.chain().focus().setImage({ src: url }).run()
      }}>🖼️</button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>Limpar</button>
    </div>
  )
}

export default function RichTextEditor({ value, onChange, disabled }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: value || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML())
    },
  })

  // Atualiza o conteúdo se vier de fora
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value || '', false)
  }

  return (
    <div className="rte-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="rte-editor" />
    </div>
  )
} 