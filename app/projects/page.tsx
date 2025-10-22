import Projects from '@/components/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Explore my portfolio of web development projects, showcasing expertise in Next.js, React, and modern web technologies.',
};

// Revalidate every 6 hours
export const revalidate = 21600;

export default async function ProjectPage() {
	return (
		<article className="mt-8 flex flex-col gap-8 pb-16">
			<h1 className="title">My Works</h1>

			<Projects />
		</article>
	);
}
