import fs from 'fs/promises';
const { randomUUID } = await import('crypto');

const databaseFile = "./exercice1/todos.json";
let allTodos = await loadTodos(databaseFile);

export const createTodo = async (req, res) => {
    try {
        const { text, completed } = req.body || {};

        if (!text || !text.trim() || typeof completed !== "boolean") {
            return res.status(400).send({
                error: "Invalid body"
            });
        }
    
        const id = randomUUID();
        const newTodo = {
            id,
            text: text.trim(),
            completed: Boolean(completed)
        };
    
        allTodos.push(newTodo);
    
        await fs.writeFile(databaseFile, JSON.stringify({ todos: allTodos }, null, 2));
    
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getTodo = (req, res) => {
    const { id } = req.params;

    const foundTodo = allTodos.find(todo => todo.id === id);

    if (!foundTodo) {
        return res.status(404).send({
            error: "Not found"
        });
    }

    res.status(200).send(foundTodo);
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body || {};

    const foundTodo = allTodos.find(todo => todo.id === id);

    if (!foundTodo) {
        return res.status(404).send({
            error: "Not found"
        });
    }

    if (typeof completed !== "boolean") {
        return res.status(400).send({
            error: "Completed must be a boolean value"
        });
    }

    foundTodo.completed = completed;

    await fs.writeFile(databaseFile, JSON.stringify({ todos: allTodos }, null, 2));

    res.status(201).send(foundTodo);
};

export const getStats = (req, res) => {
    res.status(200).send({ count: allTodos.length });
};

export const getAllTodos = (req, res) => {
    res.status(200).send(allTodos);
};

async function loadTodos(file) {
    try {
        const data = await fs.readFile(file);
        return JSON.parse(data, null, 2).todos || [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }

        console.error(error);
    }
}