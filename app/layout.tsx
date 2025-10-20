// app/layout.tsx
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import BackToTop from '@/components/BackToTop';
import { Analytics } from '@vercel/analytics/next';

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
});

const BASE_URL = 'https://roni-sarkar.vercel.app'; // update if different
const AUTHOR = {
	name: 'Roni Sarkar',
	url: BASE_URL,
};

export const metadata: Metadata = {
	title: {
		default: 'Roni Sarkar — Software Engineer & Web Developer',
		template: '%s | Roni Sarkar',
	},
	description:
		'Roni Sarkar — Software engineer and web developer building modern web apps with Next.js, React and Node.js. Portfolio, projects, blog, and contact.',
	keywords: [
		'Roni Sarkar',
		'software engineer',
		'web developer',
		'Next.js',
		'React',
		'Node.js',
		'portfolio',
		'full stack developer',
	],
	metadataBase: new URL(BASE_URL),
	authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
	openGraph: {
		title: 'Roni Sarkar — Software Engineer & Web Developer',
		description:
			'Portfolio of Roni Sarkar — projects, skills, and contact for hired work. Built with Next.js and modern web best practices.',
		url: BASE_URL,
		siteName: 'ronisarkar',
		images: [
			{
				url: `https://ik.imagekit.io/2zeqzsn1n/ronisarkar.webp?updatedAt=1760951107055`, // generate a good OG image for sharing
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
		creator: 'ronisarkarDev', // replace or remove
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
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Roni Sarkar',
		url: BASE_URL,
		sameAs: [
			'https://github.com/ronisarkar-official', // replace with real profiles
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
	};

	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
				{/* Preconnect fonts, optionally preload LCP image */}
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
				<meta
					name="theme-color"
					content="#0f172a"
				/>
				<link
					rel="canonical"
					href={BASE_URL}
				/>
				{/* Preload your LCP image (if known) */}
				<link
					rel="preload"
					as="image"
					href="/images/hero-lcp.jpg"
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
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<Analytics />
			</body>
		</html>
	);
}
