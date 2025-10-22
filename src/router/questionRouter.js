import { Router } from 'express';
import { createQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { createQuestionSchema, questionIdSchema } from '../models/question.js';

const router = Router();

router.get('/', getAllQuestions);
router.post('/', validateBody(createQuestionSchema), createQuestion);
router.delete('/:id', validateParams(questionIdSchema), deleteQuestion);

export default router;