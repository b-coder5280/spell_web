# SPELL Sanity connection

The website and embedded Studio use project `iy8pysb3`, dataset `production`.
The installed Sanity 4.22.0, Vision 4.22.0, next-sanity 11.6.12, Next.js 16.1.1,
and React 19.2.3 satisfy their declared peer dependency ranges. API version
`2026-03-11` is a separate, intentionally pinned API contract.

## Studio domains

The Studio is part of the Next.js deployment at `/studio`, including all nested
editor URLs. Public pages use the `(site)` route group so the website header,
footer, CSS, and Visual Editing overlays do not wrap the editor.

In [Sanity project API settings](https://www.sanity.io/manage/project/iy8pysb3/api),
an Administrator or Developer must allow these exact CORS origins with
**Allow credentials** enabled:

- `https://spellkim.com`
- `https://www.spellkim.com`
- `http://localhost:3000`

Do not include `/studio` in an origin. The bare domain currently redirects to
`www.spellkim.com`, so both production origins are checked. The local Editor
token cannot manage CORS entries; this requires project management permissions.

Verified on 2026-10-23 after the administrator updated the settings: all three
origins accept authenticated requests. Public content and authenticated draft
queries pass `npm run check:sanity`.

## Environment and preview

Use `.env.example` for the environment variable names. Set the same project ID,
dataset, and API version in Vercel for Production and Preview, then redeploy.
Prefer a Viewer token in server-only `SANITY_API_READ_TOKEN` for Presentation.
If absent, the preview server reuses the existing `SANITY_API_WRITE_TOKEN` for
authenticated reads. Tokens must never have a `NEXT_PUBLIC_` prefix.

Public queries explicitly use the published perspective and the origin API.
Home Page Builder remains off until enabled in Sanity; this is independent of
the Studio connection. The existing homepage continues to read its content
from Sanity with the current Home Page settings.

## Checks

- `npm ls sanity next-sanity @sanity/client @sanity/vision react react-dom next --depth=0`
- `npm run check:sanity` — public content, authenticated drafts, exact CORS origins
- `npm run build` — production build, including `/studio/[[...tool]]`

After deploying, visit `https://spellkim.com/studio`, sign in, and open
Website → Home Page. Verify an existing News document opens and Presentation
loads the homepage. A `200` HTML response alone does not confirm browser
authentication; the CORS checks and a signed-in browser session also matter.
