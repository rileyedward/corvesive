import type { TApiResponse } from '$lib/types/ApiTypes';
import prisma from '$lib/server/database/db';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/ErrorHelper';
import {
	UpdatePaystubRequest,
	type TUpdatePaystubRequest
} from '$lib/server/requests/PaystubRequest';

export async function UpdatePaystubRecord(
	payload: TUpdatePaystubRequest,
	paystub_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = UpdatePaystubRequest(payload);
	if (validationErrors.length) {
		return ValidationErrors(validationErrors);
	}

	const paystubRecord = await prisma.paystub_records.findFirst({
		where: {
			id: paystub_record_id,
			user_id: user_id
		}
	});

	if (!paystubRecord) {
		return AuthorizationError();
	}

	await prisma.paystub_records.update({
		where: {
			id: paystubRecord.id
		},
		data: {
			pay_date: payload.pay_date,
			amount_in_cents: payload.amount_in_cents
		}
	});

	return {
		message: 'Paystub updated'
	};
}

export async function UnschedulePaystub(
	paystub_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	const paystubRecord = await prisma.paystub_records.findFirst({
		where: {
			id: paystub_record_id,
			user_id: user_id
		}
	});

	if (!paystubRecord) {
		return AuthorizationError();
	}

	await prisma.paystub_records.delete({
		where: {
			id: paystubRecord.id
		}
	});

	return {
		message: 'Paystub unscheduled'
	};
}
