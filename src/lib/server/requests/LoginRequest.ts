import { z } from 'zod';
import { formatZodErrors } from '$lib/server/helpers/ErrorHelper';
import prisma from '$lib/server/db';
import bcrypt from 'bcrypt';

export type TLoginRequest = {
	email: string;
	password: string;
};

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(50)
});

export async function LoginRequest(payload: TLoginRequest): Promise<string[]> {
	const result = LoginSchema.safeParse(payload);
	if (!result.success) {
		return formatZodErrors(result.error.issues);
	}

	const existingUser = await prisma.users.findFirst({
		where: {
			email: payload.email
		}
	});

	if (!existingUser) {
		return ['User not found'];
	}

	const passwordMatch = await bcrypt.compare(payload.password, existingUser.password);
	if (!passwordMatch) {
		return ['Invalid password'];
	}

	return [];
}
