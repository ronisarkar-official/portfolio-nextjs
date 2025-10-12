'use client';

import { PostSummary } from '@/lib/posts';
import { ArrowUpDown, Delete } from 'lucide-react';
import { useState } from 'react';
import Posts from './Posts';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/Select';

interface Props {
	posts: PostSummary[];
}

type SortOption = 'newest' | 'oldest' | 'title';

export default function PostsWithSearch({ posts }: Props) {
	const [query, setQuery] = useState('');
	const [sortBy, setSortBy] = useState<SortOption>('newest');

	const filtered = posts
		.filter((post) => {
			// Search filter
			const haystack = [post.title, post.summary, ...(post.tags || [])]
				.join(' ')
				.toLowerCase();

			return haystack.includes(query.toLowerCase());
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return (b.publishedAt || '0000-01-01').localeCompare(
						a.publishedAt || '0000-01-01',
					);
				case 'oldest':
					return (a.publishedAt || '0000-01-01').localeCompare(
						b.publishedAt || '0000-01-01',
					);
				case 'title':
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

	const resetFilter = () => setQuery('');

	return (
		<div className="flex flex-col gap-12">
			<div className="space-y-4">
				{/* Search row */}
				<div className="flex items-center gap-3">
					<Input
						type="text"
						placeholder="Search something..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="flex-1"
					/>
					<Button
						size="sm"
						variant="secondary"
						onClick={resetFilter}
						disabled={query.length === 0}>
						Clear
						<Delete className="ml-2 size-4" />
					</Button>
				</div>

				{/* Sort control */}
				<div className="flex flex-wrap items-center justify-end gap-4">
					<div className="flex items-center space-x-2">
						<ArrowUpDown className="h-4 w-4 text-muted-foreground" />
						<Label className="text-sm text-muted-foreground">Sort:</Label>
						<Select
							value={sortBy}
							onValueChange={(value: SortOption) => setSortBy(value)}>
							<SelectTrigger className="w-[140px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest</SelectItem>
								<SelectItem value="oldest">Oldest</SelectItem>
								<SelectItem value="title">A-Z</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<Posts posts={filtered} />
		</div>
	);
}
