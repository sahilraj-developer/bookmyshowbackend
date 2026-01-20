import { Request, Response } from 'express';
import { Show } from '../models/Show';

export const getAllShows = async (req: Request, res: Response) => {
  try {
    const shows = await Show.find().populate(['movie', 'screen']);
    res.status(200).json({ success: true, count: shows.length, shows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching shows', error: error.message });
  }
};

export const getShowById = async (req: Request, res: Response) => {
  try {
    const show = await Show.findById(req.params.id).populate(['movie', 'screen']);
    if (!show) return res.status(404).json({ success: false, message: 'Show not found' });
    res.status(200).json({ success: true, show });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching show', error: error.message });
  }
};

export const createShow = async (req: Request, res: Response) => {
  try {
    const { movie, screen, startTime, price } = req.body;
    const show = new Show({ movie, screen, startTime, price });
    await show.save();
    res.status(201).json({ success: true, message: 'Show created', show });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating show', error: error.message });
  }
};

export const updateShow = async (req: Request, res: Response) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['movie', 'screen']);
    res.status(200).json({ success: true, message: 'Show updated', show });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating show', error: error.message });
  }
};

export const deleteShow = async (req: Request, res: Response) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Show deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting show', error: error.message });
  }
};
