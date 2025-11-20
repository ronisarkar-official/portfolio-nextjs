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

export function formatRelativeTime(date: string | Date): string {
	if (!date) return '';

	const dateObj = typeof date === 'string' ? new Date(date) : date;
	if (isNaN(dateObj.getTime())) return '';

	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return 'just now';
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
	}

	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
	}

	const diffInYears = Math.floor(diffInDays / 365);
	return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}
