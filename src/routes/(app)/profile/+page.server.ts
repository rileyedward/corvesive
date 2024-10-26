import { UpdateProfile } from '$lib/server/controllers/ProfileController.js';
import { FormPayload } from '$lib/server/helpers/FormHelper.js';
import type { TUpdateProfileRequest } from '$lib/server/requests/UpdateProfileRequest.js';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const payload = (await FormPayload(request)) as TUpdateProfileRequest;

		return await UpdateProfile(payload, locals.user.id);
	}
} satisfies Actions;
