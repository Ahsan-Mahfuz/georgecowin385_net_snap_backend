import mongoose from "mongoose";
import type { Request, Response } from "express";
import config from "../src/app/config";
import app from "../src/app";

// Serverless entry point for Vercel.
// A single Mongo connection is cached across warm invocations so we don't
// open a new connection on every request (which would exhaust Atlas limits).
let conn: Promise<typeof mongoose> | null = null;

async function connectDB() {
  if (!conn) {
    conn = mongoose.connect(config.database_url as string);
  }
  return conn;
}

export default async function handler(req: Request, res: Response) {
  await connectDB();
  return app(req, res);
}
