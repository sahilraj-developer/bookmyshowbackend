import { Request, Response } from 'express';
import { City } from '../models/City';

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.find();
    res.status(200).json({ success: true, count: cities.length, cities });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching cities', error: error.message });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ success: false, message: 'City not found' });
    res.status(200).json({ success: true, city });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching city', error: error.message });
  }
};

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, state, country } = req.body;
    const city = new City({ name, state, country });
    await city.save();
    res.status(201).json({ success: true, message: 'City created', city });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating city', error: error.message });
  }
};

export const updateCity = async (req: Request, res: Response) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'City updated', city });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error updating city', error: error.message });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'City deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error deleting city', error: error.message });
  }
};
