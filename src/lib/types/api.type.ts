import type { ActionFailure } from '@sveltejs/kit';

export type TApi = {
	message: string;
	data?: string | Record<string, unknown> | Record<string, unknown>[];
	errors?: string[];
};

export type TApiSuccess = TApi;
export type TApiError = ActionFailure<TApi>;

export type TApiResponse = TApiSuccess | TApiError;
