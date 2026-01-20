import { Request, Response } from 'express';
import { Theatre } from '../models/Theatre';

export const getAllTheatres = async (req: Request, res: Response) => {
  try {
    const theatres = await Theatre.find().populate('city');
    res.status(200).json({ success: true, count: theatres.length, theatres });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching theatres', error: error.message });
  }
};

export const getTheatreById = async (req: Request, res: Response) => {
  try {
    const theatre = await Theatre.findById(req.params.id).populate('city');
    if (!theatre) return res.status(404).json({ success: false, message: 'Theatre not found' });
    res.status(200).json({ success: true, theatre });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching theatre', error: error.message });
  }
};

export const createTheatre = async (req: Request, res: Response) => {
  try {
    const { name, city, location } = req.body;
    const theatre = new Theatre({ name, city, location });
    await theatre.save();
    res.status(201).json({ success: true, message: 'Theatre created', theatre });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating theatre', error: error.message });
  }
};

export const updateTheatre = async (req: Request, res: Response) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('city');
    res.status(200).json({ success: true, message: 'Theatre updated', theatre });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating theatre', error: error.message });
  }
};

export const deleteTheatre = async (req: Request, res: Response) => {
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Theatre deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting theatre', error: error.message });
  }
};
