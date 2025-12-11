import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategory } from '../controllers/categoryController.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { createCategorySchema, categoryIdSchema } from '../models/category.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllCategories);
router.delete('/:id', validateParams(categoryIdSchema), getCategory);
router.post('/', validateBody(createCategorySchema), createCategory);
router.delete('/:id', validateParams(categoryIdSchema), deleteCategory);

export default router;