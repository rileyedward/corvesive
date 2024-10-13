import { authorizationMiddleware } from '$lib/server/middleware/AuthMiddleware';

export const handle = async ({ event, resolve }) => {
	await authorizationMiddleware(event);

	return await resolve(event);
};
