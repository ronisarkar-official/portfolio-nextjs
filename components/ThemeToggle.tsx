'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { Moon } from './animate-ui/icons/moon';
import { Sun } from './animate-ui/icons/sun';
import { AnimateIcon } from './animate-ui/icons/icon';

export default function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Web Audio API refs
	const audioCtxRef = useRef<AudioContext | null>(null);
	const audioBufferRef = useRef<AudioBuffer | null>(null);

	// Fallback HTMLAudioElement (preloaded)
	const audioElRef = useRef<HTMLAudioElement | null>(null);

	// Track whether audio has been initialized
	const audioInitialized = useRef(false);

	// Path to short click sound — keep it tiny (5-40 KB if possible)
	const AUDIO_URL = '/audio/click.wav';

	useEffect(() => {
		setMounted(true);
	}, []);

	const initAudio = async () => {
		if (audioInitialized.current) return;
		audioInitialized.current = true;

		const Ctor =
			(window as any).AudioContext || (window as any).webkitAudioContext;
		if (Ctor) {
			try {
				const ctx = new Ctor();
				audioCtxRef.current = ctx;
				const response = await fetch(AUDIO_URL);
				const arr = await response.arrayBuffer();
				audioBufferRef.current = await ctx.decodeAudioData(arr);
			} catch {
				// Web Audio failed, will use fallback
			}
		}

		// Prepare fallback HTMLAudioElement
		const el = new Audio(AUDIO_URL);
		el.preload = 'auto';
		audioElRef.current = el;
	};

	const playClick = async () => {
		// Lazy-init audio on first interaction
		await initAudio();
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

	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={handleThemeToggle}>
			{!mounted ? (
				<Sun className="opacity-50" />
			) : resolvedTheme === 'dark' ? (
				<AnimateIcon animateOnHover>
					<Sun />
				</AnimateIcon>
			) : (
				<AnimateIcon animateOnHover>
					<Moon />
				</AnimateIcon>
			)}
			<span className="sr-only">Theme Toggle</span>
		</Button>
	);
}
