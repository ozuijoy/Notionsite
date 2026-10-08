# Deployment Contract

## Source Of Truth

- Package manager: `packageManager` in `package.json`
- Node runtime: `engines.node` in `package.json`
- Primary deploy target: Cloudflare Pages (via OpenNext.js)
- CI workflow: `.github/workflows/build.yml`

## Platform Support

| Platform | Branch | Config Files | Status |
|---|---|---|---|
| Cloudflare Pages | `main` | `wrangler.jsonc`, `open-next.config.ts` | ✅ Supported & tested |
| Vercel | `vercel` | `vercel.json` | ✅ Supported |
| Netlify | `netlify` | `netlify.toml` | ✅ Supported |

## Cloudflare Pages (Primary — `main` branch)

- Build command: `pnpm install --frozen-lockfile && pnpm run build:worker`
- Output directory: `.open-next/assets`
- Requires Node 22.x and pnpm 10.x
- Uses OpenNext.js to transform Next.js to Cloudflare Workers
- All pages are SSG (static generation) with fallback disabled
- ISR revalidation: 3600 seconds
- OG images: Satori + Resvg (build-time, `scripts/generate-og-images.tsx`)

## Vercel (Secondary — `vercel` branch)

- Build command: `pnpm run build`
- Output directory: `.next`
- Next.js native integration
- Config file: `vercel.json`
- OG images: Satori + Resvg (build-time, no Puppeteer required)
- No Cloudflare-specific dependencies

## Netlify (Secondary — `netlify` branch)

- Build command: `pnpm run build`
- Output directory: `.next`
- Framework: Next.js (auto-detected)
- Config file: `netlify.toml`
- OG images: Satori + Resvg (build-time, no Puppeteer required)
- No Cloudflare-specific dependencies

## Contract

- Production runs on Node `22.x`. Do not use a broad engine range such as
  `>=18`, because the deployment platform may auto-upgrade to a newer major runtime.
- Keep `package.json`, `package-lock.json`, and `pnpm-lock.yaml` aligned.
  Vercel uses `pnpm-lock.yaml`; local users may still use npm.
- Next.js must stay on a non-vulnerable patched release. For the current
  Next 15.5 line, the minimum patched version is `15.5.9`.
- Build must not depend on system Chrome libraries on serverless platforms.
  OG images use Satori + Resvg (pure JavaScript), not Puppeteer.
- Environment variable `NOTION_TOKEN_V2` is required at build and runtime.

## Verification

- `npx pnpm@10.11.1 install --frozen-lockfile --strict-peer-dependencies`
- Cloudflare: `pnpm run build:worker` then `pnpm preview:worker`
- Vercel/Netlify: `pnpm run build`
- Confirm the deployment logs show Next.js `15.5.9` or newer patched release.
- Confirm `public/og-images/` directory contains generated PNG files.