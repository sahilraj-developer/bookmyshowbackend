import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  show: mongoose.Types.ObjectId;
  seats: string[];
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
  bookingDate: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['CONFIRMED', 'CANCELLED'], default: 'CONFIRMED' },
    bookingDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
