import type { users } from '@prisma/client';
import prisma from '$lib/server/db';
import jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';

export async function generateToken(user: users, cookies: Cookies): Promise<void> {
	const secret = 'secret';
	const token = jwt.sign({ user }, secret, { expiresIn: '1h' });

	cookies.set('corvesive_token', token, { path: '/' });

	await prisma.tokens.upsert({
		where: { user_id: user.id },
		update: { token: token },
		create: { user_id: user.id, token: token }
	});
}

export const verifyToken = async (token: string) => {
	const secret = 'secret';
	try {
		const decoded = jwt.verify(token, secret);

		const existingToken = await prisma.tokens.findFirst({
			where: { token: token }
		});

		if (!existingToken) {
			throw new Error('Invalid or expired token');
		}

		return decoded;
	} catch {
		throw new Error('Invalid or expired token');
	}
};
