import { CreatePaystub } from '$lib/server/controllers/PaystubController';
import { FormPayload } from '$lib/server/helpers/FormHelper.js';
import type { TPaystubRequest } from '$lib/server/requests/PaystubRequest.js';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TPaystubRequest;

		return CreatePaystub(payload, locals.user.id);
	}
} satisfies Actions;
