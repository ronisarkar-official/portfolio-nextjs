'use client';

import React, { useMemo } from 'react';
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import Timeline from '@/components/Timeline';
import careerData from '@/data/career.json';
import educationData from '@/data/education.json';
import { careerSchema, educationSchema } from '@/lib/schemas';

export default function Experience() {
	// Parse once — memoize so Zod doesn't re-validate on every render
	const career = useMemo(() => careerSchema.parse(careerData).career, []);
	const education = useMemo(
		() => educationSchema.parse(educationData).education,
		[],
	);

	return (
		<section className="flex w-full flex-col gap-6" id="experience">
			<header>
				<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
					Experience
				</h2>
				<p className="text-muted-foreground text-base sm:text-lg">
					A journey through my career and educational milestones
				</p>
			</header>

			<Tabs
				defaultValue="career"
				className="w-full">
				<TabsList className="w-full grid grid-cols-2 gap-2">
					<TabsTrigger value="career">Career</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
				</TabsList>

				<TabsContents className=" w-full">
					<TabsContent
						value="career"
						className="mt-0">
						<Timeline experience={career} />
					</TabsContent>

					<TabsContent
						value="education"
						className="mt-0">
						<Timeline experience={education} />
					</TabsContent>
				</TabsContents>
			</Tabs>
		</section>
	);
}


