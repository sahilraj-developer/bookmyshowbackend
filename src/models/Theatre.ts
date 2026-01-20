import mongoose, { Schema, Document } from 'mongoose';

interface ITheatre extends Document {
  name: string;
  city: mongoose.Types.ObjectId;
  location: string;
  createdAt: Date;
}

const theatreSchema = new Schema<ITheatre>(
  {
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    location: { type: String, required: true }
  },
  { timestamps: true }
);

export const Theatre = mongoose.model<ITheatre>('Theatre', theatreSchema);
