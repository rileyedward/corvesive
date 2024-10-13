import { DatabaseSeeder } from '$lib/server/database/seeders/DatabaseSeeder';

export const load = async () => {
	await DatabaseSeeder();
};
