import { Router } from 'express';
import { createQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { createQuestionSchema, questionIdSchema } from '../models/question.js';
import searchRoutes from './searchRouter.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getAllQuestions);
router.post('/', validateBody(createQuestionSchema), createQuestion);
router.delete('/:id', validateParams(questionIdSchema), deleteQuestion);
router.use('/search', searchRoutes);

export default router;