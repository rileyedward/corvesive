import prisma from '$lib/server/database/db';
import { PaystubFactory } from '$lib/server/database/factories/PaystubFactory';

async function seedDatabase() {
	try {
		const user = await prisma.users.create({
			data: {
				first_name: 'Riley',
				last_name: 'Grotenhuis',
				email: 'rileygrotenhuis@gmail.com',
				password: 'password'
			}
		});

		console.log('User created:', user);

		const paystub = await PaystubFactory(user, 'semi-monthly');
		console.log('Paystub created:', paystub);
	} catch (error) {
		console.error('Error seeding database:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedDatabase();
