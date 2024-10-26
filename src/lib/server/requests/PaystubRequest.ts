import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/ErrorHelper';

export type TPaystubRequest = {
	paystub_id?: number;
	issuer: string;
	amount_in_cents: number;
	recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'semi-monthly';
	recurrence_interval_one: number;
	recurrence_interval_two?: number;
};

export type TUpdatePaystubRequest = {
	paystub_record_id: number;
	pay_date: Date;
	amount_in_cents: number;
};

export const PaystubSchema = z.object({
	issuer: z.string().min(1).max(50),
	amount_in_cents: z.number().int().positive(),
	recurrence_rate: z.enum(['weekly', 'bi-weekly', 'monthly', 'semi-monthly']),
	recurrence_interval_one: z.number().int().min(1).max(28),
	recurrence_interval_two: z.number().int().min(1).max(28).optional().nullable()
});

export const UpdatePaystubSchema = z.object({
	pay_date: z.string().date(),
	amount_in_cents: z.number().int().positive()
});

export function PaystubRequest(payload: TPaystubRequest): string[] {
	const result = PaystubSchema.safeParse(payload);

	console.log(result.error?.errors);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}

export function UpdatePaystubRequest(payload: TUpdatePaystubRequest): string[] {
	const result = UpdatePaystubSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}
