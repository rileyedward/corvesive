import { Login } from '$lib/server/controllers/auth.controller';
import type { TLoginRequest } from '$lib/server/requests/login.request';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const payload = Object.fromEntries(form) as TLoginRequest;

		return Login(payload, cookies);
	}
} satisfies Actions;
