import { model, Schema, Types } from "mongoose";

const User = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  itemList: [
    {
      type: Types.ObjectId,
      ref: "Item",
      default: [],
    },
  ],
  admin: {
    type: Boolean,
    default: false,
  },
});

export default model("user", User);
