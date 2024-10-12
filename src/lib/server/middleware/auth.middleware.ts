import { verifyToken } from '$lib/server/helpers/auth.helper';
import type { users } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export const authorizationMiddleware = async (event: RequestEvent) => {
	const cookie = event.request.headers.get('cookie');
	const token = cookie?.split('corvesive_token=')[1]?.split(';')[0];

	try {
		if (token) {
			const decoded = await verifyToken(token);
			if (typeof decoded === 'object' && decoded !== null && 'user' in decoded) {
				event.locals.user = (decoded as { user: users }).user;
			}
		}
	} catch (err) {
		console.error('Token verification failed:', err);
	}
};
