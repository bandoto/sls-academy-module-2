import { Document, Schema, model } from "mongoose";

interface IUrl extends Document {
  originalUrl: string;
  shortedUrl: string;
}

const Url = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortedUrl: { type: String, required: true },
});

export default model<IUrl>("Url", Url);
