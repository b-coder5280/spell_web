import assert from 'node:assert/strict'
import { galleryGifToken, galleryGifUrl, galleryPlainText, parseGalleryText, serializeGalleryText, textColor } from '../src/lib/gallery-text'

const original = '생일 축하해요 🎉\n함께한 하루 😊'
assert.deepEqual(parseGalleryText(original), [{ type: 'text', text: original }], 'existing text, emoji and line breaks are preserved')
assert.deepEqual(parseGalleryText(''), [])

const url = 'https://cdn.sanity.io/images/project/production/celebrate.gif'
const token = galleryGifToken(url)
assert.deepEqual(parseGalleryText(`축하 ${token} 🎉\n${token}`), [
    { type: 'text', text: '축하 ' }, { type: 'gif', url },
    { type: 'text', text: ' 🎉\n' }, { type: 'gif', url },
])
assert.equal(galleryPlainText(`축하 ${token} 🎉`), '축하 GIF 🎉', 'image alt text and Studio previews do not expose markup')
assert.equal(galleryGifToken('https://example.com/happy(1).gif'), '![GIF](https://example.com/happy%281%29.gif)', 'parentheses cannot terminate an image token')
assert.equal(galleryGifUrl('https://media.giphy.com/media/id/giphy.gif?cid=abc&rid=giphy.gif'), 'https://media.giphy.com/media/id/giphy.gif?cid=abc&rid=giphy.gif')
for (const unsafe of ['javascript:alert(1)', 'data:image/gif;base64,R0lGODlh', 'file:///private.gif', 'https://user:password@example.com/a.gif', '/relative.gif']) {
    assert.equal(galleryGifUrl(unsafe), null)
    assert.equal(galleryGifToken(unsafe), '')
}
const invalid = '![GIF](javascript:alert)'
assert.deepEqual(parseGalleryText(`${invalid} ${token}`), [{ type: 'text', text: `${invalid} ` }, { type: 'gif', url }], 'unsafe markup remains inert text without swallowing valid GIFs')
assert.deepEqual(parseGalleryText('<script>alert(1)</script>'), [{ type: 'text', text: '<script>alert(1)</script>' }])
assert.deepEqual(parseGalleryText('[b]굵게 [color=#E11D48]색상[/color][/b] 일반'), [
    { type: 'text', text: '굵게 ', bold: true },
    { type: 'text', text: '색상', bold: true, color: '#e11d48' },
    { type: 'text', text: ' 일반' },
])
assert.equal(galleryPlainText(`[b]축하 [color=#2563eb]${token} 🎉[/color][/b]`), '축하 GIF 🎉')
const formatted = parseGalleryText(`[color=#2563eb]기본 [b]굵게[/b]\n${token}[/color]`)
assert.deepEqual(parseGalleryText(serializeGalleryText(formatted)), formatted, 'formatting and animated GIFs survive saving and reopening')
assert.deepEqual(parseGalleryText('[b]미완성'), [{ type: 'text', text: '[b]' }, { type: 'text', text: '미완성' }])
assert.equal(galleryPlainText('[color=red]text[/color]'), '[color=red]text[/color]', 'only hex colors are interpreted')
assert.equal(galleryPlainText('[color=javascript:alert(1)]text[/color]'), '[color=javascript:alert(1)]text[/color]')
assert.equal(textColor('#AABBCC'), '#aabbcc')
assert.equal(textColor('red; background:url(javascript:alert(1))'), undefined)
assert.equal(serializeGalleryText([{ type: 'text', text: 'a', bold: true }, { type: 'text', text: 'b', bold: true }]), '[b]ab[/b]')
assert.equal(serializeGalleryText([{ type: 'text', text: 'plain', color: 'red' }]), 'plain')
assert.equal(serializeGalleryText([{ type: 'text', text: '', bold: true, color: '#2563eb' }]), '', 'clearing a formatted field also clears its stored value')
console.log('Gallery and news text smoke tests passed')
