const siteUrl =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://roni-sarkar.vercel.app';

const llmsTxt = `# Roni Sarkar — Software Engineer & Web Developer
> Full-stack developer portfolio showcasing projects, blog posts, and technical experience.

## Pages
- [Home](${siteUrl}/): Portfolio homepage with bio, tech stack, and featured projects
- [Projects](${siteUrl}/projects): Complete project portfolio
- [Blog](${siteUrl}/blog): Technical blog posts
- [Contact](${siteUrl}/contact): Contact information

## Key Facts
- Full-stack developer specializing in Next.js, React, TypeScript, Tailwind CSS, and Node.js
- MCA student at Techno India University
- First place winner of VIBE-ATHON 2026 — built Read X, an AI-powered OCR platform for 20+ Indian languages
- Built a full-stack HRMS in 8 hours for Odoo Hackathon 2026
- Tech stack: Next.js, Supabase, TypeScript, Tailwind CSS, Motion, shadcn/ui, TanStack
- Currently open to interesting collaborations and opportunities

## Social
- LinkedIn: https://linkedin.com/in/ronisarkar
- GitHub: https://github.com/ronisarkar-official
- X: https://x.com/ronisarkarDev

## Featured Projects
- [HR Management System](https://hr-management-system-tan.vercel.app/): Full-stack HRMS with role-based auth, attendance tracking, leave management, and payroll
- [Read X](https://readx-six.vercel.app): AI-powered OCR for 20+ Indian languages using Google Gemini — VIBE-ATHON 2026 winner
`;

export async function GET() {
	return new Response(llmsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
