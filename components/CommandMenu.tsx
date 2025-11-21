'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
	Command as CommandIcon,
	Home,
	User,
	Code,
	PenTool,
	Mail,
	Github,
	Linkedin,
	Twitter,
	Sun,
	Moon,
	Laptop,
	Search,
	Briefcase,
	Clock,
	Calculator,
	Copy,
	Phone,
	MapPin,
	Globe,
	Download,
	FileText,
	Sparkles,
	Keyboard,
	History,
	Info,
} from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

// Types
interface RecentPage {
	path: string;
	label: string;
	timestamp: number;
}

export default function CommandMenu() {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [recentPages, setRecentPages] = React.useState<RecentPage[]>([]);
	const [currentTime, setCurrentTime] = React.useState('');
	const [calculatorResult, setCalculatorResult] = React.useState<string | null>(null);
	const router = useRouter();
	const { setTheme, theme } = useTheme();

	// Track recent pages
	React.useEffect(() => {
		const stored = localStorage.getItem('recentPages');
		if (stored) {
			try {
				setRecentPages(JSON.parse(stored));
			} catch (e) {
				console.error('Failed to parse recent pages:', e);
			}
		}
	}, []);

	const addRecentPage = React.useCallback((path: string, label: string) => {
		setRecentPages((prev) => {
			const filtered = prev.filter((p) => p.path !== path);
			const updated = [{ path, label, timestamp: Date.now() }, ...filtered].slice(0, 5);
			localStorage.setItem('recentPages', JSON.stringify(updated));
			return updated;
		});
	}, []);

	// Update time every second
	React.useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true,
				}) +
					' • ' +
					now.toLocaleDateString('en-US', {
						weekday: 'short',
						month: 'short',
						day: 'numeric',
					}),
			);
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	// Calculator functionality
	React.useEffect(() => {
		if (!searchValue) {
			setCalculatorResult(null);
			return;
		}

		// Check if the search value is a math expression
		const mathPattern = /^[\d+\-*/.() ]+$/;
		if (mathPattern.test(searchValue)) {
			try {
				// Safe evaluation using Function constructor
				const result = Function(`'use strict'; return (${searchValue})`)();
				if (typeof result === 'number' && !isNaN(result)) {
					setCalculatorResult(`= ${result}`);
				} else {
					setCalculatorResult(null);
				}
			} catch {
				setCalculatorResult(null);
			}
		} else {
			setCalculatorResult(null);
		}
	}, [searchValue]);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
			// ESC to close
			if (e.key === 'Escape' && open) {
				setOpen(false);
			}
		};

		const toggle = () => setOpen((open) => !open);

		document.addEventListener('keydown', down);
		document.addEventListener('toggle-command-menu', toggle);
		return () => {
			document.removeEventListener('keydown', down);
			document.removeEventListener('toggle-command-menu', toggle);
		};
	}, [open]);

	const runCommand = React.useCallback(
		(command: () => void, pagePath?: string, pageLabel?: string) => {
			setOpen(false);
			setSearchValue('');
			if (pagePath && pageLabel) {
				addRecentPage(pagePath, pageLabel);
			}
			command();
		},
		[addRecentPage],
	);

	const copyToClipboard = React.useCallback((text: string, label: string) => {
		navigator.clipboard.writeText(text);
		// You could add a toast notification here
		console.log(`Copied ${label} to clipboard`);
	}, []);

	return (
		<Dialog.Root
			open={open}
			onOpenChange={setOpen}>
			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						<Dialog.Overlay asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild>
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: '-40%' }}
								animate={{ opacity: 1, scale: 1, y: '-50%' }}
								exit={{ opacity: 0, scale: 0.95, y: '-40%' }}
								transition={{
									type: 'spring',
									damping: 25,
									stiffness: 300,
									mass: 0.8,
								}}
								className="fixed top-1/2 left-1/2 -translate-x-1/2 max-w-[640px] w-full bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-[9999] p-2">
								<VisuallyHidden>
									<Dialog.Title>Global Command Menu</Dialog.Title>
									<Dialog.Description>
										Search for pages, calculate, change theme, or access social links.
									</Dialog.Description>
								</VisuallyHidden>

								<Command className="w-full h-full" shouldFilter={false}>
									{/* Header with Time and Keyboard Shortcut */}
									<div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
										<div className="flex items-center gap-2 text-xs text-neutral-500">
											<Clock className="w-3 h-3" />
											<span>{currentTime}</span>
										</div>
										<div className="flex items-center gap-1 text-xs text-neutral-500">
											<kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px]">
												⌘K
											</kbd>
											<span>to toggle</span>
										</div>
									</div>

									{/* Search Input */}
									<div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
										<Search className="w-5 h-5 text-neutral-500 mr-2" />
										<Command.Input
											value={searchValue}
											onValueChange={setSearchValue}
											className="w-full h-12 bg-transparent outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
											placeholder="Type a command or search..."
										/>

									</div>

									<Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden py-2 px-2 scrollbar-hide">
										<Command.Empty className="py-6 text-center text-neutral-500">
											No results found.
										</Command.Empty>

										{/* Calculator Result */}
										{calculatorResult && (
											<>
												<Command.Group
													heading="Calculator"
													className="text-xs font-medium text-neutral-500 mb-2 px-2">
													<Command.Item
														onSelect={() =>
															runCommand(() =>
																copyToClipboard(
																	calculatorResult.replace('= ', ''),
																	'result',
																),
															)
														}
														className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
														<Calculator className="w-4 h-4" />
														<span className="flex-1">{searchValue} <span className="font-semibold">{calculatorResult}</span></span>
														<Copy className="w-3 h-3 text-neutral-400" />
													</Command.Item>
												</Command.Group>
												<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />
											</>
										)}

										{/* Recently Accessed Pages */}
										{recentPages.length > 0 && !searchValue && (
											<>
												<Command.Group
													heading="Recently Accessed"
													className="text-xs font-medium text-neutral-500 mb-2 px-2">
													{recentPages.map((page) => (
														<Command.Item
															key={page.path}
															onSelect={() =>
																runCommand(() => router.push(page.path))
															}
															className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
															<History className="w-4 h-4" />
															<span className="flex-1">{page.label}</span>
															<span className="text-xs text-neutral-400">
																{new Date(page.timestamp).toLocaleDateString()}
															</span>
														</Command.Item>
													))}
												</Command.Group>
												<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />
											</>
										)}

										{/* Pages */}
										<Command.Group
											heading="Pages"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												keywords={['home', 'main', 'index', 'landing']}
												onSelect={() => runCommand(() => router.push('/'), '/', 'Home')}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Home className="w-4 h-4" />
												Home
											</Command.Item>
											<Command.Item
												keywords={['about', 'bio', 'profile', 'info']}
												onSelect={() => {
													runCommand(() => {
														if (window.location.pathname === '/') {
															document
																.getElementById('about')
																?.scrollIntoView({ behavior: 'smooth' });
														} else {
															router.push('/#about');
														}
													}, '/#about', 'About');
												}}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<User className="w-4 h-4" />
												About
											</Command.Item>
											<Command.Item
												keywords={['experience', 'work', 'career', 'jobs', 'resume']}
												onSelect={() => {
													runCommand(() => {
														if (window.location.pathname === '/') {
															document
																.getElementById('experience')
																?.scrollIntoView({ behavior: 'smooth' });
														} else {
															router.push('/#experience');
														}
													}, '/#experience', 'Experience');
												}}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Briefcase className="w-4 h-4" />
												Experience
											</Command.Item>
											<Command.Item
												keywords={['projects', 'portfolio', 'work', 'code', 'github']}
												onSelect={() =>
													runCommand(() => router.push('/projects'), '/projects', 'Projects')
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Code className="w-4 h-4" />
												Projects
											</Command.Item>
											<Command.Item
												keywords={['blog', 'articles', 'writing', 'posts']}
												onSelect={() => runCommand(() => router.push('/blog'), '/blog', 'Blog')}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<PenTool className="w-4 h-4" />
												Blog
											</Command.Item>
										</Command.Group>
										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										{/* Appearance */}
										<Command.Group
											heading="Appearance"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												keywords={['light', 'theme', 'bright', 'day']}
												onSelect={() => runCommand(() => setTheme('light'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Sun className="w-4 h-4" />
												<span className="flex-1">Light Mode</span>
												{theme === 'light' && (
													<span className="text-xs text-emerald-500">●</span>
												)}
											</Command.Item>
											<Command.Item
												keywords={['dark', 'theme', 'night']}
												onSelect={() => runCommand(() => setTheme('dark'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Moon className="w-4 h-4" />
												<span className="flex-1">Dark Mode</span>
												{theme === 'dark' && (
													<span className="text-xs text-emerald-500">●</span>
												)}
											</Command.Item>
											<Command.Item
												keywords={['system', 'theme', 'auto', 'default']}
												onSelect={() => runCommand(() => setTheme('system'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Laptop className="w-4 h-4" />
												<span className="flex-1">System Theme</span>
												{theme === 'system' && (
													<span className="text-xs text-emerald-500">●</span>
												)}
											</Command.Item>
										</Command.Group>

										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										{/* Quick Actions */}
										<Command.Group
											heading="Quick Actions"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												keywords={['copy', 'email', 'contact', 'mail']}
												onSelect={() =>
													runCommand(() =>
														copyToClipboard(
															'ronisarkarofficial@gmail.com',
															'Email',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Mail className="w-4 h-4" />
												<span className="flex-1">Copy Email</span>
												<Copy className="w-3 h-3 text-neutral-400" />
											</Command.Item>
											<Command.Item
												keywords={['copy', 'website', 'url', 'link']}
												onSelect={() =>
													runCommand(() =>
														copyToClipboard(
															'https://ronisarkar.spechype.com',
															'Website URL',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Globe className="w-4 h-4" />
												<span className="flex-1">Copy Website URL</span>
												<Copy className="w-3 h-3 text-neutral-400" />
											</Command.Item>
											<Command.Item
												keywords={['download', 'resume', 'cv', 'pdf']}
												onSelect={() =>
													runCommand(() => {
														// Add your resume download link here
														window.open('/resume.pdf', '_blank');
													})
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Download className="w-4 h-4" />
												Download Resume
											</Command.Item>
											<Command.Item
												keywords={['scroll', 'top', 'beginning']}
												onSelect={() =>
													runCommand(() =>
														window.scrollTo({ top: 0, behavior: 'smooth' }),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Sparkles className="w-4 h-4" />
												Scroll to Top
											</Command.Item>
										</Command.Group>

										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										{/* Social Media */}
										<Command.Group
											heading="Social Media"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												keywords={['github', 'code', 'repository', 'open source']}
												onSelect={() =>
													runCommand(() =>
														window.open(
															'https://github.com/ronisarkar-official',
															'_blank',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Github className="w-4 h-4" />
												GitHub
											</Command.Item>
											<Command.Item
												keywords={['linkedin', 'professional', 'network', 'career']}
												onSelect={() =>
													runCommand(() =>
														window.open(
															'https://www.linkedin.com/in/ronisarkar',
															'_blank',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Linkedin className="w-4 h-4" />
												LinkedIn
											</Command.Item>
											<Command.Item
												keywords={['twitter', 'x', 'social', 'tweets']}
												onSelect={() =>
													runCommand(() =>
														window.open(
															'https://twitter.com/ronisarkarDev',
															'_blank',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Twitter className="w-4 h-4" />
												Twitter
											</Command.Item>
										</Command.Group>

										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										{/* System Info */}
										<Command.Group
											heading="System Info"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												keywords={['info', 'about', 'version']}
												onSelect={() =>
													runCommand(() =>
														alert(
															`Portfolio v1.0\nBuilt with Next.js\n${navigator.userAgent}`,
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Info className="w-4 h-4" />
												System Information
											</Command.Item>
											<Command.Item
												keywords={['keyboard', 'shortcuts', 'keys', 'help']}
												onSelect={() =>
													runCommand(() =>
														alert(
															'Keyboard Shortcuts:\n⌘K - Open command menu\nESC - Close menu\n↑↓ - Navigate items\n↵ - Select item',
														),
													)
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Keyboard className="w-4 h-4" />
												Keyboard Shortcuts
											</Command.Item>
										</Command.Group>
									</Command.List>
								</Command>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
