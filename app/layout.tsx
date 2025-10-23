import React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import BackToTop from '@/components/BackToTop';
import { Analytics } from '@vercel/analytics/react';

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
});

// Make sure this is the canonical domain you control. Change if needed.
const BASE_URL = 'https://ronisarkar.spechype.com';

export const metadata: Metadata = {
	title: {
		default: 'Roni Sarkar — Software Engineer & Web Developer',
		template: '%s | Roni Sarkar',
	},
	description:
		'Roni Sarkar — Software engineer and web developer building modern web apps with Next.js, React and Node.js. Portfolio, case studies and contact.',
	keywords: [
		'Roni Sarkar',
		'roni sarkar',
		'software engineer',
		'web developer',
		'portfolio',
	],
	metadataBase: new URL(BASE_URL),
	authors: [{ name: 'Roni Sarkar', url: BASE_URL }],
	openGraph: {
		title: 'Roni Sarkar — Software Engineer & Web Developer',
		description:
			'Portfolio of Roni Sarkar — projects, skills, and contact for hired work. Built with Next.js and modern web best practices.',
		url: BASE_URL,
		siteName: 'ronisarkar',
		images: [
			{
				url: 'https://ik.imagekit.io/2zeqzsn1n/ronisarkar.webp?updatedAt=1760951107055',
				width: 1200,
				height: 630,
				alt: 'Roni Sarkar — Software Engineer & Web Developer',
			},
		],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Roni Sarkar — Software Engineer & Web Developer',
		description:
			'Portfolio of Roni Sarkar — projects, skills, and contact for hired work.',
		creator: '@ronisarkarDev',
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: BASE_URL,
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-32x32.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// JSON-LD schema array: Person + WebSite + BreadcrumbList
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Roni Sarkar',
			url: BASE_URL,
			sameAs: [
				'https://github.com/ronisarkar-official',
				'https://www.linkedin.com/in/ronisarkar',
			],
			jobTitle: 'Software Engineer & Web Developer',
			worksFor: {
				'@type': 'Organization',
				name: 'spechype',
				url: BASE_URL,
			},
			description:
				'Portfolio of Roni Sarkar, a software engineer specializing in modern web applications with Next.js, React, and Node.js.',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			url: BASE_URL,
			name: 'Roni Sarkar',
			description:
				'Portfolio and projects by Roni Sarkar — software engineer and web developer.',
			potentialAction: {
				'@type': 'SearchAction',
				target: `${BASE_URL}/search?q={query}`,
				'query-input': 'required name=query',
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Home',
					item: BASE_URL,
				},
			],
		},
	];

	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
				{/* Preconnect fonts */}
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>

				{/* Canonical (also provided via metadata) */}
				<link
					rel="canonical"
					href={BASE_URL}
				/>

				{/* Meta tags that some crawlers still expect */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="keywords"
					content={
						Array.isArray(metadata.keywords)
							? metadata.keywords.join(', ')
							: metadata.keywords ?? ''
					}
				/>

				{/* Optional webmanifest */}
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
			</head>
			<body className={`${jetbrainsMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<Header />
					<BackToTop />

					<div className="mx-auto flex max-w-4xl flex-col px-8">
						<main className="grow">{children}</main>
					</div>
					<Footer />
				</ThemeProvider>

				{/* JSON-LD for rich results */}
				<script
					type="application/ld+json"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				{/* Vercel analytics */}
				<Analytics />
			</body>
		</html>
	);
}
