import prisma from '$lib/server/db';

export const RegisterController = async (
	first_name: string,
	last_name: string,
	email: string,
	password: string,
	password_confirm: string
) => {
	await prisma.users.create({
		data: {
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: password
		}
	});
};
