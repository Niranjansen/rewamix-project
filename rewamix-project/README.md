# Rewamix — MERN Stack Sweets & Namkeen Shop (Split Architecture)

One **backend** serves two **frontends**, all sharing one MongoDB database:

```
rewamix-project/
  backend/          -> ONE API (customer + admin)  (Node/Express) -> port 5000
  frontend/         -> Customer website            (React/Vite)   -> port 5173
  admin/frontend/   -> Admin panel website         (React/Vite)   -> port 5174
```

- Customer API: `/api/auth`, `/api/products`, `/api/orders`
- Admin API (admin login required): `/api/admin/*`
- **Deploying?** See [DEPLOY.md](DEPLOY.md) (Render + MongoDB Atlas) or use `render.yaml`.

## Features

**Customer site** — Home, Products (filter + search), Product detail, About,
Contact, Login/Signup, Cart with qty +/-, Checkout, Order confirmation, My
Orders, and the standard e-commerce policy pages required for payment-gateway
compliance: Privacy Policy, Terms & Conditions, Refund & Cancellation Policy,
and Shipping & Delivery Policy (linked from the footer).

**Admin panel** — Dashboard (stats), Products (add/edit/delete), Orders
(view + update status), Print/Download Invoice for any order.

**Design** — Festive maroon + gold theme with a layered "3D" look (raised
buttons, depth shadows, gentle hover tilt on cards) and fully responsive
across laptop, iPad/tablet, and mobile.

## 1. Prerequisites

- Node.js (v18+)
- MongoDB running locally, or a free MongoDB Atlas cluster

## 2. Run locally

```bash
cd backend && cp .env.example .env && npm install && npm run dev   # http://localhost:5000
cd frontend && npm install && npm run dev                          # http://localhost:5173
cd admin/frontend && npm install && npm run dev                    # http://localhost:5174
```

Set `MONGO_URI` in `backend/.env`. On first start the admin account is created
automatically from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. (Optional demo data:
`npm run seed` in `backend/` — this **wipes** the database.)

## 3. Production

Full step-by-step guide: [DEPLOY.md](DEPLOY.md).

## Notes

- Passwords are hashed with bcrypt; JWTs expire in 30 days. `/api/admin/*` checks
  `isAdmin` from the database on every request.
- Cart state lives in the browser (localStorage) until checkout.
- No external payment gateway is wired up (Cash on Delivery) — `paymentMethod`
  is stored per order so you can add one later.
- The admin invoice page uses the browser's print dialog (Save-as-PDF works).
