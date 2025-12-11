import { eq } from 'drizzle-orm';
import { db } from "../db/database.js";
import { categoriesTable } from "../db/schema.js";

export const getAllCategories = async (req, res) => {
    try {
        const result = await db.select().from(categoriesTable);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch categories"
        });
    }
};

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id));

        if (!result) {
            return res.status(404).send({
                error: "Category not found"
            });
        }

        res.status(200).send({
            message: "Category fetched",
            category: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch category"
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const newCategory = req.body;

        const result = await db.insert(categoriesTable).values(newCategory).returning();

        res.status(201).json({
            message: "Category created",
            category: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create category"
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id));

        if (!result) {
            return res.status(404).send({
                error: "Category not found"
            });
        }

        await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();

        res.status(200).send({
            message: `Category ${id} deleted`
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete category"
        });
    }
};