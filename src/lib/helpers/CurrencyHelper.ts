export function CentsToDollars(cents: number): string {
	return (cents / 100).toFixed(2);
}

export function CentsToDollarsPretty(cents: number): string {
	return `$${CentsToDollars(cents)}`;
}

export function DollarsToCents(dollars: number): number {
	return dollars * 100;
}
