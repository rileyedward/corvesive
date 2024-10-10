import prisma from '$lib/server/db';
import type { Cookies } from '@sveltejs/kit';
import { LoginRequest, type TLoginRequest } from '../requests/login.request';
import { RegistrationRequest, type TRegistrationRequest } from '../requests/register.request';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/auth.helper';

export async function Register(payload: TRegistrationRequest, cookies: Cookies) {
	const validationErrors = await RegistrationRequest(payload);
	if (validationErrors.length) {
		return {
			error: true,
			message: validationErrors
		};
	}

	const hashedPassword = await bcrypt.hash(payload.password, 10);

	const user = await prisma.users.create({
		data: {
			first_name: payload.first_name,
			last_name: payload.last_name,
			email: payload.email,
			password: hashedPassword
		}
	});

	await generateToken(user, cookies);

	return {
		error: false,
		message: 'Registration successful'
	};
}

export async function Login(payload: TLoginRequest, cookies: Cookies) {
	const validationErrors = await LoginRequest(payload);
	if (validationErrors.length) {
		return {
			error: true,
			message: validationErrors
		};
	}

	const existingUser = await prisma.users.findFirst({
		where: { email: payload.email }
	});

	if (existingUser) {
		await generateToken(existingUser, cookies);

		return {
			error: false,
			message: 'Login successful'
		};
	}

	return {
		error: true,
		message: 'An error occurred'
	};
}
