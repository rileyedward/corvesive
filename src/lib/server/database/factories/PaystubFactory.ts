import prisma from '$lib/server/database/db';
import { faker } from '@faker-js/faker';
import type { paystubs, users } from '@prisma/client';

export async function PaystubFactory(
	user: users,
	recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'semi-monthly' = 'weekly'
): Promise<paystubs> {
	return await prisma.paystubs.create({
		data: {
			user_id: user.id,
			issuer: faker.company.name(),
			amount_in_cents: faker.number.int({ min: 1000, max: 5000 }),
			recurrence_rate: recurrence_rate,
			recurrence_interval_one: ['weekly', 'bi-weekly'].includes(recurrence_rate)
				? faker.number.int({ min: 1, max: 7 })
				: faker.number.int({ min: 1, max: 15 }),
			recurrence_interval_two:
				recurrence_rate === 'semi-monthly' ? faker.number.int({ min: 15, max: 28 }) : null
		}
	});
}
