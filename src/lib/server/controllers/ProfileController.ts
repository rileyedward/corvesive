import type { TApiResponse } from '$lib/types/ApiTypes';
import {
	UpdateProfileRequest,
	type TUpdateProfileRequest
} from '$lib/server/requests/UpdateProfileRequest';
import { ValidationErrors } from '../helpers/ErrorHelper';
import prisma from '../database/db';

export async function UpdateProfile(
	payload: TUpdateProfileRequest,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = await UpdateProfileRequest(payload, user_id);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	await prisma.users.update({
		where: {
			id: user_id
		},
		data: {
			first_name: payload.first_name,
			last_name: payload.last_name,
			email: payload.email
		}
	});

	return {
		message: 'Profile updated'
	};
}
