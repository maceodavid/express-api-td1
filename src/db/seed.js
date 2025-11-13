import { db } from "./database.js";
import { questionstable, usersTable } from "./schema.js";
import bcrypt from "bcrypt";

async function seed() {
    try {
        console.log("Seeding database...");

        await db.delete(questionstable);
        await db.delete(usersTable);

		const hashedPassword1 = await bcrypt.hash("password", 12);
		const hashedPassword2 = await bcrypt.hash("1234", 12);

        const seedUsers = [
			{
				email: "clement.catel@unicaen.fr",
				username: "clement",
				password: hashedPassword1,
			},
			{
				email: "michel@unicaen.fr",
				username: "michel",
				password: hashedPassword2,
			},
		];

        const insertedusers = await db.insert(usersTable).values(seedUsers).returning();

        const seedQuestions = [
			{
				questionText: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
				author: insertedusers[0].id,
			},
			{
				questionText: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium',
				author: insertedusers[1].id,
			},
			{
				questionText: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult',
				author: insertedusers[1].id,
			},
		];

        await db.insert(questionstable).values(seedQuestions);

        console.log("✅ Database seeded successfully");
    } catch (error) {
        console.log("Error seeding database", error);
    }
}

seed();