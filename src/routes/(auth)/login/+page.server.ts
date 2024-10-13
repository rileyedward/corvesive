import { Login } from '$lib/server/controllers/AuthController';
import { FormPayload } from '$lib/server/helpers/FormHelper';
import type { TLoginRequest } from '$lib/server/requests/LoginRequest';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = (await FormPayload(request)) as TLoginRequest;

		return await Login(payload, cookies);
	}
} satisfies Actions;
