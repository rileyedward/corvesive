import prisma from '$lib/server/database/db';
import {
	RescheduleExpenseRequest,
	UpdateExpenseRequest,
	type TRescheduleExpenseRequest,
	type TUpdateExpenseRequest
} from '$lib/server/requests/ExpenseRequest';
import type { TApiResponse } from '$lib/types/ApiTypes';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/ErrorHelper';

export async function RescheduleExpense(
	payload: TRescheduleExpenseRequest,
	expense_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = RescheduleExpenseRequest(payload);
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
			due_date: payload.due_date
		}
	});

	return {
		message: 'Expense rescheduled'
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

export async function UpdateExpenseRecord(
	payload: TUpdateExpenseRequest,
	expense_record_id: number,
	user_id: number
): Promise<TApiResponse> {
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
			amount_in_cents: payload.amount_in_cents
		}
	});

	return {
		message: 'Expense record updated'
	};
}
