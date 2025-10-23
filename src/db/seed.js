import { db } from "./database.js";
import { questionstable } from "./schema.js";

async function seed() {
    try {
        console.log("Seeding database...");

        await db.delete(questionstable);

        const seedQuestions = [
			{
				questionText: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
				// createdBy: insertedusers[0].id,
			},
			{
				questionText: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium',
				// createdBy: insertedusers[1].id,
			},
			{
				questionText: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult',
			},
		]

        await db.insert(questionstable).values(seedQuestions);

        console.log("✅ Database seeded successfully");
    } catch (error) {
        console.log("Error seeding database", error);
    }
}

seed();