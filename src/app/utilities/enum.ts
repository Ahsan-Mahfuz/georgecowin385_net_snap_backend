// Domain enums for the Cowshed portal. Roles + portals + account status are the
// backbone of the whole auth/RBAC system, mirrored on the frontend.

export const ROLES = ["admin", "finance", "operations", "production", "manager"] as const;
export type TRole = (typeof ROLES)[number];

export const PORTALS = ["creators", "collective"] as const;
export type TPortal = (typeof PORTALS)[number];

export const ACCOUNT_STATUSES = ["pending", "active", "disabled"] as const;
export type TAccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const DEAL_STATUSES = ["Confirmed", "Pipeline"] as const;
export type TDealStatus = (typeof DEAL_STATUSES)[number];

// Production request lifecycle: manager submits → production team schedules/completes.
export const PRODUCTION_REQUEST_STATUSES = [
  "pending",
  "scheduled",
  "completed",
  "rejected",
] as const;
export type TProductionRequestStatus = (typeof PRODUCTION_REQUEST_STATUSES)[number];

// Roles allowed to administer users (approve / block / change roles).
export const ADMIN_ROLES: TRole[] = ["admin", "operations"];
