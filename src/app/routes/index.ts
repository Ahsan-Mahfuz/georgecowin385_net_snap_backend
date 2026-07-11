import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { DealRoutes } from "../modules/deal/deal.routes";
import { CollectiveDealRoutes } from "../modules/collectiveDeal/collectiveDeal.routes";
import { OverheadRoutes } from "../modules/overhead/overhead.routes";
import { TalentRoutes } from "../modules/talent/talent.routes";
import { EmailLeadRoutes } from "../modules/emailLead/emailLead.routes";
import { ExpenseRoutes } from "../modules/expense/expense.routes";
import { SettingsRoutes } from "../modules/settings/settings.routes";
import { ApprovalRoutes } from "../modules/approval/approval.routes";
import { ProductionRequestRoutes } from "../modules/productionRequest/productionRequest.routes";
import { auth } from "../middleware/auth";
import catchAsync from "../utilities/catchAsync";
import sendResponse from "../utilities/sendResponse";
import { isXeroConfigured } from "../helper/xero";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/deal", route: DealRoutes },
  { path: "/collective-deal", route: CollectiveDealRoutes },
  { path: "/overhead", route: OverheadRoutes },
  { path: "/talent", route: TalentRoutes },
  { path: "/email-lead", route: EmailLeadRoutes },
  { path: "/expense", route: ExpenseRoutes },
  { path: "/settings", route: SettingsRoutes },
  { path: "/approval", route: ApprovalRoutes },
  { path: "/production-request", route: ProductionRequestRoutes },
];

// Lightweight status endpoint so the UI can tell if real Xero is connected.
router.get(
  "/xero/status",
  auth(),
  catchAsync(async (_req, res) => {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Xero status",
      data: { connected: isXeroConfigured() },
    });
  }),
);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
