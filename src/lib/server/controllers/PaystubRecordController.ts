import type { TApiResponse } from '$lib/types/ApiTypes';
import prisma from '$lib/server/database/db';
import { AuthorizationError, ValidationErrors } from '$lib/server/helpers/ErrorHelper';
import {
	ReschedulePaystubRequest,
	UpdatePaystubRequest,
	type TReschedulePaystubRequest,
	type TUpdatePaystubRequest
} from '$lib/server/requests/PaystubRequest';

export async function ReschedulePaystub(
	payload: TReschedulePaystubRequest,
	paystub_record_id: number,
	user_id: number
): Promise<TApiResponse> {
	const validationErrors = ReschedulePaystubRequest(payload);
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
			pay_date: payload.pay_date
		}
	});

	return {
		message: 'Paystub rescheduled'
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
			amount_in_cents: payload.amount_in_cents
		}
	});

	return {
		message: 'Paystub updated'
	};
}
