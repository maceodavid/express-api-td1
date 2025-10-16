import express from 'express';
import todoRoutes from './router/todoRouter.js';
import { getStats } from './controllers/todoController.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);
app.get("/stats", getStats);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});