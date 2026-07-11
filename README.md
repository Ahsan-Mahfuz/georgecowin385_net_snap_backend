# Cowshed Backend

Express 4 + TypeScript + Mongoose 8 API for the Cowshed Portal, structured like the
`../template` boilerplate (modular `module.{interface,model,validation,controller,service,routes}.ts`).

## Run

```bash
npm install
npm run dev      # ts-node-dev, http://localhost:5000
# or
npm run build && npm start
```

On boot it connects to MongoDB (`DATABASE_URL` in `.env`) and seeds demo users +
sample deals if the DB is empty. Every seeded account uses password **`cowshed`**.

## Auth model

New signups are created with `status: "pending"` and **cannot log in** until an
admin (or operations) approves them via `PATCH /user/:id/approve`. Statuses:
`pending → active → disabled`.

## Endpoints (`/api/v1`)

| Method | Path | Access | Purpose |
|--------|------|--------|---------|
| POST | `/auth/signup` | public | create account (pending) |
| POST | `/auth/login` | public | returns `{ token, data: user }` |
| GET | `/auth/me` | any logged-in | current user |
| POST | `/auth/change-password` | any logged-in | change password |
| GET | `/user` | admin/operations | list users (`?portal&status&role&searchTerm&page&limit`) |
| PATCH | `/user/:id/approve` | admin/operations | approve + assign role |
| PATCH | `/user/:id/reject` | admin/operations | delete the request |
| PATCH | `/user/:id/status` | admin/operations | enable/disable |
| PATCH | `/user/:id/role` | admin/operations | change role |
| GET/POST | `/deal` | any logged-in | Creators deals (list/create) |
| GET/PATCH/DELETE | `/deal/:id` | any logged-in | one deal |
| GET/POST | `/collective-deal` | any logged-in | Collective deals |
| GET/PATCH/DELETE | `/collective-deal/:id` | any logged-in | one collective deal |
| GET/POST/PATCH/DELETE | `/overhead` `/talent` `/email-lead` `/expense` | logged-in (writes vary) | domain data |
| GET/PATCH | `/settings` | get: any / patch: admin | targets, salaries, commission %, production rates |
| GET/POST | `/approval` | any logged-in | submit-for-approval + list |
| PATCH | `/approval/:id/approve` · `/reject` | admin/operations | resolve approvals |
| POST | `/deal/:id/xero-invoice` · `/mark-invoiced` · `/mark-paid` | admin/finance/ops | Xero invoicing on a deal |
| POST | `/deal/:id/send-remittance` · `/mark-talent-paid` | admin/finance/ops | talent remittance on a paid deal |
| POST | `/collective-deal/:id/xero-invoice` · `/mark-invoiced` · `/mark-paid` | any logged-in | Xero invoicing on a collective deal |
| GET/POST | `/production-request` | any logged-in | submit + list production requests |
| PATCH/DELETE | `/production-request/:id` | admin/ops/production | schedule/complete/reject a request |
| GET | `/xero/status` | any logged-in | `{ connected }` — is real Xero configured |

Response envelope: `{ success, statusCode, message, token?, meta?, data }`.

## Xero integration

Uses a **Custom Connection** (OAuth2 client-credentials — backend-only, no browser
redirect). Without credentials it returns a deterministic **simulated draft** so the
invoicing flow works out of the box. To go live, create a Custom Connection app at
https://developer.xero.com, connect it to your organisation, and set in `.env`:

```
XERO_CLIENT_ID=...
XERO_CLIENT_SECRET=...
XERO_TENANT_ID=...        # the connected organisation's tenant id
XERO_ACCOUNT_CODE=200     # revenue account code for invoice line items
```

`GET /xero/status` reports `connected: true` once these are set; invoice calls then
hit the real Xero Accounting API (`POST /Invoices`, ACCREC draft).

## Structure

```
src/
  server.ts            # mongoose.connect → seed → listen
  app.ts               # express, cors, /api/v1 router, error handlers
  app/
    config/            # env
    builder/           # QueryBuilder (search/filter/sort/paginate)
    error/             # AppError
    middleware/        # auth(...roles), validateRequest, error, notFound
    utilities/         # catchAsync, sendResponse, enum, seed
    modules/
      auth/  user/  deal/  collectiveDeal/
    routes/            # moduleRoutes registry
```

Frontend talks to this via RTK Query — see `frontend/redux/api/*`. Set the frontend
env `NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`.
