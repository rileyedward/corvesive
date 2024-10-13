import { DollarsToCents } from '$lib/helpers/CurrencyHelper';
import {
	UnschedulePaystub,
	UpdatePaystubRecord
} from '$lib/server/controllers/PaystubRecordController';
import { FormPayload } from '$lib/server/helpers/FormHelper';
import type { TUpdatePaystubRequest } from '$lib/server/requests/PaystubRequest';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TUpdatePaystubRequest;

		payload.paystub_record_id = parseInt(payload.paystub_record_id as unknown as string);
		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);

		return await UpdatePaystubRecord(payload, payload.paystub_record_id, locals.user.id);
	},
	unschedule: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as { paystub_record_id: number };

		payload.paystub_record_id = parseInt(payload.paystub_record_id as unknown as string);

		return await UnschedulePaystub(payload.paystub_record_id, locals.user.id);
	}
} satisfies Actions;
