---
title: 'How I Built My Portfolio Website with Next.js 15'
date: '2025-11-15'
coverImage: "https://ik.imagekit.io/2zeqzsn1n/portfolio-image1.webp?updatedAt=1761548870747"
description: 'A comprehensive guide to building a modern, performant portfolio website using Next.js 15, React 19, TypeScript, and cutting-edge web technologies.'
tags: ["nextjs", "react", "typescript", "portfolio", "web-development"]
draft: false
---

# How I Built My Portfolio Website with Next.js 15

As a software developer, having a personal portfolio website is essential for showcasing projects, sharing thoughts, and connecting with potential opportunities. Recently, I rebuilt my portfolio from scratch using the latest web technologies. In this post, I'll walk you through my journey and the technical decisions that went into creating a modern, performant portfolio site.

## Why Rebuild?

My previous portfolio was functional but lacked the polish and performance I wanted. With the release of Next.js 15 and React 19, I saw an opportunity to build something truly modern. I wanted a site that was:

- **Blazingly fast** with optimal performance scores
- **SEO-optimized** for better discoverability  
- **Accessible** and responsive across all devices
- **Maintainable** with clean, type-safe code
- **Feature-rich** with a blog, dark mode, and smooth animations

## Tech Stack Decisions

After evaluating several options, I settled on this tech stack:

### Core Framework: Next.js 15 with App Router
Next.js has become the gold standard for React applications, and version 15 brings significant improvements:
- **App Router**: File-based routing that's intuitive and powerful
- **Server Components**: Better performance and SEO out of the box
- **Built-in optimizations**: Image optimization, font loading, and more

### Language: TypeScript
TypeScript provides excellent developer experience with:
- **Type safety**: Catch errors at compile time
- **Better IDE support**: Autocomplete and refactoring
- **Self-documenting code**: Types serve as documentation

### Styling: Tailwind CSS v4
Tailwind CSS v4 represents a major evolution:
- **Utility-first approach**: Rapid UI development
- **Dark mode support**: Built-in theme switching
- **Performance**: Optimized CSS output
- **Modern features**: CSS variables and advanced selectors

### UI Components: shadcn/ui + Radix UI
For consistent, accessible components:
- **Radix UI primitives**: Unstyled, accessible components
- **shadcn/ui**: Beautiful, customizable component library
- **Tailwind integration**: Seamless styling

### Content Management: Markdown with gray-matter
For the blog system:
- **Markdown**: Easy-to-write content format
- **gray-matter**: Frontmatter parsing for metadata
- **remark**: Markdown processing with syntax highlighting

## Project Setup

Getting started was straightforward with Next.js:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
npm install
```

I added the essential dependencies:

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^4",
    "framer-motion": "^12.23.22",
    "lucide-react": "^0.545.0",
    "gray-matter": "^4.0.3",
    "react-markdown": "^10.1.0",
    "next-themes": "^0.4.6"
  }
}
```

## Building the Components

I structured my components thoughtfully:

### Layout Components
- **Header/Navigation**: Responsive nav with mobile menu
- **Footer**: Social links and contact info
- **ThemeProvider**: Dark/light mode toggle

### Page Components
- **Hero Section**: Animated introduction with typing effect
- **About**: Personal story and skills
- **Projects**: Grid layout with project cards
- **Blog**: List of blog posts with excerpts
- **Contact**: Form with EmailJS integration

### UI Components
Leveraged shadcn/ui for:
- Buttons, cards, dialogs
- Forms and inputs
- Tabs and accordions
- Tooltips and popovers

## Blog System Implementation

The blog was one of the most complex features. Here's how I built it:

### File Structure
```
content/blog/
├── post-1.md
├── post-2.md
└── ...
```

### Frontmatter Format
Each post uses frontmatter for metadata:

```yaml
---
title: "Post Title"
date: "2025-11-15"
description: "Post description"
coverImage: "https://example.com/image.jpg"
tags: ["tag1", "tag2"]
draft: false
---
```

### Processing Pipeline
1. **Read files**: Use Node.js fs to read markdown files
2. **Parse frontmatter**: gray-matter extracts metadata
3. **Process content**: remark converts markdown to HTML
4. **Syntax highlighting**: Shiki for code blocks
5. **Generate pages**: Next.js dynamic routes for each post

### Key Features
- **RSS feed generation**
- **SEO optimization** for each post
- **Reading time estimation**
- **Related posts** suggestions

## Styling and Animations

### Tailwind CSS v4
The new version of Tailwind brought significant improvements:
- **Faster builds**: Improved performance
- **Better CSS**: More efficient output
- **Advanced features**: Container queries, cascade layers

### Framer Motion
For smooth animations:
- **Page transitions**: Route-based animations
- **Scroll animations**: Elements animate on viewport entry
- **Micro-interactions**: Button hovers, loading states

### Dark Mode
Implemented with next-themes:
- **System preference detection**
- **Manual toggle**
- **Smooth transitions**
- **Persistent storage**

## Performance Optimizations

Performance was a top priority:

### Image Optimization
- **Next.js Image component**: Automatic optimization
- **WebP/AVIF formats**: Modern image formats
- **Responsive images**: Different sizes for different devices

### Caching Strategies
- **ISR (Incremental Static Regeneration)**: Hourly revalidation
- **React cache()**: Memoize expensive operations
- **Static assets**: CDN delivery

### Bundle Analysis
- **Code splitting**: Route-based splitting
- **Tree shaking**: Remove unused code
- **Lazy loading**: Components and images

## SEO and Analytics

### SEO Implementation
- **Dynamic metadata**: Page-specific meta tags
- **JSON-LD schema**: Structured data for search engines
- **Sitemap generation**: next-sitemap for automatic sitemaps
- **Open Graph**: Social media sharing

### Analytics
- **Vercel Analytics**: Performance and user metrics
- **Google Analytics**: Detailed user behavior tracking

## Deployment and Hosting

### Vercel Deployment
Vercel was the obvious choice:
- **Next.js optimized**: Perfect integration
- **Global CDN**: Fast worldwide delivery
- **Preview deployments**: Every PR gets a preview
- **Analytics**: Built-in performance monitoring

### Build Configuration
```javascript
// next.config.ts
const config = {
  images: {
    domains: ['ik.imagekit.io'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

## Challenges and Learnings

### TypeScript Migration
Upgrading to React 19 required careful TypeScript updates. The new types were more strict, catching several potential runtime errors.

### Tailwind CSS v4 Adoption
Being an early adopter of Tailwind v4 meant dealing with some breaking changes and learning new APIs. The performance gains were worth it.

### Content Management
Building a custom blog system taught me a lot about content processing pipelines and static site generation.

## Future Plans

I'm excited about potential additions:
- **CMS integration**: Move to a headless CMS
- **Multi-language support**: Internationalization
- **PWA features**: Offline capability
- **Advanced animations**: More interactive elements

## Conclusion

Building this portfolio was an incredible learning experience. Next.js 15 and React 19 provided a solid foundation, while modern tools like Tailwind CSS v4 and shadcn/ui made development enjoyable and efficient.

The result is a fast, accessible, and maintainable website that effectively showcases my work. If you're considering building your own portfolio, I highly recommend this tech stack.

The code is open source on [GitHub](https://github.com/ronisarkar-official/portfolio-nextjs) - feel free to explore and adapt it for your own use!

Happy coding! 🚀
