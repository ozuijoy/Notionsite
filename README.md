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

Noxionite turns your Notion **database** into a blog. This project does **not** provide a pre-built Notion template, but the database structure is simple and documented below.

### Step 1: Create the database in Notion

1. Open Notion and create a new page (e.g. name it "My Blog")
2. Type `/database` and choose **Database → Table view**
3. Rename the database (optional, e.g. "Blog Posts")

### Step 2: Add the required properties

Click **+ Add a property** at the top of the database and add these four properties in order:

| Property Name | Property Type | How to set it in Notion |
|---|---|---|
| **Title** | Title | Default — this is the page title column. Leave as is. |
| **Slug** | Text | Click the **+** → type `Slug` → select **Text**. |
| **Type** | Select | Click the **+** → type `Type` → select **Select**. Click the **Select** pill → choose **Add option** and add these exact options: `Post`, `Category`, `Home`, `Database`. |
| **Public** | Checkbox | Click the **+** → type `Public` → select **Checkbox**. |

💡 The database now has exactly these 4 columns: `Title` (default), `Slug`, `Type`, `Public`.

### Step 3: Add optional properties

| Property Name | Property Type | Notes |
|---|---|---|
| **Language** | Select or Text | Add options like `en`, `ko`. Or simply type text. |
| **Description** | Text | Short description shown in meta tags. |
| **Published** | Date | Your blog post's publication date. |
| **Tags** | Multi-select | Add options (e.g. `javascript`, `tutorial`). |
| **Authors** | Multi-select | Author names — **must match** the `name` in `site.config.ts` `authors`. |
| **Use Original Cover Image** | Checkbox | When checked, the OG image uses the raw page cover. |
| **Parent** | Relation | Add option, then link to another page in **the same database**. |
| **Children** | Relation | Links back to pages whose Parent points to this one. |
| **Cover Image** | (Notion cover) | Set by clicking the cover area at the top of a page. |

### Step 4: Create your first post

Add a new row (click the `+ Add a page` row) with values like:

| Title | Slug | Type | Public | Language | Description | Published | Tags |
|---|---|---|---|---|---|---|---|
| Hello World | hello-world | Post | ✅ | en | My first blog post | 2026-10-08 | javascript, tutorial |

### Step 5: Publish a category

Add a row with:

| Title | Slug | Type | Public |
|---|---|---|---|
| Tutorial | tutorial | Category | ✅ |

And link posts to it via the **Parent** relation.

### Multi-language posts

To publish the same post in multiple languages, add a separate row with the **same Slug** but a different **Language**:

| Title | Slug | Language | Type | Public |
|---|---|---|---|---|
| Hello World | hello-world | en | Post | ✅ |
| 안녕하세요 | hello-world | ko | Post | ✅ |

They will appear at `/en/post/hello-world` and `/ko/post/hello-world`.

### Step 6: Get the Notion API token (`NOTION_TOKEN_V2`)

Noxionite needs a Notion API token to read your database. Notion doesn't have a "create API token" button, so you extract it from your browser:

1. Open [https://www.notion.so](https://www.notion.so) and **log in**
2. Press **F12** (Windows/Linux) or **⌘+⌥+I** (Mac) to open Dev Tools
3. In the Dev Tools panel, go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Expand **Cookies** → click **https://www.notion.so**
5. Find the cookie named `token_v2` in the list
6. Double-click its **Value** cell and **copy the entire value** (it's a long string)

Then add it to your `.env.local`:

```bash
cp .env.example .env.local
echo "NOTION_TOKEN_V2=your_token_v2_here" >> .env.local
```

### Step 7: Get your database ID and configure the site

1. In your Notion database, click the three dots `•••` → **Get link to block**
2. In the URL you get (e.g. `https://www.notion.so/xyz?v=abc#1234567890abcdef1234567890abcdef`), the database ID is the long hex string (`1234567890abcdef...`)
3. Open `site.config.ts` and edit:

```typescript
export default siteConfig({
  notionDbIds: ['YOUR_DATABASE_ID'],
  name: 'Your Blog Name',
  domain: 'your-domain.com',
  author: 'Your Name',
  ...
})
```

> 📖 Full field-by-field reference: [docs/ssot/contract/notion-content.md](docs/ssot/contract/notion-content.md)

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