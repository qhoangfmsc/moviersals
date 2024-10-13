import express, { json } from "express";
import cors from "cors";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import { authenticateJWT } from "./middleware/jwtverify.js";
import { sendResponse } from "./global/index.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Number(process.env.PORT) || 5432;
const HOST = process.env.SERVER_HOST || "127.0.0.1";
// Specific domain
const allowedOrigins = JSON.parse(process.env.ALLOW_ORIGINS);
app.set("trust proxy", true);
app.use(cookieParser());
app.use(json());
app.use(cors());

/* CROS middleware */
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api", publicRoutes);
app.use("/api/protected", authenticateJWT, privateRoutes);
app.use("/test", (req, res) => {
  sendResponse(res, 200, "success", "test");
});
// Invalid API path middleware
app.use((req, res) => {
  sendResponse(res, 404, "fail", "Invalid API path");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port: ${PORT} ${HOST}`);
});
