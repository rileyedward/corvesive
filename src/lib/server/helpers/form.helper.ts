export async function FormPayload(request: Request): Promise<Record<string, unknown>> {
	const form = await request.formData();
	return Object.fromEntries(form);
}
