import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  genre: string;
  duration: number;
  releaseDate: Date;
  language: string;
  createdAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date },
    language: { type: String }
  },
  { timestamps: true }
);

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);
