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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
