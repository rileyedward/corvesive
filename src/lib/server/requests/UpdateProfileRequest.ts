import { z } from 'zod';
import { formatZodErrors } from '../helpers/ErrorHelper';
import prisma from '$lib/server/database/db';

export type TUpdateProfileRequest = {
	first_name: string;
	last_name: string;
	email: string;
};

export const UpdateProfileSchema = z.object({
	first_name: z.string().min(2).max(50),
	last_name: z.string().min(2).max(50),
	email: z.string().email()
});

export async function UpdateProfileRequest(
	payload: TUpdateProfileRequest,
	user_id: number
): Promise<string[]> {
	const user = await prisma.users.findUnique({
		where: { id: user_id }
	});

	if (!user) {
		return ['User not found'];
	}

	const result = UpdateProfileSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	if (payload.email !== user.email) {
		const existingEmail = await prisma.users.findFirst({
			where: { email: payload.email }
		});
		if (existingEmail) {
			return ['This email is already taken, please use another one'];
		}
	}

	return [];
}
