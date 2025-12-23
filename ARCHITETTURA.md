# Architettura del Progetto - Best Practice Next.js 16 (Enterprise)

Questa guida descrive la struttura consigliata per un progetto Next.js 16 enterprise-ready con App Router, autenticazione, database, testing e funzionalità avanzate.

## Struttura Consigliata (Enterprise)

```
fake-store-app/
├── app/                                    # App Router (Next.js 13+)
│   ├── [locale]/                           # Internationalization (next-intl)
│   │   ├── (auth)/                         # Route Group per autenticazione
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │       ├── login-form.tsx
│   │   │   │       └── social-login.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │       └── register-form.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                  # Layout specifico per auth
│   │   │
│   │   ├── (marketing)/                    # Route Group per marketing
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (shop)/                         # Route Group per e-commerce
│   │   │   ├── products/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   └── _components/
│   │   │   │   │       ├── product-gallery.tsx
│   │   │   │   │       ├── product-info.tsx
│   │   │   │   │       └── related-products.tsx
│   │   │   │   ├── category/
│   │   │   │   │   └── [category]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── _components/
│   │   │   │       ├── product-filters.tsx
│   │   │   │       └── product-grid.tsx
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── checkout/
│   │   │   │       ├── page.tsx
│   │   │   │       └── success/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── wishlist/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/                    # Route Group per dashboard (protetto)
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components/
│   │   │   │       ├── stats-cards.tsx
│   │   │   │       └── recent-orders.tsx
│   │   │   ├── profile/
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                  # Layout con sidebar
│   │   │
│   │   ├── (admin)/                        # Route Group per admin (protetto)
│   │   │   ├── admin/
│   │   │   │   ├── products/
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── edit/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── orders/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                            # API Routes
│   │   │   ├── v1/                         # API Versioning
│   │   │   │   ├── products/
│   │   │   │   │   ├── route.ts           # GET, POST /api/v1/products
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── route.ts       # GET, PUT, DELETE /api/v1/products/[id]
│   │   │   │   │       └── reviews/
│   │   │   │   │           └── route.ts
│   │   │   │   ├── cart/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── orders/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── register/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── logout/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── refresh/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── upload/
│   │   │   │   │   └── route.ts          # File upload endpoint
│   │   │   │   └── webhooks/
│   │   │   │       ├── stripe/
│   │   │   │       │   └── route.ts
│   │   │   │       └── email/
│   │   │   │           └── route.ts
│   │   │   │
│   │   │   └── health/                    # Health check
│   │   │       └── route.ts
│   │   │
│   │   ├── _components/                   # Componenti privati (non route)
│   │   │   ├── providers/
│   │   │   │   ├── theme-provider.tsx
│   │   │   │   ├── query-provider.tsx
│   │   │   │   └── toast-provider.tsx
│   │   │   └── server-only/
│   │   │       └── server-component.tsx
│   │   │
│   │   ├── _lib/                          # Utilities private all'app
│   │   │   ├── server-utils.ts
│   │   │   └── cache.ts
│   │   │
│   │   ├── layout.tsx                     # Root Layout
│   │   ├── page.tsx                       # Homepage (/)
│   │   ├── loading.tsx                    # Global Loading UI
│   │   ├── error.tsx                      # Global Error UI
│   │   ├── not-found.tsx                  # 404 Page
│   │   ├── global-error.tsx               # Global Error Boundary
│   │   ├── globals.css                    # Stili globali
│   │   ├── template.tsx                   # Template (opzionale)
│   │   └── sitemap.ts                     # Sitemap dinamica
│   │
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json                      # PWA manifest
│
├── components/                            # Componenti riutilizzabili
│   ├── ui/                                # Componenti UI base (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form/
│   │   │   ├── form.tsx
│   │   │   ├── form-field.tsx
│   │   │   └── form-input.tsx
│   │   ├── table/
│   │   │   ├── table.tsx
│   │   │   ├── table-header.tsx
│   │   │   └── table-row.tsx
│   │   └── ... (altri componenti UI)
│   │
│   ├── layout/                            # Componenti di layout
│   │   ├── header/
│   │   │   ├── header.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── cart-icon.tsx
│   │   ├── footer/
│   │   │   ├── footer.tsx
│   │   │   └── footer-links.tsx
│   │   ├── sidebar/
│   │   │   ├── sidebar.tsx
│   │   │   └── sidebar-nav.tsx
│   │   └── breadcrumbs.tsx
│   │
│   ├── features/                          # Componenti per feature specifiche
│   │   ├── products/
│   │   │   ├── product-list.tsx
│   │   │   ├── product-card.tsx
│   │   │   ├── product-details.tsx
│   │   │   ├── product-reviews.tsx
│   │   │   ├── product-filters.tsx
│   │   │   └── product-search.tsx
│   │   │
│   │   ├── cart/
│   │   │   ├── cart-item.tsx
│   │   │   ├── cart-summary.tsx
│   │   │   ├── cart-drawer.tsx
│   │   │   └── checkout-form.tsx
│   │   │
│   │   ├── orders/
│   │   │   ├── order-list.tsx
│   │   │   ├── order-card.tsx
│   │   │   └── order-status.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── auth-form.tsx
│   │   │   ├── social-buttons.tsx
│   │   │   └── protected-route.tsx
│   │   │
│   │   └── admin/
│   │       ├── admin-sidebar.tsx
│   │       ├── data-table.tsx
│   │       └── stats-dashboard.tsx
│   │
│   ├── shared/                            # Componenti condivisi
│   │   ├── loading/
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── skeleton-loader.tsx
│   │   │   └── page-loader.tsx
│   │   ├── error/
│   │   │   ├── error-message.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   └── not-found.tsx
│   │   ├── seo/
│   │   │   ├── metadata.tsx
│   │   │   └── structured-data.tsx
│   │   └── analytics/
│   │       └── analytics.tsx
│   │
│   └── providers/                         # Context Providers
│       ├── theme-provider.tsx
│       ├── query-provider.tsx
│       └── auth-provider.tsx
│
├── lib/                                   # Utilities e configurazioni
│   ├── api/                               # Client API
│   │   ├── client.ts                     # API client base (axios/fetch wrapper)
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── orders.ts
│   │   ├── auth.ts
│   │   └── upload.ts
│   │
│   ├── db/                                # Database
│   │   ├── index.ts                      # Database connection (Prisma/Drizzle)
│   │   ├── schema/                       # Database schema
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── order.ts
│   │   │   └── cart.ts
│   │   ├── migrations/                   # Database migrations
│   │   └── seeds/                        # Seed data
│   │       └── seed.ts
│   │
│   ├── auth/                              # Autenticazione
│   │   ├── config.ts                     # NextAuth config
│   │   ├── providers.ts                  # Auth providers
│   │   ├── middleware.ts                 # Auth middleware
│   │   └── session.ts                    # Session utilities
│   │
│   ├── utils/                             # Funzioni utility
│   │   ├── format.ts                     # Formattazione (date, currency, etc.)
│   │   ├── validation.ts                 # Validazione
│   │   ├── cn.ts                         # className utility (clsx/tailwind-merge)
│   │   ├── logger.ts                     # Logging utility
│   │   ├── cache.ts                      # Cache utilities
│   │   └── errors.ts                     # Error handling
│   │
│   ├── validations/                       # Zod schemas
│   │   ├── auth.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── common.ts
│   │
│   ├── constants/                         # Costanti
│   │   ├── config.ts                     # App config
│   │   ├── routes.ts                     # Route constants
│   │   ├── api-endpoints.ts              # API endpoints
│   │   └── enums.ts                      # Enums
│   │
│   ├── types/                             # TypeScript types
│   │   ├── database.ts                   # Database types
│   │   ├── api.ts                        # API types
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   ├── services/                          # Business logic services
│   │   ├── product-service.ts
│   │   ├── cart-service.ts
│   │   ├── order-service.ts
│   │   ├── payment-service.ts
│   │   ├── email-service.ts
│   │   └── storage-service.ts            # File storage (S3, etc.)
│   │
│   ├── middleware/                        # Custom middleware
│   │   ├── rate-limit.ts
│   │   ├── cors.ts
│   │   └── validation.ts
│   │
│   ├── i18n/                              # Internationalization
│   │   ├── config.ts
│   │   ├── messages/
│   │   │   ├── en.json
│   │   │   ├── it.json
│   │   │   └── es.json
│   │   └── server.ts
│   │
│   └── monitoring/                        # Monitoring e analytics
│       ├── sentry.ts
│       ├── analytics.ts
│       └── performance.ts
│
├── hooks/                                 # Custom React Hooks
│   ├── api/
│   │   ├── use-products.ts
│   │   ├── use-cart.ts
│   │   └── use-orders.ts
│   ├── ui/
│   │   ├── use-debounce.ts
│   │   ├── use-click-outside.ts
│   │   └── use-media-query.ts
│   ├── auth/
│   │   ├── use-auth.ts
│   │   └── use-session.ts
│   └── common/
│       ├── use-local-storage.ts
│       └── use-intersection-observer.ts
│
├── store/                                 # State Management (Zustand/Redux)
│   ├── cart-store.ts
│   ├── auth-store.ts
│   ├── ui-store.ts                        # UI state (theme, sidebar, etc.)
│   └── product-store.ts
│
├── server/                                # Server-side utilities
│   ├── actions/                           # Server Actions
│   │   ├── product-actions.ts
│   │   ├── cart-actions.ts
│   │   ├── order-actions.ts
│   │   └── auth-actions.ts
│   │
│   ├── queries/                           # Server-side data fetching
│   │   ├── product-queries.ts
│   │   ├── order-queries.ts
│   │   └── user-queries.ts
│   │
│   └── utils/
│       ├── server-auth.ts
│       └── server-cache.ts
│
├── public/                                # File statici
│   ├── images/
│   │   ├── products/
│   │   ├── banners/
│   │   └── avatars/
│   ├── icons/
│   ├── fonts/
│   ├── favicon.ico
│   └── og-image.png                       # Open Graph image
│
├── styles/                                # Stili aggiuntivi
│   ├── globals.css
│   ├── components.css
│   └── utilities.css
│
├── types/                                 # Types globali
│   ├── index.ts
│   ├── next-auth.d.ts                    # NextAuth type extensions
│   └── global.d.ts
│
├── tests/                                 # Testing
│   ├── unit/                              # Unit tests
│   │   ├── lib/
│   │   ├── utils/
│   │   └── components/
│   ├── integration/                       # Integration tests
│   │   └── api/
│   ├── e2e/                               # E2E tests (Playwright)
│   │   ├── auth.spec.ts
│   │   ├── products.spec.ts
│   │   └── cart.spec.ts
│   ├── fixtures/                          # Test fixtures
│   │   └── mock-data.ts
│   ├── setup/                             # Test setup
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   └── __mocks__/                         # Mocks
│       └── next-auth.ts
│
├── scripts/                               # Utility scripts
│   ├── seed-db.ts
│   ├── migrate-db.ts
│   ├── generate-types.ts
│   └── build-info.ts
│
├── docker/                                # Docker configuration
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   └── docker-compose.yml
│
├── .github/                               # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── test.yml
│
├── .env.example                           # Environment variables template
├── .env.local                             # Local environment (gitignored)
├── .env.production                        # Production environment
│
├── middleware.ts                          # Next.js Middleware
├── next.config.ts                         # Configurazione Next.js
├── next.config.prod.ts                    # Production config
├── tsconfig.json                          # Configurazione TypeScript
├── tsconfig.server.json                   # Server-side TypeScript config
├── tailwind.config.ts                     # Configurazione Tailwind
├── postcss.config.mjs                     # PostCSS config
├── prisma/                                # Prisma (se usato)
│   ├── schema.prisma
│   └── migrations/
├── vitest.config.ts                       # Vitest config
├── playwright.config.ts                   # Playwright config
├── jest.config.js                         # Jest config (alternativa)
├── .eslintrc.json                         # ESLint config
├── .prettierrc                            # Prettier config
├── .prettierignore
├── .gitignore
├── package.json
└── README.md
```

