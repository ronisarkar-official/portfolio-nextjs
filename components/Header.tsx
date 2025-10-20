'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/Button';
import { Menu, X } from 'lucide-react';

const navLinks = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Projects',
		href: '/projects',
	},
	{
		name: 'Blogs',
		href: '/blog',
	},
	{
		name: 'Contact',
		href: '/contact',
	},
];

export default function Header() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const isActive = (href: string) => {
		if (href === '/') return pathname === '/';
		return pathname?.startsWith(href);
	};

	return (
		<header className="sticky top-0 z-50 bg-background/75 backdrop-blur-sm">
			<div className="mx-auto max-w-5xl px-8 py-4">
				<nav className="flex items-center justify-between gap-4">
					{/* Brand */}
					<Link
						href="/"
						className="font-semibold tracking-tight hover:opacity-90">
						<span className="sr-only">Home</span>
						<span aria-hidden>Portfolio</span>
					</Link>

					{/* Desktop nav */}
					<ul className="hidden sm:flex items-center gap-4 sm:gap-6">
						{navLinks.map((nav, id) => (
							<li key={id}>
								<Link
									href={nav.href}
									aria-current={isActive(nav.href) ? 'page' : undefined}
									className={
										isActive(nav.href)
											? 'text-foreground underline underline-offset-8 decoration-2'
											: 'text-muted-foreground hover:text-foreground'
									}>
									{nav.name}
								</Link>
							</li>
						))}
					</ul>

					{/* Right controls */}
					<div className="flex items-center gap-2 sm:gap-3">
						<ThemeToggle />
						{/* Mobile menu button */}
						<Button
							size="icon"
							variant="ghost"
							className="sm:hidden"
							aria-label={open ? 'Close menu' : 'Open menu'}
							aria-expanded={open}
							aria-controls="mobile-nav"
							onClick={() => setOpen((v) => !v)}>
							{open ? <X className="size-5" /> : <Menu className="size-5" />}
						</Button>
					</div>
				</nav>
			</div>

			{/* Mobile overlay and sheet */}
			{open && (
				<div
					role="dialog"
					aria-modal="true"
					className="sm:hidden fixed inset-0 z-[60] bg-background/80 backdrop-blur">
					<div className="mx-auto max-w-3xl px-8">
						<div
							id="mobile-nav"
							className="mt-2 rounded-lg border bg-background p-4 shadow-xl">
							<ul className="flex flex-col gap-2">
								{navLinks.map((nav, id) => (
									<li key={id}>
										<Link
											href={nav.href}
											aria-current={isActive(nav.href) ? 'page' : undefined}
											className={
												isActive(nav.href)
													? 'block rounded-md bg-accent/60 px-3 py-2 text-foreground'
													: 'block rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground'
											}
											onClick={() => setOpen(false)}>
											{nav.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
