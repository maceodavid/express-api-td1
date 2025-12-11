import { Router } from 'express';
import { searchQuestion } from '../controllers/searchController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = Router();

router.use(authenticateToken);

router.get('/', searchQuestion);

export default router;