## Principi Organizzativi

### 1. **App Router Structure** (`app/`)

#### Route Groups

- **`(auth)`**: Route di autenticazione (login, register, password reset)
- **`(marketing)`**: Pagine marketing (about, blog, contact)
- **`(shop)`**: E-commerce pubblico (products, cart, orders)
- **`(dashboard)`**: Dashboard utente (protetto, richiede auth)
- **`(admin)`**: Pannello admin (protetto, richiede ruolo admin)

#### Dynamic Routes

- **`[id]`**: Parametri dinamici (es. `/products/[id]`)
- **`[slug]`**: Slug per URL SEO-friendly (es. `/blog/[slug]`)
- **`[...catchAll]`**: Catch-all routes

#### Special Files

- **`layout.tsx`**: Layout condiviso (si mantiene tra navigazioni)
- **`page.tsx`**: Componente della pagina
- **`loading.tsx`**: UI di loading (React Suspense)
- **`error.tsx`**: UI di errore (Error Boundary)
- **`not-found.tsx`**: Pagina 404
- **`template.tsx`**: Template che si remonta ad ogni navigazione
- **`global-error.tsx`**: Error boundary globale
- **`sitemap.ts`**: Sitemap dinamica per SEO

#### API Routes

- **Versioning**: `/api/v1/` per gestire versioni API
- **RESTful**: Seguire convenzioni REST
- **Rate Limiting**: Implementare rate limiting
- **Validation**: Validare input con Zod
- **Error Handling**: Gestione errori consistente

