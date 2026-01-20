import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const getMovieReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'name email');
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ user: req.params.userId }).populate('movie', 'title');
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { user, movie, rating, comment } = req.body;
    const review = new Review({ user, movie, rating, comment });
    await review.save();
    res.status(201).json({ success: true, message: 'Review created', review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating review', error: error.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Review updated', review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating review', error: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting review', error: error.message });
  }
};
