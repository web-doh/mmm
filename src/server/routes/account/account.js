import { Router } from "express";
import { signUp, login } from "./account.controller";

const authRouter = Router();

authRouter.route("/signup").post(signUp);

authRouter.route("/login").post(login);

authRouter.route("/logout").post((req, res) => {
  res.json({ success: true });
});

// authRouter.route("/complete").get((req, res) => {
//   res.redirect("/not-found");
// });

authRouter.route("/mypage").get((req, res) => {
  res.json({ info: null });
});

export default authRouter;
