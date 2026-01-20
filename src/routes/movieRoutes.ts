import { Router } from 'express';
import { 
  getAllMovies, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie 
} from '../controllers/movieController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', authMiddleware, authorize(['ADMIN']), createMovie);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateMovie);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteMovie);

export default router;
