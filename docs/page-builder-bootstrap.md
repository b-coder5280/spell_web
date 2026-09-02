# SPELL Home Page Builder Bootstrap

This builder is intentionally default-off. Deploying the code does not change the public homepage unless the `homePage.pageBuilderEnabled` field is published as `true` with at least one enabled, supported section.

## Create an Initial Draft

1. Open Sanity Studio at `/studio`.
2. Go to `Website` -> `Home Page`.
3. Confirm `Enable Page Builder on Public Home` is off.
4. Add sections in the current homepage order:
   - Hero
   - Join Our Lab
   - Publications
   - News, Text, CTA, or other sections as needed
5. Use the `current` layout preset where available to stay closest to production.
6. Reuse existing content documents for Publications, News, Gallery, Members, and Research.
7. Save or publish the Home Page document while leaving `Enable Page Builder on Public Home` off.

## Preview Without Affecting Production

1. Add `SANITY_API_READ_TOKEN` to the deployment environment and local `.env.local`.
2. Open Studio `Presentation`.
3. Preview `/`.
4. Edit, reorder, disable, and re-enable sections from the Home Page section array.
5. Check desktop, tablet, and mobile widths before enabling.

## Enable

1. In `Website` -> `Home Page`, verify sections are present and enabled.
2. Set `Enable Page Builder on Public Home` to on.
3. Publish.

## Roll Back

1. In `Website` -> `Home Page`, set `Enable Page Builder on Public Home` to off.
2. Publish.

The public homepage immediately returns to the legacy implementation on the next ISR refresh. Empty, invalid, disabled-only, or unknown-only section arrays also fall back to the legacy homepage.
