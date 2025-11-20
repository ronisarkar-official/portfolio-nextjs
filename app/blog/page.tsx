'use client';

import SanityBlogCard from '@/components/blog/SanityBlogCard';
import { getAllSanityPosts, getAllCategories } from '@/lib/sanity';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BlogPage() {
	const [posts, setPosts] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch posts and categories on mount
	useEffect(() => {
		async function fetchData() {
			try {
				const [fetchedPosts, fetchedCategories] = await Promise.all([
					getAllSanityPosts(),
					getAllCategories(),
				]);
				setPosts(fetchedPosts);
				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Error fetching blog data:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	// Filter posts based on search query and selected category
	const filteredPosts = posts.filter((post) => {
		const matchesSearch =
			searchQuery === '' ||
			post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.categories?.some((cat: any) =>
				cat.title?.toLowerCase().includes(searchQuery.toLowerCase())
			);

		const matchesCategory =
			!selectedCategory ||
			post.categories?.some((cat: any) => cat.slug === selectedCategory);

		return matchesSearch && matchesCategory;
	});

	return (
		<article className="mt-8 flex flex-col gap-8 pb-16">
			<div className="flex flex-col gap-4">
				<h1 className="title text-4xl font-bold">My Blogs</h1>
				<p className="text-muted-foreground">
					Thoughts, tutorials, and insights about web development and technology.
				</p>
			</div>

			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Search blogs by title, description, or category..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full rounded-lg border border-border bg-card pl-10 pr-10 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				/>
				{searchQuery && (
					<button
						onClick={() => setSearchQuery('')}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Clear search"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>

			{/* Categories Filter */}
			{categories.length > 0 && (
				<div className="flex flex-wrap gap-2">
					<span className="text-sm font-medium text-muted-foreground">
						Categories:
					</span>
					<button
						onClick={() => setSelectedCategory(null)}
						className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
							selectedCategory === null
								? 'border-primary bg-primary text-primary-foreground'
								: 'border-border bg-card hover:bg-muted'
						}`}
					>
						All
					</button>
					{categories.map((category: any) => (
						<button
							key={category.slug}
							onClick={() => setSelectedCategory(category.slug)}
							className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
								selectedCategory === category.slug
									? 'border-primary bg-primary text-primary-foreground'
									: 'border-border bg-card hover:bg-muted'
							}`}
						>
							{category.title} ({category.postCount})
						</button>
					))}
				</div>
			)}

			{/* Loading State */}
			{isLoading ? (
				<div className="rounded-lg border border-border bg-card p-12 text-center">
					<p className="text-lg text-muted-foreground">Loading posts...</p>
				</div>
			) : /* No Results */
			filteredPosts.length === 0 ? (
				<div className="rounded-lg border border-border bg-card p-12 text-center">
					<p className="text-lg text-muted-foreground">
						{searchQuery || selectedCategory
							? 'No posts found matching your criteria.'
							: 'No posts published yet. Check back soon!'}
					</p>
				</div>
			) : (
				/* Posts Grid */
				<>
					{(searchQuery || selectedCategory) && (
						<div className="text-sm text-muted-foreground">
							Showing {filteredPosts.length} of {posts.length} post
							{posts.length !== 1 ? 's' : ''}
						</div>
					)}
					<div className="grid gap-6 md:grid-cols-2">
						{filteredPosts.map((post) => (
							<SanityBlogCard key={post._id} post={post} />
						))}
					</div>
				</>
			)}
		</article>
	);
}
