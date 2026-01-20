import { Router } from 'express';
import { 
  getAllCities, 
  getCityById, 
  createCity, 
  updateCity, 
  deleteCity 
} from '../controllers/cityController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);
router.post('/', authMiddleware, authorize(['ADMIN']), createCity);
router.put('/:id', authMiddleware, authorize(['ADMIN']), updateCity);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteCity);

export default router;
