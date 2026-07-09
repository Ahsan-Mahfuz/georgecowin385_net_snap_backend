import config from "../config";
import { User } from "../modules/user/user.model";

// Bootstrap the single super-admin account so the app can be logged into on a
// fresh database. NO demo/sample data is seeded — every other account and every
// deal, talent, overhead, etc. is created through the app by real users.
export const seedDatabase = async () => {
  try {
    const email = (config.admin_email || "admin@cowshed.test").toLowerCase();
    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({
        name: "Admin",
        email,
        password: config.admin_password || "cowshed",
        role: "admin",
        portal: "creators",
        status: "active",
      });
      console.log(`  • seeded bootstrap admin: ${email}`);
    } else if (existing.status !== "active" || existing.role !== "admin") {
      existing.status = "active";
      existing.role = "admin";
      await existing.save();
      console.log(`  • ensured bootstrap admin is active: ${email}`);
    }
    console.log("✅ Seeding complete (admin only, no demo data)");
  } catch (err) {
    console.log("⚠️  Seeding failed:", err);
  }
};
