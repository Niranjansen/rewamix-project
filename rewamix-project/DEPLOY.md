# Render pe deploy kaise karein (MongoDB Atlas ke saath)

Ab project me **sirf 1 backend** hai (`backend/`) jo customer site aur admin panel
dono ko serve karta hai:

| Kaam | Route |
|---|---|
| Customer (login, products, orders) | `/api/auth`, `/api/products`, `/api/orders` |
| Admin (sirf admin login ke baad) | `/api/admin/auth`, `/api/admin/products`, `/api/admin/orders`, `/api/admin/users` |

Render pe 3 services banengi: **rewamix-api** (backend), **rewamix-store** (user frontend),
**rewamix-admin** (admin frontend).

---

## Step 1 — MongoDB Atlas (free) setup

1. https://www.mongodb.com/cloud/atlas → Sign up → **Create a free (M0) cluster**
   (region: Mumbai `ap-south-1` best rahega).
2. **Database Access** → *Add New Database User* → username + password banao
   (password me `@ : / ?` jaise special characters mat rakho, warna URL me problem hoti hai).
   Role: *Read and write to any database*.
3. **Network Access** → *Add IP Address* → **Allow access from anywhere (0.0.0.0/0)**
   (Render ka IP fixed nahi hota, isliye ye zaroori hai).
4. **Database → Connect → Drivers** → connection string copy karo. Aisi dikhegi:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   **Database name zaroor add karo** (`.net/` ke baad):
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/rewamix_store?retryWrites=true&w=majority
   ```
   Yehi aapka `MONGO_URI` hai.

## Step 2 — Code GitHub pe daalo

```bash
cd rewamix-project
git init
git add .
git commit -m "Rewamix"
git remote add origin https://github.com/<your-username>/rewamix.git
git push -u origin main
```
`.env` files `.gitignore` me hain, isliye secrets GitHub pe nahi jayenge.

## Step 3 — Render pe backend deploy

Render Dashboard → **New → Web Service** → repo select karo:

- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Health Check Path:** `/api/health`

**Environment Variables:**

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGO_URI` | Step 1 wali Atlas string |
| `JWT_SECRET` | lamba random string (`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) |
| `ADMIN_EMAIL` | aapka admin email |
| `ADMIN_PASSWORD` | strong password |
| `ALLOWED_ORIGINS` | *abhi khali chhodo, Step 5 me bharenge* |

Deploy hone ke baad URL milega, jaise `https://rewamix-api.onrender.com`.
Browser me kholo: `https://rewamix-api.onrender.com/api/health` → `{"status":"ok"}` aana chahiye.
Pehli baar server start hote hi **admin account apne aap ban jayega** (`ADMIN_EMAIL` / `ADMIN_PASSWORD` se).

## Step 4 — Dono frontend deploy (Static Site)

**User frontend:** New → **Static Site**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Env var: `VITE_API_URL` = `https://rewamix-api.onrender.com/api`
- **Redirects/Rewrites** tab: Source `/*` → Destination `/index.html` → Action **Rewrite**

**Admin frontend:** New → **Static Site**
- Root Directory: `admin/frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Env var: `VITE_API_URL` = `https://rewamix-api.onrender.com/api/admin`
- Rewrite rule: `/*` → `/index.html`

(Apni asli backend URL daalna. Rewrite rule bina refresh karne par 404 aayega.)

> Shortcut: repo me `render.yaml` hai. **New → Blueprint** se teeno services ek saath
> ban jati hain; bas `MONGO_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` aur teen URL wale
> variables dashboard me bharne padte hain.

## Step 5 — CORS set karo

Dono frontend ke URL mil jayein, phir backend service ke env me:

```
ALLOWED_ORIGINS=https://rewamix-store.onrender.com,https://rewamix-admin.onrender.com
```
(end me `/` mat lagana.) Save karte hi backend redeploy ho jayega.

## Step 6 — Test

- User site kholo → signup/login → product → order.
- Admin site kholo → `ADMIN_EMAIL` / `ADMIN_PASSWORD` se login → order dikhega.

## Products kaise daalein?

Admin panel → Products → Add. (Sample data ke liye `npm run seed` hai, **lekin wo poora
database delete kar deta hai** — production me kabhi mat chalana.)

## Dhyan rakhne wali baatein

- Render **free plan** pe backend 15 min inactivity ke baad sleep ho jata hai; pehla
  request 30-60 sec le sakta hai.
- `ADMIN_PASSWORD` baad me env me badalne se password nahi badalta (sirf pehli baar account
  banane ke liye use hota hai).
- Local run: `backend` → `npm run dev` (port 5000), `frontend` → `npm run dev` (5173),
  `admin/frontend` → `npm run dev` (5174).
