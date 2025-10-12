/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

// Custom components for Portable Text rendering
const portableTextComponents = {
	types: {
		image: ({ value }: any) => {
			if (!value?.asset) return null;

			return (
				<div className="my-8">
					<img
						src={urlFor(value).width(800).height(400).url()}
						alt={value.alt || ''}
						className="rounded-lg shadow-sm"
					/>
					{value.alt && (
						<p className="mt-2 text-center text-sm text-muted-foreground">
							{value.alt}
						</p>
					)}
				</div>
			);
		},
	},
	marks: {
		strong: ({ children }: any) => (
			<strong className="font-semibold">{children}</strong>
		),
		em: ({ children }: any) => <em className="italic">{children}</em>,
		code: ({ children }: any) => (
			<code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
				{children}
			</code>
		),
		link: ({ children, value }: any) => {
			if (!value?.href) {
				return <span>{children}</span>;
			}

			return (
				<a
					href={value.href}
					target={value.blank ? '_blank' : undefined}
					rel={value.blank ? 'noopener noreferrer' : undefined}
					className="text-primary underline underline-offset-4 hover:text-primary/80">
					{children}
				</a>
			);
		},
	},
	block: {
		h1: ({ children }: any) => (
			<h1 className="mb-4 mt-8 text-3xl font-bold leading-tight">{children}</h1>
		),
		h2: ({ children }: any) => (
			<h2 className="mb-3 mt-6 text-2xl font-bold leading-tight">{children}</h2>
		),
		h3: ({ children }: any) => (
			<h3 className="mb-2 mt-4 text-xl font-semibold leading-tight">
				{children}
			</h3>
		),
		h4: ({ children }: any) => (
			<h4 className="mb-2 mt-3 text-lg font-semibold leading-tight">
				{children}
			</h4>
		),
		normal: ({ children }: any) => (
			<p className="mb-4 leading-relaxed">{children}</p>
		),
		blockquote: ({ children }: any) => (
			<blockquote className="my-6 border-l-4 border-primary/20 pl-6 italic text-muted-foreground">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }: any) => (
			<ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>
		),
		number: ({ children }: any) => (
			<ol className="my-4 list-decimal pl-6 space-y-2">{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }: any) => (
			<li className="leading-relaxed">{children}</li>
		),
		number: ({ children }: any) => (
			<li className="leading-relaxed">{children}</li>
		),
	},
};

interface PortableTextContentProps {
	content: PortableTextBlock[] | PortableTextBlock | null | undefined;
}

export default function PortableTextContent({
	content,
}: PortableTextContentProps) {
	if (!content) return null;

	return (
		<div className="prose prose-lg max-w-none dark:prose-invert">
			<PortableText
				value={content}
				components={portableTextComponents as any}
			/>
		</div>
	);
}
