import { Router } from 'express';
import { 
  getAllTheatres, 
  getTheatreById, 
  createTheatre, 
  updateTheatre, 
  deleteTheatre 
} from '../controllers/theatreController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.get('/', getAllTheatres);
router.get('/:id', getTheatreById);
router.post('/', authMiddleware, authorize(['ADMIN']), createTheatre);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateTheatre);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteTheatre);

export default router;
