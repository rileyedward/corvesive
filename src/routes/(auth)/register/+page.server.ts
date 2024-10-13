import { Register } from '$lib/server/controllers/AuthController';
import { FormPayload } from '$lib/server/helpers/FormHelper';
import type { TRegistrationRequest } from '$lib/server/requests/RegisterRequest';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = (await FormPayload(request)) as TRegistrationRequest;

		return Register(payload, cookies);
	}
} satisfies Actions;
