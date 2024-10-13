import prisma from '$lib/server/database/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, depends }) => {
	depends('user');

	if (!locals.user) {
		return redirect(302, '/login');
	}

	const user = await prisma.users.findUnique({
		where: { id: locals.user.id }
	});

	if (!user) {
		return redirect(302, '/login');
	}

	return { user };
};
