import { Login } from '$lib/server/controllers/auth.controller';
import { GetFormPayload } from '$lib/server/helpers/form.helper';
import type { TLoginRequest } from '$lib/server/requests/login.request';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = (await GetFormPayload(request)) as TLoginRequest;

		return Login(payload, cookies);
	}
} satisfies Actions;
