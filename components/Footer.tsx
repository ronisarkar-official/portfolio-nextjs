import Link from 'next/link';
import Socials from './Socials';
// import Socials from "./Socials";

export default function Footer() {
	return (
		<footer className=" bottom-0 left-0 w-full bg-background z-10 mt-2">
			<div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-8 py-4 sm:flex-row-reverse sm:justify-between">
				<Socials />
				<section className="mt-8 text-center sm:mt-0 sm:text-left">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()}{' '}
						<Link
							className="link"
							href="/">
							{process.env.NEXT_PUBLIC_SITE_NAME}. All rights reservered.
						</Link>{' '}
						{/* |{' '}
						<Link
							className="link font-bold"
							href="/privacy">
							privacy?
						</Link> */}
					</p>
				</section>
			</div>
		</footer>
	);
}
