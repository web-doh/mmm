import { Router } from "express";
import { signUp, login } from "./account.controller";

const authRouter = Router();

authRouter.route("/signup").post(signUp);

authRouter.route("/login").post(login);

authRouter.route("/mypage").get((req, res) => {
  res.json({ info: null });
});

export default authRouter;
