import { like } from 'drizzle-orm';
import { db } from "../db/database.js";
import { questionstable } from "../db/schema.js";

export const searchQuestion = async (req, res) => {
    try {
        const querySearch = req.query.q;
        const result = await db.select().from(questionstable).where(like(questionstable.questionText, `%${querySearch}%`));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch questions"
        });
    }
};