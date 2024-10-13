import prisma from '$lib/server/database/db';
import type { users } from '@prisma/client';

export const load = async ({ locals, depends }) => {
	depends('paystubs');

	const user: users = locals.user;

	const paystubs = await prisma.paystubs.findMany({
		where: {
			user_id: user.id
		}
	});

	const upcomingPaystubs = await prisma.paystub_records.findMany({
		where: {
			user_id: user.id,
			pay_date: {
				gte: new Date()
			}
		},
		orderBy: {
			pay_date: 'asc'
		},
		take: 5
	});

	return {
		paystubs,
		upcomingPaystubs
	};
};
