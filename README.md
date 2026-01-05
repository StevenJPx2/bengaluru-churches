# Bengaluru Churches

An interactive map application displaying churches in Bengaluru with filtering capabilities.

**Live:** https://bengaluru-churches.pages.dev

## Tech Stack

- **Frontend:** Nuxt 4, Nuxt UI v4, nuxt-maplibre
- **Backend:** Nitro with Drizzle ORM, db0
- **Database:** Cloudflare D1 (SQLite)
- **Deployment:** Cloudflare Pages via GitHub Actions

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

## Database

### Generate migrations

```bash
bun run db:generate
```

### Apply migrations to remote D1

```bash
CLOUDFLARE_ACCOUNT_ID=<account-id> npx wrangler d1 execute bengaluru-churches-db --remote --file=server/database/migrations/<migration>.sql
```

### Seed data

```bash
CLOUDFLARE_ACCOUNT_ID=<account-id> npx wrangler d1 execute bengaluru-churches-db --remote --file=server/database/seed.sql
```

## Production

Build:

```bash
bun run build
```

Deploy manually:

```bash
CLOUDFLARE_ACCOUNT_ID=<account-id> npx wrangler pages deploy dist --project-name=bengaluru-churches
```

## Project Structure

```
├── app/
│   ├── pages/index.vue           # Main page with sidebar + map
│   └── components/
│       ├── ChurchSidebar.vue     # Filters & church list
│       └── ChurchMap.vue         # MapLibre map with markers
├── server/
│   ├── api/                      # API endpoints
│   ├── database/
│   │   ├── schema.ts             # Drizzle schema (SSOT)
│   │   ├── migrations/           # SQL migrations
│   │   └── seed.sql              # Seed data
│   └── utils/db.ts               # useDrizzle() helper
├── shared/types/church.ts        # Frontend types from Drizzle schema
└── wrangler.toml                 # D1 binding config
```
