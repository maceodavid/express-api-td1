import z from "zod";

export const createCategorySchema = z.object({
    title: z.string().min(1).max(30),
    description: z.string().min(1).max(300)
});

export const categoryIdSchema = z.object({
    id: z.uuid()
});