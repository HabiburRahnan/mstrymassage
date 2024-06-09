import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createArt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createArt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
