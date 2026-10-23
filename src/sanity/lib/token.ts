import 'server-only'

// Reuse the existing server token when a dedicated preview token is unavailable.
// Neither token is included in the Studio or public browser bundles.
export const readToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
