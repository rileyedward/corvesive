import { ExpenseRequest, type TExpenseRequest } from '$lib/server/requests/ExpenseRequest';
import type { TApiResponse } from '$lib/types/ApiTypes';
import prisma from '$lib/server/db';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/ErrorHelper';

export async function CreateExpense(
	payload: TExpenseRequest,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = ExpenseRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const expense = await prisma.expenses.create({
		data: {
			user_id: user_id,
			issuer: payload.issuer,
			name: payload.name,
			due_day_of_month: payload.due_day_of_month,
			amount_in_cents: payload.amount_in_cents
		}
	});

	// TODO: Implement expense scheduler

	return {
		message: 'Expense created',
		data: { expense }
	};
}

export async function UpdateExpense(
	payload: TExpenseRequest,
	expense_id: number,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = ExpenseRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const expense = await prisma.expenses.findFirst({
		where: {
			id: expense_id,
			user_id: user_id
		}
	});

	if (!expense) {
		return AuthorizationError();
	}

	const updatedExpense = await prisma.expenses.update({
		where: {
			id: expense.id
		},
		data: {
			issuer: payload.issuer,
			name: payload.name,
			due_day_of_month: payload.due_day_of_month,
			amount_in_cents: payload.amount_in_cents
		}
	});

	// TODO: Implement expense scheduler

	return {
		message: 'Expense updated',
		data: { expense: updatedExpense }
	};
}

export async function DeleteExpense(expense_id: number, user_id: number): Promise<TApiResponse> {
	const expense = await prisma.expenses.findFirst({
		where: {
			id: expense_id,
			user_id: user_id
		}
	});

	if (!expense) {
		return AuthorizationError();
	}

	// TODO: Implement expense scheduler

	await prisma.expenses.delete({
		where: {
			id: expense.id
		}
	});

	return {
		message: 'Expense deleted'
	};
}
