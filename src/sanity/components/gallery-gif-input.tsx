'use client'

import { useLayoutEffect, useRef, useState, type ClipboardEvent, type CSSProperties } from 'react'
import { set, unset, useClient, type StringInputProps, type TextInputProps } from 'sanity'
import { galleryGifUrl, parseGalleryText, serializeGalleryText, textColor, type GalleryTextPart, type TextStyle } from '../../lib/gallery-text'

const MAX_GIF_BYTES = 10 * 1024 * 1024
const buttonStyle: CSSProperties = { padding: '6px 10px', border: '1px solid #94a3b8', borderRadius: 5, background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit', fontSize: 13 }

function gifImage(url: string) {
    const image = document.createElement('img')
    image.src = url
    image.alt = 'GIF'
    image.dataset.galleryGif = url
    image.contentEditable = 'false'
    image.referrerPolicy = 'no-referrer'
    image.style.cssText = 'display:inline-block;height:1.6em;max-width:5em;object-fit:contain;vertical-align:middle;margin:0 4px'
    return image
}

function editorColor(value: string): string | undefined {
    const rgb = value.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/)
    return textColor(value) || (rgb ? textColor('#' + rgb.slice(1).map(channel => Number(channel).toString(16).padStart(2, '0')).join('')) : undefined)
}

function readEditor(root: Node): string {
    const parts: GalleryTextPart[] = []
    function read(parent: Node, inherited: TextStyle = {}) {
        Array.from(parent.childNodes).forEach((node, index) => {
            if (node.nodeType === Node.TEXT_NODE) { parts.push({ type: 'text', text: node.textContent || '', ...inherited }); return }
            if (!(node instanceof HTMLElement)) return
            const style = { ...inherited }
            if (['B', 'STRONG'].includes(node.tagName)) style.bold = true
            if (node.style.fontWeight) style.bold = node.style.fontWeight === 'bold' || Number(node.style.fontWeight) >= 600
            const color = editorColor(node.style.color || node.getAttribute('color') || '')
            if (color) style.color = color
            if (node.dataset.galleryGif) parts.push({ type: 'gif', url: node.dataset.galleryGif, ...style })
            else if (node.tagName === 'BR') parts.push({ type: 'text', text: '\n', ...style })
            else {
                if (index > 0 && ['DIV', 'P'].includes(node.tagName)) parts.push({ type: 'text', text: '\n' })
                read(node, style)
            }
        })
    }
    read(root)
    return serializeGalleryText(parts)
}

function editorNode(part: GalleryTextPart): Node {
    const node = part.type === 'text' ? document.createTextNode(part.text) : gifImage(part.url)
    if (!part.bold && !part.color) return node
    const span = document.createElement('span')
    if (part.bold) span.style.fontWeight = '700'
    if (part.color) span.style.color = part.color
    span.append(node)
    return span
}

export function FormattedTextInput(props: StringInputProps | TextInputProps) {
    return <GalleryGifInput {...props} allowGif={false} />
}

