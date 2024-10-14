import prisma from '$lib/server/database/db';
import {
	UpdateExpenseRequest,
	type TUpdateExpenseRequest
} from '$lib/server/requests/ExpenseRequest';
import type { TApiResponse } from '$lib/types/ApiTypes';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/ErrorHelper';

export async function UpdateExpenseRecord(
	payload: TUpdateExpenseRequest,
	expense_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	console.log('testing');
	const validationErrors = UpdateExpenseRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const expenseRecord = await prisma.expense_records.findFirst({
		where: {
			id: expense_record_id,
			user_id: user_id
		}
	});

	if (!expenseRecord) {
		return AuthorizationError();
	}

	await prisma.expense_records.update({
		where: {
			id: expenseRecord.id
		},
		data: {
			due_date: new Date(payload.due_date),
			amount_in_cents: payload.amount_in_cents
		}
	});

	return {
		message: 'Expense record updated'
	};
}

export async function UnscheduleExpense(
	expense_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	const expenseRecord = await prisma.expense_records.findFirst({
		where: {
			id: expense_record_id,
			user_id: user_id
		}
	});

	if (!expenseRecord) {
		return AuthorizationError();
	}

	await prisma.expense_records.delete({
		where: {
			id: expenseRecord.id
		}
	});

	return {
		message: 'Expense unscheduled'
	};
}
