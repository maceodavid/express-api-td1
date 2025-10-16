import { Router } from 'express';
import { createTodo, getTodo, updateTodo, getAllTodos } from '../controllers/todoController.js';

const router = Router();

router.post('/', createTodo);
router.get('/:id', getTodo);
router.patch('/:id', updateTodo);
router.get('/', getAllTodos);

export default router;