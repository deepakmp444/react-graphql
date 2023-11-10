import { Schema, model } from "mongoose";

const GameSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    platform: [
      {
        type: String,
      },
    ],
  },
  {
    reviews: [
      {
        type: String,
      },
    ],
  }
);

export default model("Game", GameSchema);
