// import Experience from "@/components/Experience";
// import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from '@/components/Posts';
// import Projects from "@/components/Projects";
import Socials from '@/components/Socials';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
// import { getPosts } from "@/lib/posts";
import {
	ArrowRightIcon,
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
import { getPosts } from '../lib/posts';

// const BIRTH_YEAR = 2004;
const LIMIT = 2; // max show 2

export default async function Home() {
	const posts = (await getPosts())
		.filter((post) => !post.draft)
		.slice(0, LIMIT);

	return (
		<article className="mt-8 flex flex-col gap-12 pb-16 ">
			<section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
				<div className="mx-auto md:mr-8 md:mx-0">
					<Image
						src="/profile.jpg"
						alt="Roni profile photo"
						width={350}
						height={466}
						className="h-[233px] w-[175px] rounded-lg object-cover sm:h-[300px] sm:w-[225px]"
						priority
					/>
				</div>

				<div className="flex max-w-[320px] flex-col sm:max-w-full">
					<h1 className="title text-balance text-4xl sm:text-5xl">
						Hey, I&apos;m{' '}
						<span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
							Roni
						</span>{' '}
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
							<p className="text-balance">Full-Stack Developer</p>
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
									href="https://roni-sarkar.vercel.app"
									target="_blank"
									rel="noopener noreferrer">
									roni-sarkar.vercel.app
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

			<About />

			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h2 className="title text-2xl sm:text-3xl">featured projects</h2>
					<LinkWithIcon
						href="/projects"
						position="right"
						icon={<ArrowRightIcon className="size-5" />}
						text="view more"
					/>
				</div>
				<Projects limit={LIMIT} />
			</section>
			<Experience />
			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h2 className="title text-3xl">recent posts</h2>
					<LinkWithIcon
						href="/blog"
						position="right"
						icon={<ArrowRightIcon className="size-5" />}
						text="view more"
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="block p-4 border rounded-lg"
							aria-label={`Read post: ${post.title}`}>
							{post.coverImage ?
								<img
									src={post.coverImage}
									alt={post.title || ''}
									width={600}
									height={200}
									loading="lazy"
									decoding="async"
									className="w-full h-48 rounded-lg mb-2  "
								/>
							:	<div className="w-full h-48 rounded-lg mb-2 bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm">
									No image
								</div>
							}

							<h2 className="text-xl font-bold mb-2">{post.title}</h2>

							<p className="text-sm text-gray-500 mb-2">
								<time dateTime={post.date || ''}>
									{post.date || 'Unknown date'}
								</time>
								{post.readingTime ? ` · ${post.readingTime}` : ''}
							</p>
						</Link>
					))}
				</div>
			</section>
		</article>
	);
}
