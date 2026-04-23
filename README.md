# Webstore — Angular / Bootstrap

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://webstore.icreated.co)
[![License: GPL](https://img.shields.io/badge/license-GPL-blue)](LICENSE)

A responsive Angular e-commerce frontend built for [Idempiere ERP](https://github.com/icreated/webstore-api). Uses an OpenAPI-first approach, so any compatible REST backend can be plugged in by regenerating the API client from `openapi.yaml`.

**Live demo:** [https://webstore.icreated.co](https://webstore.icreated.co)

![Architecture](https://icreated.co/assets/images/projects/webstore/screenshot_architecture.png)

## Features

- Product catalog browsable by category, with full-text search and grid/list view toggle
- JWT authentication (login, signup)
- Cart with localStorage persistence and server sync
- 5-step checkout wizard
- Customer area: order history, order detail with void and PDF download, address management, account info, password update

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, zoneless) |
| UI | Bootstrap 5 + ngx-bootstrap |
| State | Angular signals |
| Auth | JWT via `@auth0/angular-jwt` |
| API client | Auto-generated from `openapi.yaml` via `ng-openapi-gen` |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start a backend

**Option A — Idempiere** (primary backend)

Full ERP backend via the [webstore-api](https://github.com/icreated/webstore-api) REST plugin.
Requires PostgreSQL + Idempiere + the plugin installed and configured. Runs on `http://localhost:8080`.

**Option B — JSON mock server** (for demo / development without Idempiere)

```bash
# clone and start https://github.com/icreated/webstore-json-server
# runs on http://localhost:3000
```

### 3. Configure the backend URL

Edit `src/environments/environment.ts`:

```typescript
api: {
  // baseUrl: 'http://localhost:8080/services/api'  // Idempiere (primary)
  baseUrl: 'http://localhost:3000'                  // JSON mock server
}
```

### 4. Run

```bash
npm start   # dev server at http://localhost:4200
```

## Commands

| Command | Description |
|---|---|
| `npm start` | Dev server with live reload |
| `npm run build` | Production build |
| `npm test` | Unit tests (Karma / Jasmine) |
| `npm run lint` | ESLint |
| `npm run ng-openapi-gen` | Regenerate API client from `openapi.yaml` |

## Project structure

```
src/app/
├── api/          # Auto-generated — do not edit manually
├── core/         # Auth, interceptors, guards, cart, checkout, alert services
├── modules/      # Lazy-loaded pages (home, catalog, cart, checkout, account, signup)
└── shared/       # Reusable components, pipes, validators
```

Path aliases: `@core/*`, `@shared/*`, `@api/*`, `@env/*`

## Regenerating the API client

After modifying `openapi.yaml`:

```bash
npm run ng-openapi-gen
```

All files under `src/app/api/` are regenerated — never edit them directly.

## Screenshots

| Home | Cart | Checkout | Order |
|---|---|---|---|
| ![Home](https://icreated.co/assets/images/projects/webstore/screenshot_home.png) | ![Cart](https://icreated.co/assets/images/projects/webstore/screenshot_basket.png) | ![Checkout](https://icreated.co/assets/images/projects/webstore/screenshot_checkout.png) | ![Order](https://icreated.co/assets/images/projects/webstore/screenshot_order.png) |

## Contributing

Fork the repo and open a pull request from a feature branch.

## License

[GNU General Public License](LICENSE)
