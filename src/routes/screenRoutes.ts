import { Router } from 'express';
import { 
  getAllScreens, 
  getScreenById, 
  createScreen, 
  updateScreen, 
  deleteScreen 
} from '../controllers/screenController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.get('/', getAllScreens);
router.get('/:id', getScreenById);
router.post('/', authMiddleware, authorize(['ADMIN']), createScreen);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateScreen);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteScreen);

export default router;
