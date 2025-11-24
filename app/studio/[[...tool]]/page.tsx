'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import { useEffect } from 'react';

export default function StudioPage() {
	// Suppress React 19 warning about disableTransition prop
	// This is a known issue with Sanity Studio and will be fixed in future versions
	// https://github.com/sanity-io/next-sanity/issues/822
	useEffect(() => {
		const originalError = console.error;
		console.error = (...args) => {
			if (
				typeof args[0] === 'string' &&
				args[0].includes('disableTransition')
			) {
				return;
			}
			originalError.apply(console, args);
		};

		return () => {
			console.error = originalError;
		};
	}, []);

	return <NextStudio config={config} />;
}
