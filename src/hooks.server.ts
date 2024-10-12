import { authorizationMiddleware } from '$lib/server/middleware/auth.middleware';

export const handle = async ({ event, resolve }) => {
	await authorizationMiddleware(event);

	return await resolve(event);
};
