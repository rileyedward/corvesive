import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/errors.helper';
import prisma from '$lib/server/db';

export type TRegistrationRequest = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	password_confirm: string;
};

export const RegistrationSchema = z.object({
	first_name: z.string().min(2).max(50),
	last_name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z.string().min(8).max(50),
	password_confirm: z.string().min(8).max(50)
});

export async function RegistrationRequest(payload: TRegistrationRequest): Promise<string[]> {
	const result = RegistrationSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	if (payload.password !== payload.password_confirm) {
		return ['Passwords do not match'];
	}

	const existingUser = await prisma.users.findFirst({
		where: { email: payload.email }
	});
	if (existingUser) {
		return ['This email is already taken, please use another one'];
	}

	return [];
}
