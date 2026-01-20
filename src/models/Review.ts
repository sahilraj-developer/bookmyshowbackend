import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
