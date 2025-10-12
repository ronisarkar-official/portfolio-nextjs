import { Skeleton } from '@/components/ui/Skeleton';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/Card';

export default function Loading() {
	return (
		<article className="mt-8 flex flex-col gap-12 pb-16">
			{/* Hero Section Skeleton */}
			<section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
				{/* Profile Image Skeleton */}
				<div className="mx-auto md:mr-8 md:mx-0">
					<Skeleton className="h-[233px] w-[175px] rounded-lg sm:h-[300px] sm:w-[225px]" />
				</div>

				{/* Profile Info Skeleton */}
				<div className="flex max-w-[320px] flex-col sm:max-w-full">
					{/* Name Skeleton */}
					<Skeleton className="h-12 w-64 mb-4" />

					{/* Info Items Skeleton */}
					<div className="space-y-2 mt-4">
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-lg" />
							<Skeleton className="h-4 w-32" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-lg" />
							<Skeleton className="h-4 w-40" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-lg" />
							<Skeleton className="h-4 w-48" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-lg" />
							<Skeleton className="h-4 w-36" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="size-6 rounded-lg" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>

					{/* Buttons Skeleton */}
					<section className="mt-6 flex flex-wrap items-center gap-4">
						<Skeleton className="h-10 w-24" />
						<Skeleton className="h-10 w-10" />
						<Skeleton className="h-10 w-10" />
						<Skeleton className="h-10 w-10" />
					</section>
				</div>
			</section>

			{/* About Section Skeleton */}
			<section className="flex flex-col gap-4">
				<Skeleton className="h-8 w-32" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</section>

			{/* Projects Section Skeleton */}
			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-6 w-20" />
				</div>
				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{/* Project Card Skeletons */}
					{[...Array(4)].map((_, i) => (
						<Card
							key={i}
							className="flex flex-col">
							<CardHeader>
								<Skeleton className="h-48 w-full rounded-xl" />
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<Skeleton className="h-6 w-3/4" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							</CardContent>
							<CardFooter className="flex h-full flex-col items-start justify-between gap-4">
								{/* Tags Skeleton */}
								<div className="flex flex-wrap gap-1">
									<Skeleton className="h-5 w-12" />
									<Skeleton className="h-5 w-16" />
									<Skeleton className="h-5 w-10" />
								</div>
								{/* Links Skeleton with Icons */}
								<div className="flex flex-row flex-wrap items-start gap-1">
									<div className="flex gap-2 px-2 py-1">
										<Skeleton className="h-3 w-3 rounded" />
										<Skeleton className="h-4 w-12" />
									</div>
									<div className="flex gap-2 px-2 py-1">
										<Skeleton className="h-3 w-3 rounded" />
										<Skeleton className="h-4 w-16" />
									</div>
								</div>
							</CardFooter>
						</Card>
					))}
				</section>
			</section>

			{/* Experience Section Skeleton */}
			<section className="flex flex-col gap-8">
				<Skeleton className="h-8 w-40" />
				<div className="space-y-4">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="flex gap-4">
							<Skeleton className="h-4 w-4 rounded-full mt-1" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-5 w-1/3" />
								<Skeleton className="h-4 w-1/4" />
								<div className="space-y-1">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-3 w-3/4" />
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Posts Section Skeleton */}
			<section className="flex flex-col gap-8">
				<div className="flex justify-between">
					<Skeleton className="h-8 w-32" />
				</div>
				<div className="space-y-4">
					{[...Array(2)].map((_, i) => (
						<div
							key={i}
							className="space-y-2">
							<Skeleton className="h-6 w-1/2" />
							<Skeleton className="h-4 w-1/4" />
							<div className="space-y-1">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-2/3" />
							</div>
						</div>
					))}
				</div>
			</section>
		</article>
	);
}
