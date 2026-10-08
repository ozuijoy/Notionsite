# Noxionite

> The most beautiful blog made with Notion

![SCR-20250824-kvxf](https://github.com/user-attachments/assets/9237e080-a604-468e-b2e1-e7ec40e64b14)

**Demo**: https://noxionite.leapsignal.net/

---

## 1. Overview

Noxionite is a powerful blog engine that turns your Notion posts into a personal blog site. Built on [react-notion-x](https://github.com/NotionX/react-notion-x) with Next.js 15, ISR, and multi-platform deployment.

---

## 2. Features

- **Full Notion compatibility** — All Notion blocks rendered beautifully
- **Fast routing** — ISR caching, page navigation under 0.2s
- **Infinite folder-style categories** — Unlimited nested hierarchy
- **Auto table of contents** — Generated from Notion headings
- **Graph View** — Interactive category/tag visualization
- **Glassmorphism design** — Dark/light mode, responsive
- **Static OG images** — Satori + Resvg, works on all platforms
- **23+ languages** — Built-in i18n support
- **Multi-author** — Co-author support with avatars
- **MIT license** — Free and open source

---

## 3. Notion Template Setup

This project does **not** include a pre-built Notion template. You must create your own Notion workspace and database matching the schema below.

### Required Properties

| Property | Notion Type | Required | Notes |
|---|---|---|---|
| **Title** | Title | ✅ | Page title |
| **Slug** | Text | ✅ | URL-safe slug, e.g. `my-first-post` |
| **Type** | Select | ✅ | Values: `Post`, `Category`, `Home`, `Database` |
| **Public** | Checkbox | ✅ | Must be checked to publish |

### Optional Properties

| Property | Notion Type | Notes |
|---|---|---|
| **Language** | Select / Text | e.g. `en`, `ko`. Default from `site.locale.json` |
| **Description** | Text | Meta description |
| **Published** | Date | Publication date |
| **Tags** | Multi-select | Array of tags |
| **Authors** | Multi-select | Must match names in `site.config.ts` |
| **Use Original Cover Image** | Checkbox | Skip OG overlay |
| **Parent** | Relation | Parent page (breadcrumb) |
| **Children** | Relation | Child pages |
| **Cover Image** | Notion cover | Set via Notion page cover |

### Example Entry

```
Title: Hello World
Slug: hello-world
Type: Post
Public: ✅
Language: en
Description: My first blog post
Published: 2026-10-08
Tags: [javascript, tutorial]
Authors: [Jaewan Shin]
```

### Multi-language

Create separate entries per language with the same slug:

| Title | Language | Slug |
|---|---|---|
| Hello World | en | hello-world |
| 안녕하세요 | ko | hello-world |

### Setup Steps

1. Create a Notion workspace and a database
2. Add all required properties (Title, Slug, Type, Public)
3. Add optional properties as needed
4. Get your `NOTION_TOKEN_V2` from browser cookies (Application → Cookies → `token_v2`)
5. Set your database IDs in `site.config.ts` under `notionDbIds`

> 📖 Full schema reference: [docs/ssot/contract/notion-content.md](docs/ssot/contract/notion-content.md)

---

## 4. Prerequisites

- Node.js 22.x
- pnpm 10.x (or npm 9.x)
- A Notion account with a published database
- A Notion API token (`NOTION_TOKEN_V2`)

---

## 5. Quick Start

```bash
# Clone the repository
git clone https://github.com/ozuijoy/Notionsite.git
cd Notionsite

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local → set NOTION_TOKEN_V2=your_token_v2_here

# Edit site.config.ts
# - Update notionDbIds with your Notion database IDs
# - Update name, domain, author
# - Update socials

# Start development server
pnpm dev
```

---

## 6. Deployment

### Platform Comparison

| | Cloudflare Pages | Vercel | Netlify |
|---|---|---|---|
| **Branch** | `main` | `vercel` | `netlify` |
| **Config** | `wrangler.jsonc`, `open-next.config.ts` | `vercel.json` | `netlify.toml` |
| **Build** | `pnpm run build:worker` | `pnpm run build` | `pnpm run build` |
| **Output** | `.open-next/assets` | `.next` | `.next` |
| **OG Images** | ✅ Satori + Resvg (build-time) | ✅ Satori + Resvg (build-time) | ✅ Satori + Resvg (build-time) |
| **Free Tier** | Unlimited static | 100 GB | 100 GB |
| **Status** | ✅ Supported & tested | ✅ Supported | ✅ Supported |

> **OG Images**: All platforms use build-time generation via [Satori](https://github.com/vercel/satori) + [Resvg](https://github.com/RazrFalcon/resvg.js). No Puppeteer or headless Chrome required — works on all serverless runtimes.

---

### 6.1 Cloudflare Pages (Recommended)

**Branch**: `main`

#### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub (fork or your own repo)
2. Create a Cloudflare Pages project:
   - [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/) → Create → Pages
   - Connect your GitHub repository
   - **Framework preset**: Next.js
   - **Build command**: `pnpm install --frozen-lockfile && pnpm run build:worker`
   - **Build output directory**: `.open-next/assets`
   - **Environment variables**: `NOTION_TOKEN_V2=your_token_v2_here`
3. Add your custom domain
4. Every git push to `main` triggers a deploy

#### Option B: CLI Deploy

```bash
pnpm install
pnpm run build:worker
pnpm deploy
```

---

### 6.2 Vercel

**Branch**: `vercel`

```bash
git checkout vercel
git push origin vercel
```

Or via Vercel dashboard:

1. [Vercel](https://vercel.com) → New Project → Import GitHub Repo
2. Select your repo and the `vercel` branch
3. Framework: Next.js (auto-detected)
4. Build command: `pnpm run build`
5. Output directory: `.next`
6. Add env var: `NOTION_TOKEN_V2=your_token_v2_here`

---

### 6.3 Netlify

**Branch**: `netlify`

```bash
git checkout netlify
git push origin netlify
```

Or via Netlify dashboard:

1. [Netlify](https://app.netlify.com) → Add new site → Import from Git
2. Select your repo and the `netlify` branch
3. Framework: Next.js (auto-detected)
4. Build command: `pnpm run build`
5. Publish directory: `.next`
6. Add env var: `NOTION_TOKEN_V2=your_token_v2_here`

---

## 7. Static OG Images

OG images are generated at build time using [Satori](https://github.com/vercel/satori) (SVG from JSX) + [Resvg](https://github.com/RazrFalcon/resvg.js) (SVG to PNG). No Puppeteer or headless Chrome needed.

### How It Works

1. `pnpm run build` compiles Next.js pages
2. `postbuild` script (`scripts/generate-og-images.tsx`) reads generated HTML files
3. Extracts `og:image` meta tags to identify which pages need images
4. Renders each page's `SocialCard` component to SVG via Satori
5. Converts SVG to PNG via Resvg (1200×630px)
6. Outputs to `public/og-images/`

### Files

| File | Purpose |
|---|---|
| `scripts/generate-og-images.tsx` | Build-time OG image generation (Satori + Resvg) |
| `components/SocialCard.tsx` | React component for OG card layout |
| `lib/get-social-image-url.ts` | Generates consistent OG image file paths |
| `pages/api/generate-social-image.ts` | Legacy redirect (old URLs → static images) |

---

## 8. Configuration

### site.config.ts

Key settings:

```typescript
export default siteConfig({
  notionDbIds: ['your-database-id-1', 'your-database-id-2'],
  name: 'Your Blog Name',
  domain: 'your-domain.com',
  author: 'Your Name',
  description: 'Your blog description',
  locale: localeConfig,
  isr: { revalidate: 3600 },  // ISR revalidation in seconds
  // ... see site.config.ts for full options
})
```

### .env.local

```
NOTION_TOKEN_V2=your_token_v2_here
```

---

## 9. Project Structure

```
Notionsite/
├── components/          # React components
├── lib/                 # Core library (Notion API, site map, config)
├── pages/               # Next.js pages (pages router)
│   └── api/             # API routes (legacy OG redirect)
├── scripts/             # Build scripts (OG image generation)
├── styles/              # Global styles
├── public/              # Static assets
├── docs/                # Documentation
├── site.config.ts       # Site configuration
├── site.locale.json     # Locale configuration
├── next.config.mjs      # Next.js configuration
├── open-next.config.ts  # OpenNext (Cloudflare) config
├── wrangler.jsonc       # Cloudflare Workers config
├── vercel.json          # Vercel config (vercel branch)
├── netlify.toml         # Netlify config (netlify branch)
├── package.json
└── tsconfig.json
```

---

## 10. Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build + OG images |
| `pnpm build:worker` | Build for Cloudflare Workers |
| `pnpm preview:worker` | Preview Cloudflare build locally |
| `pnpm deploy` | Deploy to Cloudflare (main branch) |
| `pnpm analyze` | Bundle analysis |
| `pnpm test` | Run lint + prettier checks |

---

## 11. License

MIT © Jaewan Shin

---

## 12. Known Issues

| Issue | Status | Notes |
|---|---|---|
| 5.1 OG tags not reflected on social platforms | ⚠️ | Tags in `<head>` but platforms fail to detect |
| 5.2 Locale detection with empty locale → 404 | ⚠️ | URLs without locale prefix redirect to 404 |
| 5.3 Partial Notion DB fetch via CategoryTree | ⚠️ | ISR caching related |

---

## 13. Branches

| Branch | Platform | Status |
|---|---|---|
| `main` | Cloudflare Pages | ✅ Active, supported & tested |
| `vercel` | Vercel | ✅ Active, community-maintained |
| `netlify` | Netlify | ✅ Active, community-maintained |

> Each branch has platform-specific config files and deployment instructions. Switch branches as needed.