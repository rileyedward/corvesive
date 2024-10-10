import type { ZodIssue } from 'zod';

export function formatZodErrors(errors: ZodIssue[]): string[] {
	return errors.map((err) => err.message);
}
