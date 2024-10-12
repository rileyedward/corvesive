import type { TApiError } from '$lib/types/api.type';
import { fail } from '@sveltejs/kit';
import type { ZodIssue } from 'zod';

export function formatZodErrors(errors: ZodIssue[]): string[] {
	return errors.map((err) => err.message);
}

export function ValidationErrors(errors: string[]): TApiError {
	return fail(422, {
		message: 'Validation failed',
		errors: errors
	});
}

export function ServerError(): TApiError {
	return fail(500, {
		message: 'An error occurred'
	});
}
