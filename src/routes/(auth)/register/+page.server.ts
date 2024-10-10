import { Register } from '$lib/server/controllers/auth.controller';
import type { TRegistrationRequest } from '$lib/server/requests/register.request';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const data = Object.fromEntries(form) as TRegistrationRequest;

		return Register(data, cookies);
	}
} satisfies Actions;
