import Socials from '@/components/Socials';
import AvailabilityBadge from '@/components/AvailabilityBadge';
import TextFlip from '@/components/TextFlip';
import LocalTime from '@/components/LocalTime';
import TechStack from '@/components/TechStack';
import { Button } from '@/components/ui/Button';
import {
	ArrowRightIcon,
	Clock,
	CodeXml,
	FileDown,
	Globe,
	Mail,
	MapPin,
	Mars,
} from 'lucide-react';
import Link from 'next/link';
import Projects from '@/components/Projects';
import LinkWithIcon from '@/components/LinkWithIcon';
import About from '@/components/About';
import Experience from '@/components/Experience';
import { getAllPosts } from '@/lib/markdown';
import BlogCard from '@/components/BlogCard';
import { ImageSwiper } from '@/components/image-swiper';
import { Metadata } from 'next';
import NowPlaying from '@/components/NowPlaying';
import ContributionGraph from '@/components/contribution-graph';
import { QuoteBlock } from '@/components/QuoteBlock';

const LIMIT = 2; // max show 2

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Home',
	description:
		'Roni Sarkar - Full-Stack Developer specializing in Next.js, React, and modern web technologies. View my portfolio, projects, and blog posts.',
};

export default async function Home() {
	const posts = getAllPosts().slice(0, LIMIT);
	const imageUrls =
		'https://ik.imagekit.io/2zeqzsn1n/p-images/hero.webp?,https://ik.imagekit.io/2zeqzsn1n/p-images/profile3.webp';

	return (
		<article className="mt-8 flex flex-col gap-6 pb-16 ">
			<section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
				<div className="mx-auto md:mr-0 md:mx-0">
					<ImageSwiper
						images={imageUrls}
						className="h-[233px] w-[175px] rounded-lg object-cover sm:h-[300px] sm:w-[225px]"
					/>
				</div>

				<div className="flex max-w-[320px] flex-col sm:max-w-full">
					<AvailabilityBadge className="mb-4 w-fit" />
					<h1 className="title text-balance text-4xl sm:text-5xl">
						Hey,I&apos;m{' '}
						<span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
							Roni
						</span>
						👋
					</h1>

					<div
						data-slot="panel-body"
						className=" space-y-2 mt-4">
						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg "
								aria-hidden="true">
								<CodeXml />
							</div>
							<TextFlip
								words={[
									'Full-Stack Developer',
									'UI/UX Enthusiast',
									'Open Source Contributor',
								]}
								className="text-balance"
							/>
						</div>

						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg "
								aria-hidden="true">
								<MapPin />
							</div>
							<p className="text-balance">West Bengal,India</p>
						</div>

						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg "
								aria-hidden="true">
								<Clock />
							</div>
							<p className="text-balance">
								<LocalTime />
							</p>
						</div>

						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg"
								aria-hidden="true">
								<Mail />
							</div>
							<p className="text-balance">
								<a
									className="underline-offset-4 hover:underline"
									href="mailto:ronisarkar10938@gmail.com"
									rel="noopener noreferrer">
									ronisarkar10938@gmail.com
								</a>
							</p>
						</div>
						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg "
								aria-hidden="true">
								<Globe />
							</div>
							<p className="text-balance">
								<a
									className="underline-offset-4 hover:underline"
									href="https://ronisarkar.spechype.com"
									target="_blank"
									rel="noopener noreferrer">
									ronisarkar.spechype.com
								</a>
							</p>
						</div>
						<div className="flex items-center gap-4 font-mono text-sm">
							<div
								className="flex size-6 shrink-0 items-center justify-center rounded-lg "
								aria-hidden="true">
								<Mars />
							</div>
							<p className="text-balance">he/him</p>
						</div>
					</div>

					<section className="mt-6 flex flex-wrap items-center gap-4">
						<Link
							href="https://drive.google.com/file/d/1LUALqh7wvyjfcw2xyT4ofS5aQALpxD6l/view"
							target="_blank">
							<Button variant="outline">
								<span className="font-semibold">Resume</span>
								<FileDown className="ml-2 size-5" />
							</Button>
						</Link>
						<Socials />
					</section>
				</div>
			</section>
<NowPlaying />
			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h2 className="title text-2xl font-semibold text-foreground sm:text-3xl">
						Featured projects
					</h2>
					<LinkWithIcon
						href="/projects"
						position="right"
						icon={<ArrowRightIcon className="size-5" />}
						text="view more"
					/>
				</div>
				<Projects limit={LIMIT} />
			</section>
			<About />
			<TechStack />
			<ContributionGraph />
			<Experience />
			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h2 className="title text-3xl font-semibold text-foreground">
						Recent posts
					</h2>
					<LinkWithIcon
						href="/blog"
						position="right"
						icon={<ArrowRightIcon className="size-5" />}
						text="view more"
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{posts.map((post) => (
						<BlogCard
							key={post.slug}
							post={post}
						/>
					))}
				</div>
				<QuoteBlock />
			</section>
		</article>
	);
}