export function GalleryGifInput(props: (StringInputProps | TextInputProps) & { allowGif?: boolean }) {
    const { value = '', onChange, readOnly, elementProps, schemaType } = props
    const allowGif = props.allowGif !== false
    const client = useClient({ apiVersion: '2025-01-01' })
    const editor = useRef<HTMLDivElement>(null)
    const fileInput = useRef<HTMLInputElement>(null)
    const savedRange = useRef<Range | null>(null)
    const composing = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [showLink, setShowLink] = useState(false)
    const [link, setLink] = useState('')
    const [color, setColor] = useState('#2563eb')
    const multiline = schemaType.type?.name === 'text' || schemaType.name === 'text'

    useLayoutEffect(() => {
        const root = editor.current
        if (!root || composing.current || readEditor(root) === value) return
        root.replaceChildren(...parseGalleryText(value).map(editorNode))
        savedRange.current = null
    }, [value])

    function rememberSelection() {
        const selection = window.getSelection()
        if (selection?.rangeCount && editor.current?.contains(selection.anchorNode) && editor.current?.contains(selection.focusNode)) {
            savedRange.current = selection.getRangeAt(0).cloneRange()
        }
    }

    function commit() {
        if (readOnly || !editor.current) return
        const next = readEditor(editor.current!)
        onChange(next ? set(next) : unset())
        rememberSelection()
    }

    function format(command: 'bold' | 'foreColor' | 'removeFormat', colorValue?: string) {
        const root = editor.current
        if (!root || readOnly || composing.current) return
        const range = savedRange.current
        if (!range || !root.contains(range.startContainer) || !root.contains(range.endContainer)) {
            setError('서식을 바꿀 글자를 먼저 선택해 주세요.')
            return
        }
        root.focus()
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        // Native editing commands preserve the browser's undo and typing history.
        document.execCommand(command, false, colorValue)
        setError('')
        commit()
    }

    function insert(node: Node) {
        const root = editor.current
        if (!root || readOnly) return
        const range = savedRange.current?.cloneRange() || document.createRange()
        if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {
            range.selectNodeContents(root)
            range.collapse(false)
        }
        range.deleteContents()
        range.insertNode(node)
        range.setStartAfter(node)
        range.collapse(true)
        root.focus()
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        commit()
    }

    async function uploadGif(file: Blob, filename = 'gallery.gif') {
        if (busy || readOnly) return
        setError('')
        setBusy(true)
        try {
            if (file.size > MAX_GIF_BYTES) throw new Error('GIF는 10MB 이하로 선택해 주세요.')
            const header = new TextDecoder().decode(await file.slice(0, 6).arrayBuffer())
            if (!['GIF87a', 'GIF89a'].includes(header)) throw new Error('움직이는 GIF 파일을 선택해 주세요. 다른 형식의 이미지는 앨범 Images에 올릴 수 있어요.')
            const asset = await client.assets.upload('image', file, { filename, contentType: 'image/gif' })
            insert(gifImage(asset.url))
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'GIF를 업로드하지 못했어요. 다시 시도해 주세요.')
        } finally {
            setBusy(false)
        }
    }

    async function paste(event: ClipboardEvent<HTMLDivElement>) {
        if (readOnly) return
        event.preventDefault()
        rememberSelection()
        if (busy) return
        const files = Array.from(event.clipboardData.files)
        const file = files.find(file => file.type === 'image/gif' || /\.gif$/i.test(file.name))
        if (allowGif && file) { await uploadGif(file, file.name); return }
        const html = event.clipboardData.getData('text/html')
        const image = html ? new DOMParser().parseFromString(html, 'text/html').querySelector('img') : null
        const source = image?.getAttribute('src') || ''
        if (allowGif && /^data:image\/gif;base64,/i.test(source)) {
            try {
                const encoded = source.slice(source.indexOf(',') + 1)
                if (encoded.length > MAX_GIF_BYTES * 1.4) throw new Error('GIF는 10MB 이하로 선택해 주세요.')
                const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0))
                await uploadGif(new Blob([bytes], { type: 'image/gif' }))
            } catch (reason) {
                setError(reason instanceof Error ? reason.message : 'GIF를 읽지 못했어요.')
            }
            return
        }
        const imageUrl = galleryGifUrl(source)
        if (allowGif && imageUrl) { insert(gifImage(imageUrl)); return }
        const text = event.clipboardData.getData('text/plain')
        const textUrl = galleryGifUrl(text)
        if (allowGif && textUrl && /\.gif(?:$|[?#])/i.test(textUrl)) { insert(gifImage(textUrl)); return }
        if (text) {
            const fragment = document.createDocumentFragment()
            for (const part of parseGalleryText(multiline ? text : text.replace(/[\r\n]+/g, ' '))) {
                fragment.append(editorNode(part))
            }
            // A fragment is emptied on insertion; use its last child as the caret anchor.
            const lastChild = fragment.lastChild
            if (lastChild) {
                const wrapper = document.createElement('span')
                wrapper.append(fragment)
                insert(wrapper)
            }
        } else {
            setError('이 클립보드 형식은 지원되지 않아요. GIF 파일을 업로드하거나 GIF 이미지 주소를 넣어 주세요.')
        }
    }

    return (
        <div style={{ display: 'grid', gap: 8 }}>
            <div
                id={elementProps.id}
                ref={node => {
                    editor.current = node
                    const ref = elementProps.ref
                    if (ref) (ref as { current: HTMLElement | null }).current = node
                }}
                role="textbox"
                aria-label={schemaType.title || (multiline ? 'Description' : 'Title')}
                aria-multiline={multiline}
                aria-readonly={!!readOnly}
                aria-describedby={`${elementProps.id}-gif-help`}
                contentEditable={!readOnly}
                suppressContentEditableWarning
                tabIndex={readOnly ? -1 : 0}
                spellCheck
                onFocus={elementProps.onFocus}
                onBlur={event => { rememberSelection(); elementProps.onBlur(event) }}
                onMouseUp={rememberSelection}
                onKeyUp={rememberSelection}
                onInput={() => { if (!composing.current) commit() }}
                onCompositionStart={() => { composing.current = true }}
                onCompositionEnd={() => { composing.current = false; commit() }}
                onKeyDown={event => {
                    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b' && !event.nativeEvent.isComposing) {
                        event.preventDefault()
                        rememberSelection()
                        format('bold')
                    }
                    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                        event.preventDefault()
                        if (multiline) { rememberSelection(); insert(document.createTextNode('\n')) }
                    }
                }}
                onPaste={paste}
                onDrop={event => {
                    event.preventDefault()
                    if (readOnly || busy || !allowGif) return
                    rememberSelection()
                    const file = event.dataTransfer.files[0]
                    if (file) void uploadGif(file, file.name)
                }}
                style={{ minHeight: multiline ? 120 : 42, padding: '10px 12px', border: '1px solid #94a3b8', borderRadius: 5, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.6, opacity: readOnly ? 0.6 : 1 }}
            />
            {!readOnly && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button type="button" style={{ ...buttonStyle, fontWeight: 700 }} onMouseDown={event => event.preventDefault()} onClick={() => format('bold')} title="굵게 (Ctrl+B / ⌘B)">B 굵게</button>
                <label style={{ ...buttonStyle, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    글자색
                    <input type="color" aria-label="글자색 선택" value={color} onPointerDown={rememberSelection} onChange={event => setColor(event.target.value)} style={{ width: 28, height: 24, padding: 0, border: 0, cursor: 'pointer' }} />
                </label>
                <button type="button" style={buttonStyle} onMouseDown={event => event.preventDefault()} onClick={() => format('foreColor', color)}>색상 적용</button>
                <button type="button" style={buttonStyle} onMouseDown={event => event.preventDefault()} onClick={() => format('removeFormat')}>서식 지우기</button>
                {allowGif && <>
                <button type="button" style={buttonStyle} disabled={busy} onClick={() => fileInput.current?.click()}>{busy ? 'GIF 업로드 중…' : 'GIF 업로드'}</button>
                <button type="button" style={buttonStyle} disabled={busy} aria-expanded={showLink} onClick={() => setShowLink(!showLink)}>GIF 링크</button>
                <input ref={fileInput} type="file" accept="image/gif,.gif" hidden disabled={busy} onChange={event => {
                    const file = event.currentTarget.files?.[0]
                    event.currentTarget.value = ''
                    if (file) void uploadGif(file, file.name)
                }} />
                </>}
            </div>}
            {showLink && !readOnly && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <input type="url" aria-label="GIF 이미지 주소" value={link} placeholder="https://…/image.gif" disabled={busy} onChange={event => setLink(event.target.value)} style={{ ...buttonStyle, minWidth: 160, flex: 1, cursor: 'text' }} />
                <button type="button" style={buttonStyle} disabled={busy || !link.trim()} onClick={() => {
                    const url = galleryGifUrl(link)
                    if (!url) { setError('http 또는 https로 시작하는 GIF 이미지 주소를 넣어 주세요.'); return }
                    setError('')
                    insert(gifImage(url))
                    setLink('')
                    setShowLink(false)
                }}>삽입</button>
            </div>}
            <small id={`${elementProps.id}-gif-help`} style={{ opacity: 0.75, lineHeight: 1.5 }}>글자를 선택한 뒤 굵게를 누르거나, 글자색을 고르고 색상 적용을 누르세요. 서식 지우기로 기본 글씨로 되돌릴 수 있어요.{allowGif && ' 이모지와 GIF도 글 사이에 넣을 수 있어요. GIF 업로드 / GIF 링크를 이용해 주세요. (최대 10MB)'}</small>
            {error && <small role="alert" style={{ color: '#e85d5d' }}>{error}</small>}
        </div>
    )
}
