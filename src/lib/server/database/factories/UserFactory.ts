import prisma from '$lib/server/database/db';
import { faker } from '@faker-js/faker';
import type { users } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function UserFactory(): Promise<users> {
	const hashedPassword = await bcrypt.hash('password', 10);

	return await prisma.users.create({
		data: {
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.email(),
			password: hashedPassword
		}
	});
}