### 2. **Colocation (Raccomandato)**

Per feature complesse, colloca tutto insieme:

```
app/
└── products/
    ├── [id]/
    │   ├── page.tsx
    │   ├── loading.tsx
    │   ├── error.tsx
    │   └── _components/              # Componenti specifici per questa route
    │       ├── product-gallery.tsx
    │       └── product-info.tsx
    ├── _components/                   # Componenti condivisi tra route products
    │   ├── product-filters.tsx
    │   └── product-grid.tsx
    └── _lib/                          # Utilities specifiche per products
        └── product-utils.ts
```

### 3. **Componenti**

#### Organizzazione

- **`components/ui/`**: Componenti UI base riutilizzabili (shadcn/ui style)
- **`components/features/`**: Componenti specifici per feature (products, cart, etc.)
- **`components/layout/`**: Componenti di layout globale (header, footer, sidebar)
- **`components/shared/`**: Componenti condivisi tra feature (loading, error, SEO)
- **`components/providers/`**: Context providers

#### Server vs Client Components

- **Server Components** (default): Per data fetching, SEO, performance
- **Client Components** (`'use client'`): Per interattività, hooks, browser APIs

### 4. **Database e ORM**

#### Prisma (Raccomandato)

```
lib/db/
├── index.ts                          # PrismaClient instance
├── schema/
│   ├── user.ts                       # User model
│   ├── product.ts                    # Product model
│   └── order.ts                      # Order model
└── migrations/                       # Auto-generated migrations
```

