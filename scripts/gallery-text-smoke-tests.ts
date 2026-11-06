import assert from 'node:assert/strict'
import { galleryGifToken, galleryGifUrl, galleryPlainText, parseGalleryText } from '../src/lib/gallery-text'

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
console.log('Gallery text smoke tests passed')
