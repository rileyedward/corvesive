import prisma from '$lib/server/database/db';
import { PaystubFactory } from '$lib/server/database/factories/PaystubFactory';
import { scheduleFuturePaystubs } from '$lib/server/services/PaystubScheduler';

export async function DatabaseSeeder() {
	try {
		const user = await prisma.users.create({
			data: {
				first_name: 'Riley',
				last_name: 'Grotenhuis',
				email: 'rileygrotenhuis@gmail.com',
				password: 'password'
			}
		});

		const paystub = await PaystubFactory(user, 'semi-monthly');

		await scheduleFuturePaystubs(paystub);
	} catch (error) {
		console.error('Error seeding database:', error);
	} finally {
		await prisma.$disconnect();
	}
}
