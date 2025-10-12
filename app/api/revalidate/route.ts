import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { path } = body;

		if (!path) {
			return NextResponse.json({ error: 'Path is required' }, { status: 400 });
		}

		// Revalidate the specified path
		revalidatePath(path);

		return NextResponse.json({
			message: `Successfully revalidated ${path}`,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Revalidation error:', error);
		return NextResponse.json(
			{ error: 'Failed to revalidate' },
			{ status: 500 },
		);
	}
}

// Optional: Add a GET endpoint for manual revalidation
export async function GET() {
	try {
		// Revalidate blog pages
		revalidatePath('/blog');
		revalidatePath('/blog/[slug]', 'page');

		return NextResponse.json({
			message: 'Successfully revalidated blog pages',
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Revalidation error:', error);
		return NextResponse.json(
			{ error: 'Failed to revalidate' },
			{ status: 500 },
		);
	}
}
