import type { users } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			user: users;
		}
	}
}

export {};
