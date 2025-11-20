'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function LocalTime() {
	const [time, setTime] = useState<string>('');

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const options: Intl.DateTimeFormatOptions = {
				timeZone: 'Asia/Kolkata',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			};
			setTime(now.toLocaleTimeString('en-US', options));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	// Prevent hydration mismatch by not rendering until client-side
	if (!time) return null;

	return <span>{time} IST</span>;
}
