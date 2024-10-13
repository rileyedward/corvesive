import type { TApiResponse } from '$lib/types/api.type';
import prisma from '$lib/server/db';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/errors.helper';
import { PaystubRequest, type TPaystubRequest } from '$lib/server/requests/paystub.request';
import type { paystubs } from '@prisma/client';
import { fail } from '@sveltejs/kit';

export async function CreatePaystub(
	payload: TPaystubRequest,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = PaystubRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const paystub = await prisma.paystubs.create({
		data: {
			user_id: user_id,
			issuer: payload.issuer,
			amount_in_cents: payload.amount_in_cents,
			recurrence_rate: payload.recurrence_rate,
			recurrence_interval_one: payload.recurrence_interval_one,
			recurrence_interval_two: payload?.recurrence_interval_two
		}
	});

	return {
		message: 'Paystub created',
		data: { paystub }
	};
}

export async function UpdatePaystub(
	payload: TPaystubRequest,
	paystub_id: number,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = PaystubRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const paystub = await prisma.paystubs.findFirst({
		where: {
			id: paystub_id,
			user_id: user_id
		}
	});

	if (!paystub) {
		return AuthorizationError();
	}

	const updatedPaystub = await prisma.paystubs.update({
		where: {
			id: paystub.id
		},
		data: {
			issuer: payload.issuer,
			amount_in_cents: payload.amount_in_cents,
			recurrence_rate: payload.recurrence_rate,
			recurrence_interval_one: payload.recurrence_interval_one,
			recurrence_interval_two: payload?.recurrence_interval_two ?? null
		}
	});

	return {
		message: 'Paystub updated',
		data: {
			paystub: updatedPaystub
		}
	};
}

export async function DeletePaystub(paystub_id: number, user_id: number): Promise<TApiResponse> {
	const paystub = await prisma.paystubs.findFirst({
		where: {
			id: paystub_id,
			user_id: user_id
		}
	});

	if (!paystub) {
		return AuthorizationError();
	}

	await prisma.paystubs.delete({
		where: {
			id: paystub_id
		}
	});

	return {
		message: 'Paystub deleted'
	};
}
