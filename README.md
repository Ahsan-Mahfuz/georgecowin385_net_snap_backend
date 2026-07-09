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

Response envelope: `{ success, statusCode, message, token?, meta?, data }`.

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
