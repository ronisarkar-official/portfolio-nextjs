import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
	if (!date) return 'No date';

	const dateObj = typeof date === 'string' ? new Date(date) : date;

	// Check if the date is valid
	if (isNaN(dateObj.getTime())) {
		return 'Invalid date';
	}

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(dateObj);
}
