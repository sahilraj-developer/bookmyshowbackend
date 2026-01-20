import { Router } from 'express';
import { 
  createBooking, 
  getBookingById, 
  getUserBookings, 
  cancelBooking 
} from '../controllers/bookingController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.post('/', authMiddleware, createBooking);
router.get('/:id', authMiddleware, getBookingById);
router.get('/user/:userId', authMiddleware, getUserBookings);
router.put('/:id/cancel', authMiddleware, cancelBooking);

export default router;
