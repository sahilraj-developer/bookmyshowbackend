import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  refreshToken, 
  getProfile,
  getUserById,
  updateUser,
  changePassword,
  getAllUsers,
  deleteUser
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorizationMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.get('/profile', authMiddleware, getProfile);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.post('/:id/change-password', authMiddleware, changePassword);
router.get('/', authMiddleware, authorize(['ADMIN']), getAllUsers);
router.delete('/:id', authMiddleware, authorize(['ADMIN']), deleteUser);

export default router;
