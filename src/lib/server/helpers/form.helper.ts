export async function GetFormPayload(request: Request): Promise<Record<string, unknown>> {
	const form = await request.formData();
	return Object.fromEntries(form);
}
