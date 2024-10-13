import { DollarsToCents } from '$lib/helpers/CurrencyHelper';
import {
	CreatePaystub,
	DeletePaystub,
	UpdatePaystub
} from '$lib/server/controllers/PaystubController';
import {
	UnschedulePaystub,
	UpdatePaystubRecord
} from '$lib/server/controllers/PaystubRecordController';
import { FormPayload } from '$lib/server/helpers/FormHelper.js';
import type {
	TPaystubRequest,
	TUpdatePaystubRequest
} from '$lib/server/requests/PaystubRequest.js';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TPaystubRequest;

		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);
		payload.recurrence_interval_one = parseInt(
			payload.recurrence_interval_one as unknown as string
		);
		payload.recurrence_interval_two =
			parseInt(payload.recurrence_interval_two as unknown as string) || undefined;

		return await CreatePaystub(payload, locals.user.id);
	},
	update: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TPaystubRequest;

		payload.paystub_id = parseInt(payload.paystub_id as unknown as string);
		payload.amount_in_cents = DollarsToCents(
			parseInt(payload.amount_in_cents as unknown as string)
		);
		payload.recurrence_interval_one = parseInt(
			payload.recurrence_interval_one as unknown as string
		);
		payload.recurrence_interval_two =
			parseInt(payload.recurrence_interval_two as unknown as string) || undefined;

		return await UpdatePaystub(payload, payload.paystub_id, locals.user.id);
	},
	remove: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as { paystub_id: number };

		payload.paystub_id = parseInt(payload.paystub_id as unknown as string);

		return await DeletePaystub(payload.paystub_id, locals.user.id);
	},
	manage: async ({ request, locals }) => {
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
