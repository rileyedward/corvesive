import { Login } from '$lib/server/controllers/auth.controller';
import { FormPayload } from '$lib/server/helpers/form.helper';
import type { TLoginRequest } from '$lib/server/requests/login.request';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = (await FormPayload(request)) as TLoginRequest;

		return Login(payload, cookies);
	}
} satisfies Actions;
