import { Request, Response } from 'express';
import { Screen } from '../models/Screen';

export const getAllScreens = async (req: Request, res: Response) => {
  try {
    const screens = await Screen.find().populate('theatre');
    res.status(200).json({ success: true, count: screens.length, screens });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching screens', error: error.message });
  }
};

export const getScreenById = async (req: Request, res: Response) => {
  try {
    const screen = await Screen.findById(req.params.id).populate('theatre');
    if (!screen) return res.status(404).json({ success: false, message: 'Screen not found' });
    res.status(200).json({ success: true, screen });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching screen', error: error.message });
  }
};

export const createScreen = async (req: Request, res: Response) => {
  try {
    const { theatre, screenNumber, totalSeats } = req.body;
    const screen = new Screen({ theatre, screenNumber, totalSeats });
    await screen.save();
    res.status(201).json({ success: true, message: 'Screen created', screen });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating screen', error: error.message });
  }
};

export const updateScreen = async (req: Request, res: Response) => {
  try {
    const screen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('theatre');
    res.status(200).json({ success: true, message: 'Screen updated', screen });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating screen', error: error.message });
  }
};

export const deleteScreen = async (req: Request, res: Response) => {
  try {
    await Screen.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Screen deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting screen', error: error.message });
  }
};
