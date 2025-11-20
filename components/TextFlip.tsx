'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TextFlipProps {
	words: string[];
	className?: string;
}

export default function TextFlip({ words, className }: TextFlipProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length);
		}, 2500);

		return () => clearInterval(interval);
	}, [words.length]);

	return (
		<div className={className}>
			<AnimatePresence mode="wait">
				<motion.div
					key={words[index]}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -5, opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className="inline-block">
					{words[index]}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
