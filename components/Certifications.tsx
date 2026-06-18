'use client';

import PortableTextContent from '@/components/PortableTextContent';
import { format } from 'date-fns';
import { Crown, Paperclip, ChevronDown, ExternalLink, LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/Accordion';
import Icon from '@/components/Icon';
import type { Award } from '@/lib/sanity';

interface Props {
	awards: Award[];
}

function AwardIcon({ iconName }: { iconName?: string }) {
	if (!iconName || iconName === 'crown') {
		return <Crown className="size-3.5 text-muted-foreground" />;
	}
	return (
		<Icon
			name={iconName as any}
			className="size-3.5 text-muted-foreground"
		/>
	);
}

function AwardRightIcons({ award }: { award: Award }) {
	return (
		<div className="flex items-center gap-1 shrink-0">
			{award.referenceLink && (
				<Tooltip>
					<TooltipTrigger asChild>
						<a
							className="flex size-7 items-center justify-center rounded-md hover:text-muted-foreground transition-colors"
							href={award.referenceLink}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Open reference link"
							onClick={(e) => e.stopPropagation()}>
							<LinkIcon  className="size-3.5" />
						</a>
					</TooltipTrigger>
					<TooltipContent>
						<p>Open in new tab</p>
					</TooltipContent>
				</Tooltip>
			)}
		</div>
	);
}

function AwardMeta({ award }: { award: Award }) {
	return (
		<div className="flex-1 text-left">
			<h3 className="text-sm font-semibold leading-snug">
				{award.title}
			</h3>
			<dl className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
				<dd>{award.prize}</dd>
				<Separator
					orientation="vertical"
					className="!h-3 !w-px"
				/>
				<dd>
					<time dateTime={new Date(award.date).toISOString()}>
						{format(new Date(award.date), 'MM.yyyy')}
					</time>
				</dd>
				<Separator
					orientation="vertical"
					className="!h-3 !w-px"
				/>
				<dd>{award.grade}</dd>
			</dl>
		</div>
	);
}

function AwardItemExpandable({ award }: { award: Award }) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value={award._id} className="border-0">
				<div className="flex items-center">
					{/* Dynamic icon */}
					<div className="mx-4 flex size-7 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted/50">
						<AwardIcon iconName={award.icon} />
					</div>

					{/* Content with dashed left border */}
					<div className="flex-1 border-l border-dashed border-muted-foreground/20">
						<AccordionTrigger className="w-full px-4 py-4 hover:no-underline hover:bg-accent/30 transition-colors [&>svg]:hidden group/trigger">
							<div className="flex flex-1 items-center gap-2">
								<AwardMeta award={award} />
								<AwardRightIcons award={award} />
								<div className="flex size-6 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]/trigger:rotate-180">
									<ChevronDown className="size-4" />
								</div>
							</div>
						</AccordionTrigger>
					</div>
				</div>

				<AccordionContent>
					<div className="ml-[60px] border-l border-dashed border-muted-foreground/20 px-4 pb-2">
						<div className="border-t border-muted-foreground/10 pt-3">
							<PortableTextContent 
								content={award.description} 
								className="!prose-sm text-muted-foreground [&_p]:leading-relaxed [&_p:last-child]:mb-0 [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:text-primary/80" 
							/>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

function AwardItemStatic({ award }: { award: Award }) {
	return (
		<div className="flex items-center">
			{/* Dynamic icon */}
			<div className="mx-4 flex size-7 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted/50">
				<AwardIcon iconName={award.icon} />
			</div>

			{/* Content with dashed left border */}
			<div className="flex-1 border-l border-dashed border-muted-foreground/20">
				<div className="flex items-center gap-2 px-4 py-4">
					<AwardMeta award={award} />
					<AwardRightIcons award={award} />
				</div>
			</div>
		</div>
	);
}

export default function Achievements({ awards }: Props) {
	if (!awards || awards.length === 0) {
		return null;
	}

	return (
		<section className="flex w-full flex-col gap-6" id="achievements">
			<header>
				<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
					Achievements
				</h2>
				<p className="text-muted-foreground text-sm sm:text-base">
					Awards, hackathon wins & certifications
				</p>
			</header>

			<div className="divide-y divide-border rounded-xl border bg-card overflow-hidden">
				{awards.map((award) =>
					award.description && award.description.length > 0 ? (
						<AwardItemExpandable key={award._id} award={award} />
					) : (
						<AwardItemStatic key={award._id} award={award} />
					)
				)}
			</div>
		</section>
	);
}
