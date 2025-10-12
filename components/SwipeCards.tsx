'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface SwipeCardsProps {
	className?: string;
	count?: number; // how many cards to show from the data
}

const SwipeCards = ({ className, count }: SwipeCardsProps) => {
	const initialCards = useMemo(() => {
		const n = typeof count === 'number' && count > 0 ? count : cardData.length;
		return cardData.slice(0, n);
	}, [count]);

	const [cards, setCards] = useState<Card[]>(initialCards);

	const resetCards = () => {
		setCards(initialCards);
	};

	return (
		<div
			className={cn(
				'relative grid h-[233px] w-[175px] place-items-center',
				className,
			)}>
			{cards.length === 0 && (
				<div
					style={{ gridRow: 1, gridColumn: 1 }}
					className="z-20">
					<Button
						onClick={resetCards}
						variant={'outline'}>
						<RefreshCw className="size-4" />
						Again
					</Button>
				</div>
			)}
			{cards.map((card) => {
				return (
					<Card
						key={card.id}
						cards={cards}
						setCards={setCards}
						{...card}
					/>
				);
			})}
		</div>
	);
};

const Card = ({
	id,
	url,
	setCards,
	cards,
}: {
	id: number;
	url: string;
	setCards: Dispatch<SetStateAction<Card[]>>;
	cards: Card[];
}) => {
	const x = useMotionValue(0);

	const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
	const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

	const isFront = id === cards[cards.length - 1]?.id;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : id % 2 ? 6 : -6;
		return `${rotateRaw.get() + offset}deg`;
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
		if (Math.abs(info.offset.x) > 100) {
			// If swiped far enough, remove the card
			setCards((pv) => pv.filter((v) => v.id !== id));
		} else {
			// Otherwise, animate the card back to the center
			animate(x, 0, {
				type: 'spring',
				stiffness: 400,
				damping: 40,
			});
		}
	};

	return (
		<motion.img
			src={url}
			alt="Placeholder alt"
			className="absolute h-[233px] w-[175px] origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
			style={{
				gridRow: 1,
				gridColumn: 1,
				x,
				opacity,
				rotate,
				boxShadow: isFront
					? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
					: undefined,
			}}
			animate={{
				scale: isFront ? 1 : 0.98,
			}}
			drag={isFront ? 'x' : false}
			dragConstraints={{
				left: -150,
				right: 150,
				top: 0,
				bottom: 0,
			}}
			onDragEnd={handleDragEnd}
		/>
	);
};

export default SwipeCards;

type Card = {
	id: number;
	url: string;
};

const cardData: Card[] = [
	{
		id: 1,
		url: '/img/ted-2019.jpg',
	},
	{
		id: 2,
		url: '/img/ted-2024.jpg',
	},
	{
		id: 3,
		url: '/img/ted.jpg',
	},
];
