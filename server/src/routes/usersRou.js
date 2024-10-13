import Router from "express";
import * as funcs from "../controller/accountCon.js";

let router = Router();
router.post("/login", funcs.loginAccount);
router.post("/create", funcs.createAccount);
router.post("/logout", funcs.logoutAccount);
router.post("/changepassword", funcs.changePassword);
router.post("/check", funcs.checkAccountSession);

export default router;
