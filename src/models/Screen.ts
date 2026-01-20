import mongoose, { Schema, Document } from 'mongoose';

interface IScreen extends Document {
  theatre: mongoose.Types.ObjectId;
  screenNumber: number;
  totalSeats: number;
  createdAt: Date;
}

const screenSchema = new Schema<IScreen>(
  {
    theatre: { type: Schema.Types.ObjectId, ref: 'Theatre', required: true },
    screenNumber: { type: Number, required: true },
    totalSeats: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Screen = mongoose.model<IScreen>('Screen', screenSchema);
