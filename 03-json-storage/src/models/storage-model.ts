import { Document, Schema, Types, model } from "mongoose";

interface IStorage extends Document {
  jsonName: string;
  jsonData: any;
  bucket: Types.ObjectId;
}

const Storage = new Schema<IStorage>(
  {
    jsonName: {
      type: String,
      required: true,
    },
    jsonData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    bucket: {
      type: Schema.Types.ObjectId,
      ref: "Bucket",
    },
  },
  { timestamps: true }
);

export default model<IStorage>("Storage", Storage);
