import React from 'react';
import Image from 'next/image';
import ContributionGraph from './contribution-graph';

const About = () => {
	const proseClasses =
		'prose prose-sm max-w-none font-mono text-foreground prose-zinc dark:prose-invert prose-headings:font-sans prose-headings:font-semibold prose-headings:text-balance prose-h2:border-b prose-h2:border-edge prose-h2:pb-2 prose-h2:text-2xl prose-lead:text-base prose-a:font-medium prose-a:break-words prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-edge';

	return (
		<section className="space-y-4">
			<div className="space-y-4">
				<h2 className="text-3xl font-semibold text-foreground">About</h2>
				<div className={proseClasses}>
					<p>
						I&apos;m a full‑stack developer focused on crafting fast,
						accessible, and reliable web experiences. I enjoy turning ideas into
						simple, usable products with thoughtful design and clean code.
					</p>
					<p>
						My current toolkit includes Next.js, React, TypeScript, Tailwind
						CSS, and Node.js. I care about performance, DX, and maintainable
						architectures—shipping features that scale without compromising on
						clarity.
					</p>
					<p>
						When I&apos;m not building, I explore new frameworks, refine UI
						patterns, and work on small experiments that help me learn faster.
					</p>
					<p>Open to interesting collaborations and opportunities.</p>
				</div>
			</div>

			<div className="space-y-4 ">
				<ContributionGraph />
			</div>

			<div className="space-y-4">
				<h3 className="text-3xl font-semibold text-foreground">Tech Stack</h3>
				<div className="flex justify-start">
					<Image
						src="https://skillicons.dev/icons?i=html,css,js,php,mysql,react,tailwind,threejs,nodejs,nextjs,typescript,mongodb,express,github,vscode,sanity"
						alt="Technology stack icons including HTML, CSS, JavaScript, PHP, MySQL, React, Tailwind CSS, Three.js, Node.js, Next.js, TypeScript, MongoDB, Express, GitHub, VS Code, and Sanity"
						width={800}
						height={50}
						className="h-auto w-auto max-w-full"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
};

export default About;
