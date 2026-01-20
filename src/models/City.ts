import mongoose, { Schema, Document } from 'mongoose';

interface ICity extends Document {
  name: string;
  state: string;
  country: string;
  createdAt: Date;
}

const citySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
    state: { type: String },
    country: { type: String }
  },
  { timestamps: true }
);

export const City = mongoose.model<ICity>('City', citySchema);
