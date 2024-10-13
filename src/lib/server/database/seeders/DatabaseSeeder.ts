import prisma from '$lib/server/database/db';
import { PaystubFactory } from '$lib/server/database/factories/PaystubFactory';
import { scheduleFuturePaystubs } from '$lib/server/services/PaystubScheduler';
import { UserFactory } from '../factories/UserFactory';

export async function DatabaseSeeder() {
	try {
		const user = await UserFactory();
		const paystub = await PaystubFactory(user, 'bi-weekly');

		await scheduleFuturePaystubs(paystub);
	} catch (error) {
		console.error('Error seeding database:', error);
	} finally {
		await prisma.$disconnect();
	}
}
