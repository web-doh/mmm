import { Router } from "express";
import { isAuth } from "../../middlewares/authenticate";
import {
  sendInitialItems,
  saveItem,
  deleteItem,
  likeItem,
  editItem,
} from "./board.controller";

const boardRouter = Router();

boardRouter.get("/:userId", isAuth, sendInitialItems);

boardRouter.post("/item", isAuth, saveItem);

boardRouter.patch("/item/:id", isAuth, editItem);

boardRouter.delete("/item/:id", isAuth, deleteItem);

boardRouter.post("/item/:id/like", isAuth, likeItem);

export default boardRouter;
