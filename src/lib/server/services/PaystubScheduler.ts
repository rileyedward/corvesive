import type { paystubs } from '@prisma/client';
import dayjs from 'dayjs';
import prisma from '$lib/server/database/db';

export async function scheduleFuturePaystubs(paystub: paystubs) {
	if (paystub.recurrence_rate === 'monthly' || paystub.recurrence_rate === 'semi-monthly') {
		await generateMonthlyPaystubs(paystub);
	}

	if (paystub.recurrence_rate === 'weekly' || paystub.recurrence_rate === 'bi-weekly') {
		await generateWeeklyPaystubs(paystub);
	}
}

export async function rescheduleFuturePaystubs(paystub: paystubs) {
	await removeFuturePaystubs(paystub);
	await scheduleFuturePaystubs(paystub);
}

export async function removeFuturePaystubs(paystub: paystubs) {
	await prisma.paystub_records.deleteMany({
		where: {
			paystub_id: paystub.id,
			pay_date: {
				gte: new Date()
			}
		}
	});
}

async function generateMonthlyPaystubs(paystub: paystubs) {
	for (let i = 0; i < 12; i++) {
		const payDate = dayjs()
			.startOf('month')
			.add(i, 'month')
			.date(paystub.recurrence_interval_one)
			.toDate();

		await prisma.paystub_records.create({
			data: {
				user_id: paystub.user_id,
				paystub_id: paystub.id,
				pay_date: payDate,
				amount_in_cents: paystub.amount_in_cents
			}
		});

		if (paystub.recurrence_rate === 'semi-monthly' && paystub.recurrence_interval_two) {
			const newPayDate = dayjs()
				.startOf('month')
				.add(i, 'month')
				.date(paystub.recurrence_interval_two)
				.toDate();

			await prisma.paystub_records.create({
				data: {
					user_id: paystub.user_id,
					paystub_id: paystub.id,
					pay_date: newPayDate,
					amount_in_cents: paystub.amount_in_cents
				}
			});
		}
	}
}

async function generateWeeklyPaystubs(paystub: paystubs) {
	const interval = paystub.recurrence_rate === 'bi-weekly' ? 2 : 1;

	const startOfWeek = dayjs().startOf('week');

	for (let i = 0; i < 52; i += interval) {
		const payDate = startOfWeek.add(i, 'week').add(paystub.recurrence_interval_one, 'day').toDate();

		await prisma.paystub_records.create({
			data: {
				user_id: paystub.user_id,
				paystub_id: paystub.id,
				pay_date: payDate,
				amount_in_cents: paystub.amount_in_cents
			}
		});
	}
}
