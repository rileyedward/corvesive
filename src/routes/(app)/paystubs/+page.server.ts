import { CreatePaystub } from '$lib/server/controllers/PaystubController';
import { FormPayload } from '$lib/server/helpers/FormHelper.js';
import type { TPaystubRequest } from '$lib/server/requests/PaystubRequest.js';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TPaystubRequest;

		payload.amount_in_cents = parseInt(payload.amount_in_cents as unknown as string);
		payload.recurrence_interval_one = parseInt(
			payload.recurrence_interval_one as unknown as string
		);
		payload.recurrence_interval_two =
			parseInt(payload.recurrence_interval_two as unknown as string) || undefined;

		return CreatePaystub(payload, locals.user.id);
	}
} satisfies Actions;
