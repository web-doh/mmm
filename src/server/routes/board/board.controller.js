import { model, Schema, Types } from "mongoose";
import User from "../../models/user";
import Item from "../../models/item";

const respond = (res, items) => {
  return res.status(201).json({
    status: "success",
    items,
  });
};

const errorGenerator = (res, error, code, statusCode) => {
  return res.status(statusCode).json({
    status: "error",
    error,
    code,
  });
};

/*
    READ Items: GET api/board/:id
*/
export const sendInitialItems = async (req, res) => {
  const { userId } = req.params;
  const items = await Item.find({ user: userId }).sort({ date: -1 });
  respond(res, items);
};

/*
    CREATE ITEM: POST api/board/item
    BODY SAMPLE: { 
      _id,
      user,
      name,
      type,
      size,
      price,
      manufacture,
      seller,
      contact,
      email,
      project,
      remarks,
      file,
      isLiked,
      date
  }

  ERROR CODES
        0: SERVER ERROR
*/
export const saveItem = async (req, res) => {
  const { contents } = req.body;

  try {
    const newItem = await Item.create(contents);

    respond(res, newItem);
  } catch (err) {
    console.log("Save failed!", err);
    errorGenerator(res, "SERVER ERROR", 0, 500);
  }
};

/*
    EDIT ITEM: PATCH api/board/item/:id
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        0: SERVER ERROR
        1: INVALID ID
        2: NO RESOURCE
*/
export const editItem = async (req, res) => {
  const update = req.body.contents;
  update.date.edited = Date.now();

  try {
    // Check item id validity
    if (!Types.ObjectId.isValid(req.params.id)) {
      errorGenerator(res, "INVALID ID", 1, 400);
    }

    const currItem = await Item.findById(req.params.id);

    if (!currItem) {
      errorGenerator(res, "NO RESOURCE", 2, 400);
    }
    // Update item
    await currItem.updateOne(update, { new: true });

    respond(res, update);
  } catch (err) {
    console.log("Update failed!", err);

    errorGenerator(res, "SERVER ERROR", 0, 500);
  }
};

/*
    DELETE ITEM: DELETE /api/board/item/:id
    ERROR CODES
        0: SERVER ERROR
        1: INVALID ID
        2: NO RESOURCE
*/
export const deleteItem = async (req, res) => {
  try {
    // Check item id validity
    if (!Types.ObjectId.isValid(req.params.id)) {
      errorGenerator(res, "INVALID ID", 1, 400);
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      errorGenerator(res, "NO RESOURCE", 2, 400);
    }

    item.deleteOne();

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("Delete failed!", err);

    errorGenerator(res, "SERVER ERROR", 0, 500);
  }
};

/*
    TOGGLES LIKE OF ITEM: POST api/board/item/:id/like
    ERROR CODES
        0: SERVER ERROR
        1: INVALID ID
        2: NO RESOURCE
*/
export const likeItem = async (req, res) => {
  try {
    // Check item id validity
    if (!Types.ObjectId.isValid(req.params.id)) {
      errorGenerator(res, "INVALID ID", 1, 400);
    }

    const currItem = await Item.findById(req.params.id);
    const isLiked = !currItem.isLiked;
    if (!currItem) {
      errorGenerator(res, "NO RESOURCE", 2, 400);
    }

    // Update item
    await currItem.updateOne({ isLiked }, { new: true });

    respond(res, isLiked);
  } catch (err) {
    console.log("Bookmark failed!", err);

    errorGenerator(res, "SERVER ERROR", 0, 500);
  }
};
