export function ShortDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric'
	});
}

export function FullDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}

export function DayOfWeek(day: number): string {
	return new Date(0, 0, day).toLocaleDateString('en-US', {
		weekday: 'long'
	});
}
