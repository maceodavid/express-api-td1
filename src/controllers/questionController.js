import { eq } from 'drizzle-orm';
import { db } from "../db/database.js";
import { questionstable } from "../db/schema.js";

export const getAllQuestions = async (req, res) => {
    try {
        const result = await db.select().from(questionstable).orderBy("createdAt", "desc");

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch questions"
        });
    }
};

export const createQuestion = async (req, res) => {
    try {
        const result = await db.insert(questionstable).values(req.body).returning();

        res.status(201).json({
            message: "Question created",
            question: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create question"
        });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.delete(questionstable).where(eq(questionstable.id, id)).returning();

        if (!result) {
            return res.status(404).send({
                error: "Question not found"
            });
        }

        res.status(200).send({
            message: `Question ${id} deleted`
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete question"
        });
    }
};