#### Drizzle (Alternativa)

```
lib/db/
├── index.ts                          # Drizzle instance
├── schema/
│   └── tables.ts                     # Table definitions
└── migrations/                       # Manual migrations
```

### 5. **Autenticazione**

#### NextAuth.js (Raccomandato)

```
lib/auth/
├── config.ts                         # NextAuth configuration
├── providers.ts                      # OAuth providers (Google, GitHub, etc.)
├── middleware.ts                     # Auth middleware
└── session.ts                        # Session utilities
```

#### Features

- JWT o database sessions
- OAuth providers (Google, GitHub, etc.)
- Email/password authentication
- Role-based access control (RBAC)
- Protected routes con middleware

### 6. **Validazione**

#### Zod Schemas

```
lib/validations/
├── auth.ts                           # Auth validation schemas
├── product.ts                        # Product validation
├── order.ts                          # Order validation
└── common.ts                         # Common validations
```

#### Uso

- Validazione input API
- Form validation
- Type inference da schemi Zod

### 7. **Internationalization (i18n)**

#### next-intl

```
lib/i18n/
├── config.ts                         # i18n configuration
├── messages/
│   ├── en.json                       # English translations
│   ├── it.json                       # Italian translations
│   └── es.json                       # Spanish translations
└── server.ts                         # Server-side i18n utilities
```

