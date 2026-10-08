# Notion Content Contract

## Source Of Truth

- Site databases: `notionDbIds` in `site.config.ts`
- Notion API wrapper: `lib/notion-api.ts`
- Site map assembly: `lib/context/get-site-map.ts`
- Cache entry point: `lib/context/site-cache.ts`
- Page metadata model: `lib/context/types.ts`

## Notion Database Template Schema

This project requires a Notion database with the following properties. Create your own database that matches this structure.

### Required Properties

| Property Name | Notion Type | Required | Description |
|---|---|---|---|
| **Title** | Title (text) | ✅ Yes | Page title. Used for display and URL generation. |
| **Slug** | Text | ✅ Yes | URL slug for the page. Must be URL-safe (lowercase, hyphens). Example: `my-first-post` |
| **Type** | Select | ✅ Yes | Page type. Valid values: `Post`, `Category`, `Home`, `Database` |
| **Public** | Checkbox | ✅ Yes | Must be checked (`true`) for the page to be published. Unchecked pages are skipped. |

### Optional Properties

| Property Name | Notion Type | Description |
|---|---|---|
| **Language** | Select or Text | Locale code, e.g. `en`, `ko`, `ja`. Used for i18n routing. Default locale comes from `site.locale.json`. |
| **Description** | Text | Short description for the page. Used in meta tags and social previews. |
| **Published** | Date | Publication date. Used for date display and ordering. |
| **Tags** | Multi-select | Array of tags. Used for tag pages, tag graph, and social previews. |
| **Authors** | Multi-select | Array of author names. Must match names in `site.config.ts` `authors` array. |
| **Use Original Cover Image** | Checkbox | When checked, OG images use the raw cover image without glassmorphism overlay. |
| **Parent** | Relation (to same DB) | Parent page relation. Used for breadcrumb navigation and category hierarchy. |
| **Children** | Relation (to same DB) | Children pages relation. Used for building the navigation tree. |
| **Cover Image** | (Notion page cover) | Set via Notion's native page cover image feature. |

### Database Type Page

A page with `Type = "Database"` serves as a database label in the breadcrumb. When a `Database` page is present, its `parentDbId` links to the actual Notion database ID. This is used to display database names in breadcrumbs.

### Example Database Structure

```
Title: My Blog Posts
Slug: my-blog-posts
Type: Post
Public: ✅
Language: en
Description: A sample blog post
Published: 2026-10-08
Tags: [javascript, tutorial]
Authors: [Jaewan Shin]
```

### Multi-language Support

To support multiple languages, create separate entries for each language:

```
Entry 1: Title: Hello World, Language: en, Slug: hello-world
Entry 2: Title: 안녕하세요, Language: ko, Slug: hello-world
```

Pages with the same slug but different languages share the same URL path (e.g., `/en/post/hello-world` and `/ko/post/hello-world`).

### URL Routing

Pages are routed based on their `Type` and `Language`:

| Type | Route Pattern |
|---|---|
| `Post` | `/{locale}/post/{slug}` |
| `Category` | `/{locale}/category/{slug}` |
| `Home` | `/{locale}/` or `/{locale}/post/{slug}` |

Tags are automatically routed to `/{locale}/tag/{tag-name}`.

## Content Contract

- Public pages require at least title, slug, type, and public state.
- Invalid or incomplete Notion rows should be skipped with warnings, not crash the build.
- Build and runtime use the cached site map when available to avoid repeated Notion API calls.
- Transient Notion API errors may reduce generated paths for that run, but must not corrupt committed source files.

## Verification

1. `npm run build` — confirm build succeeds
2. Check build logs for page counts and skipped-page warnings
3. Confirm multiple `/post/...`, `/category/...`, and `/tag/...` routes are generated
4. Verify `site.config.ts` `notionDbIds` points to your database IDs

## Environment Variable

| Variable | Required | Description |
|---|---|---|
| `NOTION_TOKEN_V2` | ✅ | Notion API token (token_v2 from browser cookies) |