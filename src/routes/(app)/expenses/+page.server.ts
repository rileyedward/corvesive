import { DollarsToCents } from '$lib/helpers/CurrencyHelper';
import {
	CreateExpense,
	DeleteExpense,
	UpdateExpense
} from '$lib/server/controllers/ExpenseController';
import {
	UnscheduleExpense,
	UpdateExpenseRecord
} from '$lib/server/controllers/ExpenseRecordController';
import { FormPayload } from '$lib/server/helpers/FormHelper';
import type { TExpenseRequest, TUpdateExpenseRequest } from '$lib/server/requests/ExpenseRequest';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TExpenseRequest;

		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);
		payload.due_day_of_month = parseInt(payload.due_day_of_month as unknown as string);

		return await CreateExpense(payload, locals.user.id);
	},
	update: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TExpenseRequest;

		payload.expense_id = parseInt(payload.expense_id as unknown as string);
		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);
		payload.due_day_of_month = parseInt(payload.due_day_of_month as unknown as string);

		return await UpdateExpense(payload, payload.expense_id, locals.user.id);
	},
	remove: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as { expense_id: number };

		payload.expense_id = parseInt(payload.expense_id as unknown as string);

		return await DeleteExpense(payload.expense_id, locals.user.id);
	},
	manage: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TUpdateExpenseRequest;

		payload.expense_record_id = parseInt(payload.expense_record_id as unknown as string);
		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);

		return await UpdateExpenseRecord(payload, payload.expense_record_id, locals.user.id);
	},
	unschedule: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as { expense_record_id: number };

		payload.expense_record_id = parseInt(payload.expense_record_id as unknown as string);

		return await UnscheduleExpense(payload.expense_record_id, locals.user.id);
	}
} satisfies Actions;
