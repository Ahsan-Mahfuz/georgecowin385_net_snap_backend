import config from "../config";
import { User } from "../modules/user/user.model";
import { TRole, TPortal } from "./enum";

// Accounts seeded on a fresh database so every role can be logged into out of
// the box. All share the same password (config.demo_password, default "cowshed").
// No other demo data is seeded — deals, talent, overheads, etc. are created in-app.
const SEED_ACCOUNTS: { name: string; email: string; role: TRole; portal: TPortal }[] = [
  // Creators portal — one account per role
  { name: "Admin", email: "admin@cowshed.test", role: "admin", portal: "creators" },
  { name: "Finance", email: "finance@cowshed.test", role: "finance", portal: "creators" },
  { name: "Operations", email: "operations@cowshed.test", role: "operations", portal: "creators" },
  { name: "Production", email: "production@cowshed.test", role: "production", portal: "creators" },
  { name: "Manager", email: "manager@cowshed.test", role: "manager", portal: "creators" },

  // Collective (Sales CRM) portal
  { name: "Collective Admin", email: "admin@cowshedcollective.test", role: "admin", portal: "collective" },
  { name: "Collective Sales", email: "sales@cowshedcollective.test", role: "manager", portal: "collective" },
];

export const seedDatabase = async () => {
  try {
    const password = config.demo_password || "cowshed";

    for (const account of SEED_ACCOUNTS) {
      const email = account.email.toLowerCase();
      const existing = await User.findOne({ email });

      if (!existing) {
        // Override the super-admin's password with the configured admin password.
        const pwd =
          account.email === "admin@cowshed.test"
            ? config.admin_password || password
            : password;
        await User.create({
          name: account.name,
          email,
          password: pwd,
          role: account.role,
          portal: account.portal,
          status: "active",
        });
        console.log(`  • seeded ${account.role} (${account.portal}): ${email}`);
      } else if (existing.status !== "active") {
        existing.status = "active";
        await existing.save();
        console.log(`  • re-activated: ${email}`);
      }
    }

    console.log("✅ Seeding complete (one active account per role)");
  } catch (err) {
    console.log("⚠️  Seeding failed:", err);
  }
};
