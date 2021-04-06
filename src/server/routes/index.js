import { Router } from "express";
import authRouter from "./account/account";
import boardRouter from "./board/board";

const router = Router();

router.use("/*", (req, res, next) => {
  res.set({ Expires: "-1", "Cache-Control": "must-revalidate, private" });
  next();
});

router.use("/account", authRouter);
router.use("/board", boardRouter);

export default router;
