# Roni Sarkar - Portfolio

A modern, performant portfolio website built with Next.js 15, React 19, and TypeScript. Features optimized images, server-side rendering, and comprehensive SEO.

## ✨ Features

- **Modern Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Optimized Performance**: Image optimization, caching strategies, React Server Components
- **Blog System**: Markdown-based blog with syntax highlighting
- **Dark Mode**: System-aware theme with manual toggle
- **SEO Optimized**: Comprehensive metadata, JSON-LD schema, sitemap generation
- **Responsive Design**: Mobile-first approach with smooth animations
- **Contact Form**: EmailJS integration for direct messaging

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_TO_EMAIL=your_email
NEXT_PUBLIC_CONTACT_TO_NAME=Your Name
```

## 📁 Project Structure

```
portfolio-main-nextjs/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact form
│   ├── projects/          # Projects showcase
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── content/              # Markdown blog posts
│   └── blog/            
├── data/                 # JSON data files
│   ├── projects.json    # Projects data
│   ├── career.json      # Work experience
│   └── socials.json     # Social links
├── lib/                  # Utility functions
│   ├── markdown.ts      # Blog post processing
│   ├── schemas.ts       # Zod validation schemas
│   └── utils.ts         # Helper functions
└── public/              # Static assets

```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **UI Components**: shadcn/ui, Radix UI
- **Content**: Markdown with gray-matter, remark
- **Code Highlighting**: Shiki
- **Form Handling**: EmailJS
- **Analytics**: Vercel Analytics
- **Icons**: Lucide React

## 📈 Optimizations (Oct 2025)

Recent comprehensive optimization pass included:
- ✅ Removed dangerous build configuration flags
- ✅ Implemented Next.js Image optimization across all components
- ✅ Added React cache() wrappers for data fetching
- ✅ Implemented ISR with hourly revalidation
- ✅ Enhanced SEO with dynamic metadata
- ✅ Optimized React components with useCallback and memo
- ✅ Fixed TypeScript errors and improved type safety

See [OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md) for detailed changes.

## 📝 Adding Blog Posts

Create a new `.md` file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-01"
excerpt: "Brief description"
coverImage: "https://example.com/image.jpg"
tags: ["nextjs", "react"]
draft: false
---

Your content here...
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site**: [ronisarkar.spechype.com](https://ronisarkar.spechype.com)
- **GitHub**: [@ronisarkar-official](https://github.com/ronisarkar-official)
- **LinkedIn**: [Roni Sarkar](https://www.linkedin.com/in/ronisarkar)

---

Built with ❤️ by [Roni Sarkar](https://ronisarkar.spechype.com)
