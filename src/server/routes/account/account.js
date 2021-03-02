import { Router } from "express";
import { signUp } from "./account.controller";

const authRouter = Router();

authRouter
  .route("/signup")
  .get((req, res) => {
    res.json({ info: null });
  })
  .post(signUp);

authRouter
  .route("/login")
  .get((req, res) => {
    res.json({ info: null });
  })
  .post((req, res) => {
    res.json({ success: true });
  });

authRouter.route("/logout").post((req, res) => {
  res.json({ success: true });
});

authRouter.route("/mypage").get((req, res) => {
  res.json({ info: null });
});

export default authRouter;
