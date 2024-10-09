import { z } from 'zod';

export const RegistrationSchema = z.object({
	first_name: z.string().min(2).max(50),
	last_name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z.string().min(8).max(50),
	password_confirm: z.string().min(8).max(50)
});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(50)
});
