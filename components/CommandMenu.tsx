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
} from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

export default function CommandMenu() {
	const [open, setOpen] = React.useState(false);
	const router = useRouter();
	const { setTheme } = useTheme();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		const toggle = () => setOpen((open) => !open);

		document.addEventListener('keydown', down);
		document.addEventListener('toggle-command-menu', toggle);
		return () => {
			document.removeEventListener('keydown', down);
			document.removeEventListener('toggle-command-menu', toggle);
		};
	}, []);

	const runCommand = React.useCallback((command: () => void) => {
		setOpen(false);
		command();
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
										Search for pages, change theme, or access social links.
									</Dialog.Description>
								</VisuallyHidden>

								<Command className="w-full h-full">
									<div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
										<Search className="w-5 h-5 text-neutral-500 mr-2" />
										<Command.Input
											className="w-full h-12 bg-transparent outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
											placeholder="Type a command or search..."
										/>
									</div>

									<Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-2 scrollbar-hide">
										<Command.Empty className="py-6 text-center text-neutral-500">
											No results found.
										</Command.Empty>

										<Command.Group
											heading="Pages"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												onSelect={() => runCommand(() => router.push('/'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Home className="w-4 h-4" />
												Home
											</Command.Item>
											<Command.Item
												onSelect={() => {
													runCommand(() => {
														if (window.location.pathname === '/') {
															document
																.getElementById('about')
																?.scrollIntoView({ behavior: 'smooth' });
														} else {
															router.push('/#about');
														}
													});
												}}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<User className="w-4 h-4" />
												About
											</Command.Item>
											<Command.Item
												onSelect={() => {
													runCommand(() => {
														if (window.location.pathname === '/') {
															document
																.getElementById('experience')
																?.scrollIntoView({ behavior: 'smooth' });
														} else {
															router.push('/#experience');
														}
													});
												}}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Briefcase className="w-4 h-4" />
												Experience
											</Command.Item>
											<Command.Item
												onSelect={() =>
													runCommand(() => router.push('/projects'))
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Code className="w-4 h-4" />
												Projects
											</Command.Item>
											<Command.Item
												onSelect={() => runCommand(() => router.push('/blog'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<PenTool className="w-4 h-4" />
												Blog
											</Command.Item>
										</Command.Group>
										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										<Command.Group
											heading="General"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
												onSelect={() => runCommand(() => setTheme('light'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Sun className="w-4 h-4" />
												Light Mode
											</Command.Item>
											<Command.Item
												onSelect={() => runCommand(() => setTheme('dark'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Moon className="w-4 h-4" />
												Dark Mode
											</Command.Item>
											<Command.Item
												onSelect={() => runCommand(() => setTheme('system'))}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Laptop className="w-4 h-4" />
												System Theme
											</Command.Item>
											<Command.Item
												onSelect={() =>
													runCommand(() => {
														navigator.clipboard.writeText(
															'ronisarkarofficial@gmail.com',
														);
													})
												}
												className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 transition-colors">
												<Mail className="w-4 h-4" />
												Copy Email
											</Command.Item>
										</Command.Group>

										<Command.Separator className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

										<Command.Group
											heading="Socials"
											className="text-xs font-medium text-neutral-500 mb-2 px-2">
											<Command.Item
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
