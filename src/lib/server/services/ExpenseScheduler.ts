import type { expenses } from '@prisma/client';
import dayjs from 'dayjs';
import prisma from '$lib/server/db';

export async function scheduleFutureExpenses(expense: expenses) {
	for (let i = 0; i < 12; i++) {
		const dueDate = dayjs().add(i, 'month').day(expense.due_day_of_month).toDate();

		await prisma.expense_records.create({
			data: {
				user_id: expense.user_id,
				expense_id: expense.id,
				due_date: dueDate,
				amount_in_cents: expense.amount_in_cents
			}
		});
	}
}

export async function rescheduleFutureExpenses(expense: expenses) {
	await removeFutureExpenses(expense);
	await scheduleFutureExpenses(expense);
}

export async function removeFutureExpenses(expense: expenses) {
	await prisma.expense_records.deleteMany({
		where: {
			expense_id: expense.id,
			due_date: {
				gte: new Date()
			}
		}
	});
}
