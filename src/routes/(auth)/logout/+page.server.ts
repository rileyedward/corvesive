import prisma from '$lib/server/database/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals }) => {
	cookies.set('ripcord_token', '', { path: '/' });

	if (!locals.user) {
		return redirect(303, '/login');
	}

	const user = await prisma.users.findUnique({
		where: { id: locals.user.id }
	});

	if (user) {
		await prisma.tokens.deleteMany({
			where: {
				user_id: user.id
			}
		});
	}

	return redirect(303, '/login');
};