#### Routing

- `app/[locale]/` per route localizzate
- Middleware per rilevamento lingua
- SEO-friendly URLs

### 8. **Testing**

#### Unit Tests (Vitest)

```
tests/unit/
├── lib/
│   └── utils.test.ts
└── components/
    └── button.test.tsx
```

#### Integration Tests

```
tests/integration/
└── api/
    └── products.test.ts
```

#### E2E Tests (Playwright)

```
tests/e2e/
├── auth.spec.ts
├── products.spec.ts
└── cart.spec.ts
```

### 9. **State Management**

#### Zustand (Raccomandato per semplicità)

```
store/
├── cart-store.ts
├── auth-store.ts
└── ui-store.ts
```

#### React Query (TanStack Query)

- Per server state
- Caching e synchronization
- Optimistic updates

### 10. **Server Actions e Queries**

#### Server Actions

```
server/actions/
├── product-actions.ts                # Mutations (create, update, delete)
├── cart-actions.ts
└── order-actions.ts
```

#### Server Queries

```
server/queries/
├── product-queries.ts                # Data fetching
├── order-queries.ts
└── user-queries.ts
```

### 11. **Monitoring e Analytics**

#### Error Tracking (Sentry)

```
lib/monitoring/
├── sentry.ts                         # Sentry configuration
└── error-handling.ts
```

#### Analytics

- Google Analytics
- Vercel Analytics
- Custom analytics

### 12. **Convenzioni di Naming**

- **File componenti**: `kebab-case.tsx` (es. `product-card.tsx`)
- **File route**: `page.tsx`, `layout.tsx`, `loading.tsx`
- **File API**: `route.ts`
- **File utility**: `camelCase.ts` (es. `formatPrice.ts`)
- **File types**: `kebab-case.ts` (es. `product-types.ts`)
- **File hooks**: `use-kebab-case.ts` (es. `use-product-list.ts`)
- **File stores**: `kebab-case-store.ts` (es. `cart-store.ts`)

## Best Practice Specifiche

### ✅ DO

#### Architettura

- Usa Route Groups per organizzare senza cambiare URL
- Colloca componenti vicino alle route che li usano
- Organizza per feature quando il progetto cresce
- Separa Server e Client Components chiaramente
- Usa Server Components di default, Client Components solo quando necessario

#### Performance

- Usa `loading.tsx` per Suspense boundaries
- Implementa streaming e progressive rendering
- Usa React Server Components per ridurre bundle size
- Implementa caching appropriato (Next.js cache, React Query)
- Ottimizza immagini con `next/image`

#### Error Handling

- Usa `error.tsx` per error boundaries
- Implementa error logging (Sentry)
- Fornisci feedback utente chiaro
- Gestisci errori API in modo consistente

#### Security

- Valida sempre input con Zod
- Usa middleware per proteggere route
- Implementa rate limiting
- Sanitizza output per prevenire XSS
- Usa HTTPS in produzione
- Gestisci secrets con variabili d'ambiente

#### Code Quality

- Separa la logica di business dai componenti
- Usa TypeScript strict mode
- Scrivi test per logica critica
- Usa ESLint e Prettier
- Documenta API e componenti complessi

#### Database

- Usa migrations per versionare schema
- Implementa connection pooling
- Usa transactions per operazioni multiple
- Indexa query frequenti
- Usa prepared statements

#### API Design

- Versiona API (`/api/v1/`)
- Usa RESTful conventions
- Documenta API (OpenAPI/Swagger)
- Implementa rate limiting
- Gestisci errori HTTP appropriati

### ❌ DON'T

#### Architettura

- Non mettere tutto in una singola cartella `components/`
- Non mescolare Server e Client Components senza necessità
- Non creare route annidate troppo profonde (max 3-4 livelli)
- Non duplicare codice tra route simili
- Non mettere logica di business nei componenti

#### Performance

