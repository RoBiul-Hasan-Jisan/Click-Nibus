# ClickNibus Backend (Express + MongoDB + Firebase Auth)

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `MONGODB_URI` — your MongoDB connection string (Atlas or local)
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` — from
     Firebase Console → Project Settings → Service Accounts → Generate new private key
   - `STRIPE_SECRET_KEY` — your Stripe **test** secret key (starts with `sk_test_`).
     Test mode never charges real money, so it's safe to use while learning.
3. Start the API: `npm run dev` (http://localhost:5000)
   - On startup the server automatically seeds the catalog (if empty) and the
     two demo accounts below — no separate seed command needed.
   - Admin: `admin@clicknibus.com` / `Admin@12345`
   - User: `user@clicknibus.com` / `User@12345`
   - You can override these in `.env` before starting the server.
   - This auto-seed is safe to run every time (it skips the catalog if
     products already exist, and get-or-creates the demo users). Set
     `AUTO_SEED=false` in `.env` to turn it off entirely.

### Manual seeding (optional)

You don't need these for normal use — they're only for special cases like
wiping and resetting the catalog on purpose:

- `npm run seed` — force-wipes and reseeds categories/brands/products
- `npm run seed:users` — re-runs just the demo user creation

## How auth works

- The frontend signs in with the Firebase client SDK and gets an ID token.
- Every protected request sends `Authorization: Bearer <idToken>`.
- `src/middleware/auth.js` verifies the token with `firebase-admin`, then looks up
  (or auto-creates) a matching `User` document in MongoDB, which is where the
  `role` (`admin` | `user`) lives.
- `src/middleware/admin.js` blocks any route to non-admins.

## API overview

- `GET  /api/auth/me` — current user profile + role
- `GET  /api/products`, `GET /api/products/:slug`
- `POST/PUT/DELETE /api/products` — admin only
- `GET  /api/categories`, `GET /api/brands` (+ admin-only create/update/delete)
- `POST /api/checkout/create-session` — creates a Stripe Checkout session (test mode)
- `POST /api/orders` — save an order after checkout
- `GET  /api/orders/mine` — the logged-in user's orders
- `GET  /api/orders` — admin: all orders
- `PATCH /api/orders/:id/status` — admin: update order status
