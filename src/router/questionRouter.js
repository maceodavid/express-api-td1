import { Router } from 'express';
import { createQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController.js';

const router = Router();

router.get('/', getAllQuestions);
router.post('/', createQuestion);
router.delete('/:id', deleteQuestion);

export default router;