import bcrypt from "bcryptjs";
import * as funcs from "../global/index.js";
import jwt from "jsonwebtoken";
import { dbPool } from "../services/database.js";
import moment from "../../node_modules/moment/moment.js";
const generateRandomString = funcs.generateRandomString;
const sendResponse = funcs.sendResponse;

export async function createAccount(req, res) {
  const client = await dbPool.connect();
  try {
    const { username, password, displayname, email, phonenumber } = req.body;
    const error = funcs.validateFields({ username, password, displayname, email, phonenumber });
    if (error) {
      sendResponse(res, 400, "fail", error);
    }
    const userid = generateRandomString(8);
    const role = "customer";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      "INSERT INTO tbuserinfo (userid, username, password, displayname, email, phonenumber, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [userid, username, hashedPassword, displayname, email, phonenumber, role]
    );
    if (result.rowCount > 0) {
      return sendResponse(res, 200, "success", "Account created successfully");
    }
  } catch (err) {
    sendResponse(res, 500, "fail", "Internal Server Error");
  } finally {
    client.release();
  }
}
export async function logoutAccount(req, res) {
  const client = await dbPool.connect();
  try {
    const userid = req.user.info.userId;
    const logoutDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const result = await client.query("UPDATE tbloginhistory set logoutdate = $2 WHERE username = $1", [userid, logoutDate]);
    if (result.rowCount > 0) {
      res.cookie("accessToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: new Date(0),
      });
      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: new Date(0),
      });
      return sendResponse(res, 200, "success", "Logout successfully");
    }
  } catch (err) {
    sendResponse(res, 500, "fail", "Internal Server Error");
  } finally {
    client.release();
  }
}

export async function loginAccount(req, res) {
  const client = await dbPool.connect();
  try {
    const { username, password } = req.body;
    const error = funcs.validateFields({ username, password });
    if (error) {
      return sendResponse(res, 400, "fail", error);
    }

    const result = await client.query("SELECT * FROM tbuserinfo WHERE username = $1", [username]);

    if (result.rowCount == 0) {
      return sendResponse(res, 404, "fail", "Account not exist");
    }
    const user = result.rows[0];

    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign({ userId: user.userid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
      const refreshToken = jwt.sign({ userId: user.userid }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 86400 * 7 * 1000,
      });

      return sendResponse(res, 200, "success", "Login successfully");
    } else {
      return sendResponse(res, 404, "fail", "Login failed");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "fail", "Internal Server Error");
  } finally {
    client.release();
  }
}

export async function changePassword(req, res) {
  const client = await dbPool.connect();
  try {
    const userid = req.user.info.userId;
    const { password, newpassword } = req.body;
    const error = funcs.validateFields({ password, newpassword });
    if (error) {
      return sendResponse(res, 400, "fail", error);
    }
    const result = await client.query("SELECT password FROM tbuserinfo WHERE userid = $1", [userid]);
    if (result) {
      let checkPassword = bcrypt.compareSync(password, result.rows[0].password);
      if (!checkPassword) {
        sendResponse(res, 400, "fail", "Current password is incorrect");
      } else {
        let newHashedPassword = await bcrypt.hash(newpassword, 10);
        const updateResult = await client.query("UPDATE tbuserinfo SET password = $2 WHERE userid = $1", [userid, newHashedPassword]);
        if (updateResult.rowCount > 0) {
          sendResponse(res, 200, "success", "Change password successfully");
        }
      }
    }
  } catch (err) {
    console.log(err);

    sendResponse(res, 500, "fail", "Internal Server Error");
  } finally {
    client.release();
  }
}
