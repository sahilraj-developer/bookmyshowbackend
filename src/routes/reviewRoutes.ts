import { Router } from 'express';
import { 
  getMovieReviews, 
  getUserReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviewController';
import { authMiddleware } from '../middleware/authMiddleware';
import { optionalAuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/movie/:movieId', getMovieReviews);
router.get('/user/:userId', getUserReviews);
router.post('/', authMiddleware, createReview);
router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
