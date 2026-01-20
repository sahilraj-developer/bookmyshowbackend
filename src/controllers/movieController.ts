import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ success: true, count: movies.length, movies });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching movies', error: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
    res.status(200).json({ success: true, movie });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching movie', error: error.message });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, duration, releaseDate, language } = req.body;
    const movie = new Movie({ title, genre, duration, releaseDate, language });
    await movie.save();
    res.status(201).json({ success: true, message: 'Movie created', movie });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating movie', error: error.message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Movie updated', movie });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating movie', error: error.message });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Movie deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting movie', error: error.message });
  }
};
