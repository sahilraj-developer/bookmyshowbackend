import { Request, Response } from 'express';
import { Booking } from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { user, show, seats, totalPrice } = req.body;
    const booking = new Booking({ user, show, seats, totalPrice });
    await booking.save();
    res.status(201).json({ success: true, message: 'Booking created', booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error creating booking', error: error.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(['user', 'show']);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.status(200).json({ success: true, booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching booking', error: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate(['show']);
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error fetching bookings', error: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'CANCELLED' },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Booking cancelled', booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error cancelling booking', error: error.message });
  }
};
