# Dharmik Foods storefront

Independent Next.js customer application: catalog and search, product galleries, saved products, cart, Google account integration, delivery PIN checks, unpaid billing, order history, newsletter and brand pages.

## Run locally

Requires Node.js 20.9+ and npm. Run these commands in this repository:

```powershell
npm ci
Copy-Item .env.local.example .env.local
npm run dev
```

Open http://localhost:3000. Set `API_URL` in `.env.local` to the running backend URL (default `http://localhost:8000`). This is a server-side setting; no warehouse access key belongs in this app. Google sign-in requires OAuth credentials in the backend and a matching redirect URI. Without those credentials, catalog and guest carts still work.

```powershell
npm run build
npm start
```

Use HTTPS for production: customer and cart cookies are secure in production. Set the backend Google redirect URI to `https://YOUR-STORE/api/auth/google/callback` and allow your deployed storefront origin in backend `CORS_ORIGINS`. The backend must be reachable from the Next.js server.

## Repository boundaries

All source code, fonts (npm dependencies), image assets, CSS and TypeScript models needed to build this app belong to this repository. `src/shared` contains modules reused **within this app**; it does not import another repository. Models are currently copied between the independently versioned frontends, so coordinate changes to API contracts.

Companion services:

- [Backend](https://github.com/Divakar127/dharmik-foods-backend)
- [Warehouse](https://github.com/Divakar127/dharmik-foods-warehouse)

They communicate through HTTP APIs. You do not need either companion repository's files to install or build this app. A running backend is required for live commerce data and actions.

## Images and current scope

`public` includes representative catalog photographs and illustrative campaign images. `/image-credits` and `src/shared/photo-manifest.json` document sources and licenses. These are demo ingredients and AI campaign scenes, not verified supplier pack photographs. The six panoramic campaigns are 1500 × 536px; upload matching proportions through warehouse to avoid cropping. Card photos fill their frames.

Google authentication needs real credentials. Payments, phone verification, stock reservation and dispatch are not implemented. Billing prepares unpaid orders; it does not simulate a payment. Do not commit `.env.local`, secrets or customer data. GitHub Actions builds the app without private configuration.
