'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { Button } from './ui/Button';

export default function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		setMounted(true);
		// Create audio element when component mounts
		audioRef.current = new Audio('/audio/click.wav');
	}, []);

	const handleThemeToggle = () => {
		// Play sound
		if (audioRef.current) {
			audioRef.current.currentTime = 0; // Reset audio to start
			audioRef.current.play().catch(err => console.error('Error playing sound:', err));
		}
		// Toggle theme
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	if (!mounted) {
		return null;
	}

	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={handleThemeToggle}>
			{resolvedTheme === 'dark' ? (
				<SunIcon className="size-4 text-orange-300" />
			) : (
				<MoonIcon className="size-4 text-indigo-500" />
			)}
			<span className="sr-only">Theme Toggle</span>
		</Button>
	);
}
