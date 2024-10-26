export function CentsToDollars(cents: number): string {
	return (cents / 100).toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}

export function CentsToDollarsPretty(cents: number): string {
	return `$${CentsToDollars(cents)}`;
}

export function DollarsToCents(dollars: number): number {
	return Math.round(dollars * 100);
}
