import prisma from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, depends }) => {
	depends('user');

	if (!locals.user) {
		return redirect(302, '/login');
	}

	const user = await prisma.users.findUnique({
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			password: false
		},
		where: { id: locals.user.id }
	});

	if (!user) {
		return redirect(302, '/login');
	}

	return { user };
};
