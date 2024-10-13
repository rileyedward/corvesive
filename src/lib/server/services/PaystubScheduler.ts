import type { paystubs } from '@prisma/client';
import dayjs from 'dayjs';
import prisma from '../db';

export async function scheduleFuturePaystubs(paystub: paystubs) {
	// weekly
	// bi-weekly
	// monthly
	// bi-monthly
}

export async function generateMonthlyPaystubs(paystub: paystubs) {
	for (let i = 0; i < 12; i++) {
		let payDate = dayjs().add(i, 'month').day(paystub.recurrence_interval_one).toDate();

		await prisma.paystub_records.create({
			data: {
				user_id: paystub.user_id,
				paystub_id: paystub.id,
				pay_day: payDate,
				amount_in_cents: paystub.amount_in_cents
			}
		});

		if (paystub.recurrence_rate === 'semi-monthly' && paystub.recurrence_interval_two) {
			payDate = dayjs().add(i, 'month').day(paystub.recurrence_interval_two).toDate();

			await prisma.paystub_records.create({
				data: {
					user_id: paystub.user_id,
					paystub_id: paystub.id,
					pay_day: dayjs(payDate).add(14, 'day').toDate(),
					amount_in_cents: paystub.amount_in_cents
				}
			});
		}
	}
}
