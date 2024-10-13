import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/ErrorHelper';

export type TExpenseRequest = {
	issuer: string;
	name: string;
	due_day_of_month: number;
	amount_in_cents: number;
	is_variable: boolean;
};

export type TRescheduleExpenseRequest = {
	due_date: Date;
};

export type TUpdateExpenseRequest = {
	amount_in_cents: number;
};

export const ExpenseSchema = z.object({
	issuer: z.string().min(1).max(50),
	name: z.string().min(1).max(50),
	amount_in_cents: z.number().int().positive(),
	is_variable: z.boolean()
});

export const RescheduleExpenseSchema = z.object({
	due_date: z.date()
});

export const UpdateExpenseSchema = z.object({
	amount_in_cents: z.number().int().positive()
});

export function ExpenseRequest(payload: TExpenseRequest): string[] {
	const result = ExpenseSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}

export function RescheduleExpenseRequest(payload: TRescheduleExpenseRequest): string[] {
	const result = RescheduleExpenseSchema.safeParse(payload);
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
