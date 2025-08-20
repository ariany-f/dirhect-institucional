import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Extension } from '@tiptap/core'
import './RichTextEditor.css'

// Extensão customizada para tamanho de fonte
const FontSizeExtension = Extension.create({
  name: 'fontSize',
  
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
  
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ commands }) => {
        return commands.setMark('textStyle', { fontSize })
      },
      unsetFontSize: () => ({ commands }) => {
        return commands.unsetMark('textStyle')
      },
    }
  },
})



const MenuBar = ({ editor, fontSize, onFontSizeChange }) => {
  if (!editor) return null

  // Funções para controlar o tamanho da fonte apenas no texto selecionado
  const applyFontSizeToSelection = (newSize) => {
    if (!editor) {
      showFontNotification('Editor não está pronto')
      return
    }

    const { state } = editor.view
    const { selection } = state
    
    // Verificar se há texto selecionado
    if (selection.empty) {
      showFontNotification('Selecione um texto para alterar o tamanho da fonte')
      return
    }

    // Aplicar o tamanho da fonte usando a extensão customizada
    editor.chain()
      .focus()
      .setFontSize(`${newSize}px`)
      .run()
  }

  const increaseFontSize = () => {
    const currentSize = getCurrentFontSize()
    const newSize = Math.min(currentSize + 2, 24)
    onFontSizeChange(newSize)
    applyFontSizeToSelection(newSize)
  }

  const decreaseFontSize = () => {
    const currentSize = getCurrentFontSize()
    const newSize = Math.max(currentSize - 2, 10)
    onFontSizeChange(newSize)
    applyFontSizeToSelection(newSize)
  }

  const resetFontSize = () => {
    onFontSizeChange(14)
    applyFontSizeToSelection(14)
  }

  return (
    <div className="rte-toolbar">
      {/* Controles de Fonte */}
      <div className="rte-font-controls">
        <span className="rte-font-size-label">Fonte:</span>
        <span className="rte-font-size-value">{fontSize}px</span>
        <button
          type="button"
          onClick={decreaseFontSize}
          className="rte-font-control-btn"
          title="Diminuir fonte"
        >
          <ZoomOut fill="var(--primary-color)" size={20} />
        </button>
        <button
          type="button"
          onClick={resetFontSize}
          className="rte-font-control-btn"
          title="Tamanho padrão"
        >
          <RotateCcw fill="var(--primary-color)" size={20} />
        </button>
        <button
          type="button"
          onClick={increaseFontSize}
          className="rte-font-control-btn"
          title="Aumentar fonte"
        >
          <ZoomIn fill="var(--primary-color)" size={20} />
        </button>
      </div>

      {/* Separador */}
      <div className="rte-toolbar-separator"></div>

      {/* Controles de Formatação */}
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
  const [fontSize, setFontSize] = useState(14)
  const [showNotification, setShowNotification] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontSizeExtension
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

  // Listener para atualizar o indicador de tamanho da fonte quando a seleção mudar
  useEffect(() => {
    if (editor) {
      const updateFontSizeIndicator = () => {
        const currentSize = getCurrentFontSize()
        setFontSize(currentSize)
      }

      editor.on('selectionUpdate', updateFontSizeIndicator)
      
      return () => {
        editor.off('selectionUpdate', updateFontSizeIndicator)
      }
    }
  }, [editor])



  // Função para atualizar o tamanho da fonte (apenas para o indicador)
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize)
  }

  // Função para mostrar notificação
  const showFontNotification = (message) => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  // Função para detectar o tamanho da fonte atual do texto selecionado
  const getCurrentFontSize = () => {
    if (!editor) return 14

    const { state } = editor.view
    const { selection } = state
    
    if (selection.empty) return fontSize

    // Tentar obter o tamanho da fonte do texto selecionado
    const marks = state.storedMarks || state.selection.$from.marks()
    const fontSizeMark = marks.find(mark => mark.type.name === 'textStyle' && mark.attrs.fontSize)
    
    if (fontSizeMark) {
      const size = parseInt(fontSizeMark.attrs.fontSize)
      return isNaN(size) ? 14 : size
    }
    
    return fontSize
  }

  return (
    <div className="rte-container">
      <MenuBar 
        editor={editor} 
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />
      <EditorContent 
        editor={editor} 
        className="rte-editor" 
      />
      
      {/* Notificação */}
      {showNotification && (
        <div className="rte-notification">
          <span>Selecione um texto para alterar o tamanho da fonte</span>
        </div>
      )}
    </div>
  )
} 