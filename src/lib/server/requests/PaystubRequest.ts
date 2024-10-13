import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/ErrorHelper';

export type TPaystubRequest = {
	issuer: string;
	amount_in_cents: number;
	recurrence_rate: 'weekly' | 'bi-weekly' | 'monthly' | 'bi-monthly';
	recurrence_interval_one: number;
	recurrence_interval_two?: number;
};

export const PaystubSchema = z.object({
	issuer: z.string().min(1).max(50),
	amount_in_cents: z.number().int().positive(),
	recurrence_rate: z.enum(['weekly', 'bi-weekly', 'monthly', 'bi-monthly']),
	recurrence_interval_one: z.number().int().min(1).max(31),
	recurrence_interval_two: z.number().int().min(1).max(31).optional()
});

export function PaystubRequest(payload: TPaystubRequest): string[] {
	const result = PaystubSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	return [];
}
