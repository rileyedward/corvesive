import { Register } from '$lib/server/controllers/auth.controller';
import { GetFormPayload } from '$lib/server/helpers/form.helper';
import type { TRegistrationRequest } from '$lib/server/requests/register.request';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = (await GetFormPayload(request)) as TRegistrationRequest;

		return Register(payload, cookies);
	}
} satisfies Actions;
