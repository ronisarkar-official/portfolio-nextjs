'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';

export default function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Web Audio API refs
	const audioCtxRef = useRef<AudioContext | null>(null);
	const audioBufferRef = useRef<AudioBuffer | null>(null);

	// Fallback HTMLAudioElement (preloaded)
	const audioElRef = useRef<HTMLAudioElement | null>(null);

	// Path to short click sound — keep it tiny (5-40 KB if possible)
	const AUDIO_URL = '/audio/click.wav';

	useEffect(() => {
		setMounted(true);

		// Create AudioContext and start preloading + decoding
		const Ctor =
			(window as any).AudioContext || (window as any).webkitAudioContext;
		let ctx: AudioContext | null = null;
		let cancelled = false;

		if (Ctor) {
			try {
				ctx = new Ctor();
				audioCtxRef.current = ctx;

				// Fetch and decode audio buffer as early as possible
				fetch(AUDIO_URL)
					.then((r) => r.arrayBuffer())
					.then((arr) => ctx!.decodeAudioData(arr))
					.then((decoded) => {
						if (!cancelled) audioBufferRef.current = decoded;
					})
					.catch((err) => {
						console.warn(
							'WebAudio decode failed, will fallback to HTMLAudioElement',
							err,
						);
					});
			} catch (e) {
				console.warn(
					'AudioContext creation failed, will fallback to HTMLAudioElement',
					e,
				);
			}
		}

		// Prepare fallback HTMLAudioElement and preload it
		const el = new Audio(AUDIO_URL);
		el.preload = 'auto';
		audioElRef.current = el;

		return () => {
			cancelled = true;
			// Close context when unmounting (optional)
			if (audioCtxRef.current) {
				audioCtxRef.current.close().catch(() => {});
				audioCtxRef.current = null;
			}
		};
	}, []);

	const playClick = async () => {
		const ctx = audioCtxRef.current;
		const buffer = audioBufferRef.current;

		if (ctx && buffer) {
			// If the context is suspended (locked by browser), resume it on first real user gesture
			if (ctx.state === 'suspended') {
				try {
					await ctx.resume();
				} catch (e) {
					// if resume fails, fall back
					console.warn(
						'AudioContext resume failed, falling back to HTMLAudioElement',
						e,
					);
				}
			}

			try {
				// Create a fresh source for each click (cheap and expected)
				const src = ctx.createBufferSource();
				src.buffer = buffer;

				// Optional: small gain node if you want volume control
				const gain = ctx.createGain();
				gain.gain.value = 1;

				src.connect(gain).connect(ctx.destination);
				src.start(0);
				// Source auto stops — no need to call stop unless scheduling
				return;
			} catch (err) {
				console.warn(
					'WebAudio play failed, falling back to HTMLAudioElement',
					err,
				);
			}
		}

		// Fallback: HTMLAudioElement (preloaded)
		const el = audioElRef.current;
		if (el) {
			try {
				el.currentTime = 0;
				// play() returns a promise — ignore errors silently
				await el.play().catch(() => {});
			} catch (e) {
				// swallow
			}
		}
	};

	const handleThemeToggle = async () => {
		// Play sound first — faster perceived response
		playClick().catch(() => {});

		// Toggle theme
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	if (!mounted) return null;

	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={handleThemeToggle}>
			{resolvedTheme === 'dark' ?
				<SunIcon className="size-4 text-gray-50" />
			:	<MoonIcon className="size-4 text-black" />}
			<span className="sr-only">Theme Toggle</span>
		</Button>
	);
}
