import { Document, Schema, model } from "mongoose";

interface IBucket extends Document {
  bucketName: string;
  jsonFiles: Array<Schema.Types.ObjectId>;
}

const Bucket = new Schema<IBucket>(
  {
    bucketName: {
      type: String,
      unique: true,
      required: true,
    },
    jsonFiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Storage",
      },
    ],
  },
  { timestamps: true }
);

export default model<IBucket>("Bucket", Bucket);
