import mongoose, { Schema, Document } from 'mongoose';

interface IShow extends Document {
  movie: mongoose.Types.ObjectId;
  screen: mongoose.Types.ObjectId;
  startTime: Date;
  price: number;
  availableSeats: number;
  createdAt: Date;
}

const showSchema = new Schema<IShow>(
  {
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    screen: { type: Schema.Types.ObjectId, ref: 'Screen', required: true },
    startTime: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number }
  },
  { timestamps: true }
);

export const Show = mongoose.model<IShow>('Show', showSchema);
