import jwt from "jsonwebtoken";
import { sendResponse } from "../global/index.js";

export function authenticateJWT(req, res, next) {
  if (!req.cookies) {
    return sendResponse(res, 401, "fail", "No cookies found");
  }

  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return sendResponse(res, 401, "fail", "Access token is missing");
  }

  if (!refreshToken) {
    return sendResponse(res, 401, "fail", "Refresh token is missing");
  }

  const secretKey = process.env.REFRESH_TOKEN_SECRET;
  jwt.verify(accessToken, secretKey, (err, user) => {
    if (err) {
      jwt.verify(refreshToken, secretKey, (err, user) => {
        if (err) {
          return sendResponse(res, 400, "fail", "Invalid Token");
        } else {
          const accessToken = jwt.sign({ info: user }, secretKey, { expiresIn: "1h" });

          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 3600 * 1000,
          });
        }

        next();
      });
    } else {
      req.user = user;
      next();
    }
  });
}
