import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import careerData from '@/data/career.json';
import educationData from '@/data/education.json';
import { careerSchema, educationSchema } from '@/lib/schemas';
import Timeline from './Timeline';

export default function Experience() {
	const career = careerSchema.parse(careerData).career;
	const education = educationSchema.parse(educationData).education;

	return (
		<section className="w-full">
			<div className="mb-6 sm:mb-8">
				<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
					Experience
				</h2>
				<p className="text-muted-foreground text-base sm:text-lg">
					A journey through my career and educational milestones
				</p>
			</div>

			<Tabs
				defaultValue="work"
				className="w-full"
				suppressHydrationWarning>
				<TabsList className="grid w-full grid-cols-2 mb-2">
					<TabsTrigger
						value="work"
						className="text-xs sm:text-sm font-medium ">
						Work Experience
					</TabsTrigger>
					<TabsTrigger
						value="education"
						className="text-xs sm:text-sm font-medium">
						Education
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="work"
					className="mt-0">
					<Timeline experience={career} />
				</TabsContent>

				<TabsContent
					value="education"
					className="mt-0">
					<Timeline experience={education} />
				</TabsContent>
			</Tabs>
		</section>
	);
}