- Non fare data fetching in Client Components quando possibile
- Non caricare bundle non necessari
- Non fare over-fetching di dati
- Non ignorare caching opportunities

#### Security

- Non esporre secrets nel client
- Non fidarti di input utente
- Non fare SQL injection (usa ORM/query builder)
- Non esporre informazioni sensibili in errori

#### Code Quality

- Non ignorare TypeScript errors
- Non committare codice non testato in produzione
- Non duplicare logica
- Non creare componenti troppo grandi (>300 righe)

## Esempio Completo: Feature "Products"

### Struttura Completa

```
app/
└── [locale]/
    └── (shop)/
        └── products/
            ├── [id]/
            │   ├── page.tsx                    # Server Component
            │   ├── loading.tsx
            │   ├── error.tsx
            │   └── _components/
            │       ├── product-gallery.tsx     # Client Component
            │       ├── product-info.tsx        # Server Component
            │       └── add-to-cart-button.tsx  # Client Component
            ├── category/
            │   └── [category]/
            │       └── page.tsx
            ├── page.tsx
            ├── loading.tsx
            └── _components/
                ├── product-filters.tsx
                └── product-grid.tsx

components/
└── features/
    └── products/
        ├── product-list.tsx
        ├── product-card.tsx
        ├── product-details.tsx
        ├── product-reviews.tsx
        └── product-search.tsx

lib/
├── api/
│   └── products.ts                           # API client
├── db/
│   └── schema/
│       └── product.ts                        # Database schema
├── services/
│   └── product-service.ts                    # Business logic
├── validations/
│   └── product.ts                            # Zod schemas
└── types/
    └── product.ts                            # TypeScript types

server/
├── actions/
│   └── product-actions.ts                    # Server Actions
└── queries/
    └── product-queries.ts                    # Server Queries

hooks/
└── api/
    └── use-products.ts                       # React Query hooks

store/
└── product-store.ts                          # Zustand store (se necessario)
```

### Esempio di File

#### `app/[locale]/(shop)/products/[id]/page.tsx`

```typescript
import { getProduct } from "@/server/queries/product-queries";
import { ProductGallery } from "./_components/product-gallery";
import { ProductInfo } from "./_components/product-info";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
}
```

#### `lib/services/product-service.ts`

```typescript
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";

export class ProductService {
  async getProduct(id: string) {
    return db.product.findUnique({ where: { id } });
  }

  async createProduct(data: unknown) {
    const validated = productSchema.parse(data);
    return db.product.create({ data: validated });
  }
}
```

