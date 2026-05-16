import cors, { type CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import { authRouter } from "./routes/auth.routes.js";
import { router as habitRouter } from "./routes/index.js";
import { config } from "./config/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export const app = express();

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (config.allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS"));
  },
};

app.disable("x-powered-by");
app.set("trust proxy", config.trustProxy);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: config.nodeEnv,
  });
});

app.use("/api/habits/auth", authRouter);
app.use("/api/habits", habitRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.info(`Server is running on port ${config.port}`);
});
