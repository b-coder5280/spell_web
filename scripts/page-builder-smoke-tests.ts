import assert from 'node:assert/strict'

import {
    PAGE_BUILDER_SECTION_TYPES,
    getRenderableSections,
    hasValidPageBuilderHome,
    resolveCmsLink,
    resolveSiteNavigation,
    sanitizeAnchorId,
} from '../src/lib/page-builder'

const validHero = {
    _key: 'hero-a',
    _type: 'heroSection',
    settings: { enabled: true },
    title: '반도체 포토닉스와 전자소자 연구실',
}

assert.equal(hasValidPageBuilderHome(null), false, 'no homePage document -> LegacyHome')
assert.equal(hasValidPageBuilderHome({ pageBuilderEnabled: false, sections: [validHero] }), false, 'disabled switch -> LegacyHome')
assert.equal(hasValidPageBuilderHome({ pageBuilderEnabled: true, sections: [validHero] }), true, 'enabled valid sections -> PageBuilder')
assert.equal(hasValidPageBuilderHome({ pageBuilderEnabled: true, sections: [] }), false, 'enabled empty sections -> LegacyHome')
assert.equal(hasValidPageBuilderHome({ pageBuilderEnabled: true, sections: [{ _key: 'x', _type: 'futureSection' }] }), false, 'unknown-only sections -> LegacyHome')

const mixedSections = [
    { _key: 'unknown', _type: 'futureSection' },
    { _key: 'disabled', _type: 'newsSection', settings: { enabled: false } },
    { _key: 'first', _type: 'textSection', settings: { enabled: true }, title: 'Long Korean 가나다라마바 사아자차카타파하' },
    { _key: 'second', _type: 'ctaSection', settings: {}, title: 'A very long English publication title that should wrap instead of changing builder safety logic' },
]

assert.deepEqual(
    getRenderableSections(mixedSections).map((section) => section._key),
    ['first', 'second'],
    'unknown sections ignored, disabled sections hidden, order preserved'
)

for (const sectionType of PAGE_BUILDER_SECTION_TYPES) {
    assert.equal(
        hasValidPageBuilderHome({
            pageBuilderEnabled: true,
            sections: [{ _key: sectionType, _type: sectionType, settings: { enabled: true } }],
        }),
        true,
        `${sectionType} preset can render`
    )
}

assert.equal(resolveCmsLink({ label: 'Research', linkType: 'internal', internalRoute: 'research' }).href, '/research', 'internal link normalized')
assert.equal(resolveCmsLink({ label: 'Paper', linkType: 'external', externalUrl: 'https://example.com/paper', openInNewTab: true }).rel, 'noopener noreferrer', 'external new tab uses safe rel')
assert.equal(resolveCmsLink({ label: 'Bad', linkType: 'external', externalUrl: 'javascript:alert(1)' }).href, '/', 'unsafe URL rejected')
assert.equal(resolveCmsLink({ label: 'Email', linkType: 'email', email: 'hobkim@gist.ac.kr' }).href, 'mailto:hobkim@gist.ac.kr', 'email link supported')
assert.equal(sanitizeAnchorId(' Join Our Lab! '), 'join-our-lab', 'anchor sanitized')

const fallbackNavigation = [{ name: 'Research', href: '/research' }]
assert.deepEqual(
    resolveSiteNavigation([], fallbackNavigation).map((item) => item.href),
    ['/research'],
    'header settings missing -> current header fallback'
)

assert.deepEqual(
    resolveSiteNavigation(
        [
            { name: 'Hidden', href: '/hidden', enabled: false },
            { name: 'Opening', href: '/opening', order: 2 },
            { name: 'Research', href: '/research', order: 1 },
        ],
        fallbackNavigation
    ).map((item) => item.href),
    ['/research', '/opening'],
    'navigation disabled and ordering rules applied'
)

assert.doesNotThrow(() => {
    getRenderableSections([
        { _key: 'missing-image', _type: 'gallerySection', settings: { enabled: true } },
        { _key: 'missing-reference', _type: 'publicationSection', settings: { enabled: true }, selectedPublications: [null] },
    ])
}, 'missing image/reference data does not break safety helpers')

console.log('Page Builder smoke tests passed.')
