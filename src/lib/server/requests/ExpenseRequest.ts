import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/ErrorHelper';

export type TExpenseRequest = {
	expense_id?: number;
	issuer: string;
	name: string;
	due_day_of_month: number;
	amount_in_cents: number;
	is_variable?: string;
};

export type TUpdateExpenseRequest = {
	expense_record_id: number;
	due_date: Date;
	amount_in_cents: number;
};

export const ExpenseSchema = z.object({
	issuer: z.string().min(1).max(50),
	name: z.string().min(1).max(50),
	due_day_of_month: z.number().int().min(1).max(28),
	amount_in_cents: z.number().int().positive(),
	is_variable: z.string().optional().nullable()
});

export const UpdateExpenseSchema = z.object({
	due_date: z.string().date(),
	amount_in_cents: z.number().int().positive()
});

export function ExpenseRequest(payload: TExpenseRequest): string[] {
	const result = ExpenseSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}

export function UpdateExpenseRequest(payload: TUpdateExpenseRequest): string[] {
	const result = UpdateExpenseSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}