## Configurazioni Avanzate

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/app/*": ["./app/*"],
      "@/server/*": ["./server/*"],
      "@/store/*": ["./store/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  }
}
```

### Environment Variables (.env.example)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# API Keys
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
SENDGRID_API_KEY=""

# Storage
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""

# Monitoring
SENTRY_DSN=""
NEXT_PUBLIC_GA_ID=""

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_PWA="false"
```

### Middleware (middleware.ts)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Auth check
  const session = await auth();
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Rate limiting
  // CORS
  // i18n routing

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

### Next.js Config (next.config.ts)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images
  images: {
    domains: ["example.com"],
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

## CI/CD e Deployment

### GitHub Actions (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### Docker (docker/Dockerfile)

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Monitoring e Observability

### Sentry Setup

```typescript
// lib/monitoring/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Logging

```typescript
// lib/utils/logger.ts
import { logger } from "@/lib/utils/logger";

// Server-side
logger.info("User logged in", { userId: user.id });
logger.error("Failed to fetch product", { error, productId });

// Client-side
logger.warn("Cart is empty");
```

## Testing Strategy

### Unit Tests

- Test utilities e helper functions
- Test componenti isolati
- Test hooks custom

### Integration Tests

- Test API routes
- Test Server Actions
- Test database queries

### E2E Tests

- Test flussi utente completi
- Test autenticazione
- Test checkout flow
- Test responsive design

## Performance Optimization

### Caching Strategy

- **Next.js Cache**: Per data fetching
- **React Query**: Per client-side caching
- **Redis**: Per session e cache distribuita
- **CDN**: Per assets statici

### Code Splitting

- Dynamic imports per componenti pesanti
- Route-based code splitting automatico
- Lazy loading per immagini

### SEO

- Metadata API per SEO
- Structured data (JSON-LD)
- Sitemap dinamica
- robots.txt
- Open Graph tags

## Checklist di Implementazione

### Setup Iniziale

- [ ] Configurare TypeScript con path aliases
- [ ] Configurare ESLint e Prettier
- [ ] Setup Tailwind CSS
- [ ] Configurare environment variables (.env.example)
- [ ] Setup Git e .gitignore

### Database

- [ ] Scegliere ORM (Prisma o Drizzle)
- [ ] Configurare connessione database
- [ ] Creare schema iniziale
- [ ] Setup migrations
- [ ] Creare seed data

### Autenticazione

- [ ] Installare NextAuth.js
- [ ] Configurare providers (email, OAuth)
- [ ] Implementare middleware auth
- [ ] Creare route protette
- [ ] Implementare RBAC (se necessario)

### Struttura Base

- [ ] Creare cartelle principali (components, lib, hooks, store)
- [ ] Organizzare route groups in `app/`
- [ ] Creare layout root
- [ ] Implementare error boundaries
- [ ] Setup loading states

### Componenti UI

- [ ] Setup componenti base (Button, Input, Card, etc.)
- [ ] Creare componenti layout (Header, Footer)
- [ ] Implementare componenti feature-specific
- [ ] Setup theme provider

### API e Server

- [ ] Creare struttura API routes
- [ ] Implementare Server Actions
- [ ] Creare Server Queries
- [ ] Setup API client
- [ ] Implementare validazione (Zod)

### Testing

- [ ] Setup Vitest o Jest
- [ ] Setup Playwright per E2E
- [ ] Creare test utilities
- [ ] Scrivere test per logica critica

### CI/CD

- [ ] Configurare GitHub Actions
- [ ] Setup Docker (opzionale)
- [ ] Configurare deployment pipeline

### Monitoring

- [ ] Setup Sentry (opzionale)
- [ ] Configurare analytics
- [ ] Implementare logging

### Performance

- [ ] Ottimizzare immagini
- [ ] Implementare caching
- [ ] Setup code splitting
- [ ] Ottimizzare bundle size

## Stack Tecnologico Consigliato

### Core

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui o Radix UI

### Database

- **ORM**: Prisma o Drizzle
- **Database**: PostgreSQL (consigliato) o MySQL

### Autenticazione

- **Library**: NextAuth.js (Auth.js)

### State Management

- **Server State**: TanStack Query (React Query)
- **Client State**: Zustand o Jotai

### Validazione

- **Schema Validation**: Zod

### Testing

- **Unit/Integration**: Vitest
- **E2E**: Playwright
- **Component Testing**: Testing Library

### Internationalization

- **Library**: next-intl

### Monitoring

- **Error Tracking**: Sentry
- **Analytics**: Vercel Analytics o Google Analytics

### Deployment

- **Platform**: Vercel (consigliato) o self-hosted
- **Container**: Docker (opzionale)

## Riepilogo

Questa architettura fornisce:

✅ **Scalabilità**: Struttura modulare che cresce con il progetto  
✅ **Manutenibilità**: Separazione chiara delle responsabilità  
✅ **Performance**: Ottimizzazioni Next.js e best practice  
✅ **Security**: Autenticazione, validazione, rate limiting  
✅ **Developer Experience**: TypeScript, testing, tooling  
✅ **Production Ready**: CI/CD, monitoring, error tracking

### Prossimi Passi

1. Inizia con la struttura base (app, components, lib)
2. Implementa autenticazione se necessaria
3. Setup database e ORM
4. Crea le prime feature
5. Aggiungi testing man mano che cresci
6. Implementa monitoring in produzione

### Risorse Utili

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)

---

**Nota**: Questa architettura è pensata per progetti enterprise. Per progetti più piccoli, puoi semplificare rimuovendo alcune parti (es. i18n, admin panel, etc.) e adattarla alle tue esigenze.
