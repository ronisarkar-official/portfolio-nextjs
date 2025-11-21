import React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import BackToTop from '@/components/BackToTop';
import { Analytics } from '@vercel/analytics/react';
import EasterEgg from '@/components/EasterEgg';
import CommandMenu from '@/components/CommandMenu';

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
		template: '%s',
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
	creator: 'Roni Sarkar',
	publisher: 'Roni Sarkar',
	applicationName: 'Roni Sarkar Portfolio',
	category: 'technology',
	openGraph: {
		title: 'Roni Sarkar — Software Engineer & Web Developer',
		description:
			'Portfolio of Roni Sarkar — projects, skills, and contact for hired work. Built with Next.js and modern web best practices.',
		url: BASE_URL,
		siteName: 'Roni Sarkar Portfolio',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: 'https://ik.imagekit.io/2zeqzsn1n/portfolio-image1.webp?',
				width: 1200,
				height: 630,
				alt: 'Roni Sarkar — Software Engineer & Web Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Roni Sarkar — Software Engineer & Web Developer',
		description:
			'Portfolio of Roni Sarkar — projects, skills, and contact for hired work.',
		creator: '@ronisarkarDev',
		site: '@ronisarkarDev',
		images: ['https://ik.imagekit.io/2zeqzsn1n/portfolio-image1.webp?'],
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
		apple: '/apple-touch-icon.png',
	},
	// Add verification for Google Search Console (replace with your actual verification code)
	verification: {
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
		// bing: 'your-bing-verification-code',
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Enhanced JSON-LD schema array: Person + WebSite + BreadcrumbList + Organization
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Roni Sarkar',
			url: BASE_URL,
			image: 'https://ik.imagekit.io/2zeqzsn1n/portfolio-image1.webp?',
			sameAs: [
				'https://github.com/ronisarkar-official',
				'https://www.linkedin.com/in/ronisarkar',
				'https://twitter.com/ronisarkarDev',
			],
			jobTitle: 'Software Engineer & Web Developer',
			worksFor: {
				'@type': 'Organization',
				name: 'spechype',
				url: BASE_URL,
			},
			knowsAbout: [
				'Next.js',
				'React',
				'Node.js',
				'TypeScript',
				'JavaScript',
				'Web Development',
				'Software Engineering',
				'Full-Stack Development',
			],
			description:
				'Portfolio of Roni Sarkar, a software engineer specializing in modern web applications with Next.js, React, and Node.js.',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			url: BASE_URL,
			name: 'Roni Sarkar Portfolio',
			description:
				'Portfolio and projects by Roni Sarkar — software engineer and web developer.',
			author: {
				'@type': 'Person',
				name: 'Roni Sarkar',
			},
			inLanguage: 'en-US',
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
		{
			'@context': 'https://schema.org',
			'@type': 'ProfilePage',
			dateCreated: new Date().toISOString().split('T')[0],
			dateModified: new Date().toISOString().split('T')[0],
			mainEntity: {
				'@type': 'Person',
				name: 'Roni Sarkar',
				url: BASE_URL,
			},
		},
	];

	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
			{/* Essential meta tags */}
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>

			{/* Theme color for mobile browsers */}
			<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
			<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
			
			{/* Disable automatic detection and formatting of phone numbers */}
			<meta name="format-detection" content="telephone=no" />
			
			{/* Geo tags - update with your actual location */}
			<meta name="geo.region" content="IN" />
			<meta name="geo.placename" content="India" />
			
			{/* Referrer policy */}
			<meta name="referrer" content="origin-when-cross-origin" />

			{/* Preconnect to external domains */}
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="anonymous"
			/>
			<link
				rel="preconnect"
				href="https://ik.imagekit.io"
				crossOrigin="anonymous"
			/>
			<link
				rel="dns-prefetch"
				href="https://fonts.gstatic.com"
			/>

			{/* Canonical (also provided via metadata) */}
			<link
				rel="canonical"
				href={BASE_URL}
			/>

			{/* Meta tags that some crawlers still expect */}
			<meta
				name="keywords"
				content={
					Array.isArray(metadata.keywords)
						? metadata.keywords.join(', ')
						: metadata.keywords ?? ''
				}
			/>
			
			{/* Author and copyright */}
			<meta name="author" content="Roni Sarkar" />
			<meta name="copyright" content="Roni Sarkar" />
		</head>
			<body
				className={`${jetbrainsMono.variable} antialiased overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<EasterEgg />
					<CommandMenu />
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
