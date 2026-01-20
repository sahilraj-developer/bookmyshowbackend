import { Router } from 'express';
import { 
  getAllShows, 
  getShowById, 
  createShow, 
  updateShow, 
  deleteShow 
} from '../controllers/showController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.get('/', getAllShows);
router.get('/:id', getShowById);
router.post('/', authMiddleware, authorize(['ADMIN']), createShow);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateShow);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteShow);

export default router;
