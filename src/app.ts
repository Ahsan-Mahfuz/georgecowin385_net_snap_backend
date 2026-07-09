import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFoundRoute";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: (_origin: unknown, callback: (err: Error | null, allow?: boolean) => void) =>
    callback(null, true),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Cowshed API Server is running.");
});

app.use(errorMiddleware);
app.use(notFound);

export default app;
