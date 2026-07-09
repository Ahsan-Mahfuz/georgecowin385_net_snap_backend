import mongoose from "mongoose";
import { createServer } from "http";
import config from "./app/config";
import app from "./app";
import { seedDatabase } from "./app/utilities/seed";

const httpServer = createServer(app);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ Database connected");

    await seedDatabase();

    httpServer.listen(Number(config.port), () => {
      console.log(`🚀 Cowshed server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection detected, shutting down");
  httpServer.close(() => process.exit(1));
});

process.on("uncaughtException", () => {
  console.log("uncaughtException detected, shutting down");
  process.exit(1);
});
