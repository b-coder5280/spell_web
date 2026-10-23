import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local', quiet: true })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-11'
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
const origins = ['https://spellkim.com', 'https://www.spellkim.com', 'http://localhost:3000']
let failures = 0

function check(ok, message) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${message}`)
  if (!ok) failures++
}

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })

try {
  const counts = await client.fetch(`{
    "news": count(*[_type == "news"]),
    "homePage": count(*[_type == "homePage"]),
    "siteSettings": count(*[_type == "siteSettings"])
  }`)
  check(counts.homePage === 1 && counts.siteSettings === 1, `CMS ${projectId}/${dataset}: ${JSON.stringify(counts)}`)
} catch (error) {
  check(false, `CMS connection: ${error.message}`)
}

check(Boolean(token), 'Server token configured for draft previews (value hidden)')
if (token) {
  try {
    await client.withConfig({ token, perspective: 'drafts' }).fetch('count(*)')
    check(true, 'Authenticated draft query')
  } catch (error) {
    check(false, `Draft query: ${error.message}`)
  }
}

for (const origin of origins) {
  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=count(*)`, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization',
      },
      signal: AbortSignal.timeout(15000),
    })
    check(response.ok && response.headers.get('access-control-allow-origin') === origin && response.headers.get('access-control-allow-credentials') === 'true', `Studio CORS with credentials: ${origin}`)
  } catch (error) {
    check(false, `Studio CORS ${origin}: ${error.message}`)
  }
}

process.exitCode = failures ? 1 : 0
