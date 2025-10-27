import express from 'express';
import { getUserDetails, loginUser, registerUser } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId', getUserDetails);

export const userRoutes = router;
