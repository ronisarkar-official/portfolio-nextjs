<div align="center">

# 🚀 Roni Sarkar - Full Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, high-performance portfolio website showcasing projects, blog posts, and professional experience.**

[**🌐 Live Demo**](https://ronisarkar.spechype.com) • [**📧 Contact**](https://ronisarkar.spechype.com/contact) • [**📝 Blog**](https://ronisarkar.spechype.com/blog)

</div>

---

## 📸 Preview

<div align="center">
  <img width="1366" height="768" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/af4b56fc-0922-4cbb-8d81-c1e5ff2d151d" />
</div>

---

## ✨ Key Features

<table>
<tr>
<td>

### 🎨 **Modern Design**
- Sleek, responsive UI with dark mode support
- Smooth animations powered by Framer Motion
- Mobile-first, accessible design principles
- Custom command palette (⌘K) for navigation

</td>
<td>

### ⚡ **Performance Optimized**
- Server-side rendering with React Server Components
- Optimized image loading with Next.js Image
- ISR with hourly revalidation
- Comprehensive caching strategies

</td>
</tr>
<tr>
<td>

### 📝 **Content Management**
- Sanity CMS powered blog with rich content
- Real-time view counter for blog posts
- Automatic sitemap generation
- SEO optimized with JSON-LD schema

</td>
<td>

### 🛠️ **Developer Experience**
- Full TypeScript support
- ESLint & Prettier configured
- Component library with shadcn/ui
- Modular, maintainable architecture

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

### **Frontend**
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

### **Backend & CMS**
- **CMS:** [Sanity](https://www.sanity.io/)
- **Content:** Markdown with gray-matter & remark
- **Syntax Highlighting:** [Shiki](https://shiki.matsu.io/)

### **Integrations**
- **Email Service:** EmailJS
- **Analytics:** Vercel Analytics
- **Music Widget:** Spotify API
- **Version Control:** Git & GitHub

### **UI Components**
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- Custom component library

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | 20+ |
| npm/yarn/pnpm | Latest |

### Installation

```bash
# Clone the repository
git clone https://github.com/ronisarkar-official/portfolio-nextjs.git

# Navigate to project directory
cd portfolio-nextjs

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_TO_EMAIL=your_email@example.com
NEXT_PUBLIC_CONTACT_TO_NAME=Your Name

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Spotify Integration
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

[📄 See `.env.example`](.env.example) for a complete template.

---

## 📁 Project Structure

```
portfolio-nextjs/
├── app/                      # Next.js App Router
│   ├── blog/                # Blog pages (Sanity CMS)
│   │   ├── [slug]/         # Individual blog posts
│   │   └── page.tsx        # Blog listing
│   ├── contact/            # Contact form
│   ├── projects/           # Projects showcase
│   ├── studio/             # Sanity Studio
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── CommandMenu.tsx     # Command palette
│   ├── Header.tsx          # Navigation
│   ├── NowPlaying.tsx      # Spotify widget
│   └── ...                 # Other components
├── content/                # Markdown content
│   └── blog/              # Legacy blog posts
├── data/                   # Static data
│   ├── projects.json      # Projects data
│   ├── career.json        # Work experience
│   └── socials.json       # Social links
├── lib/                    # Utilities & helpers
│   ├── sanity.ts          # Sanity client
│   ├── markdown.ts        # Markdown processing
│   ├── schemas.ts         # Type definitions
│   └── utils.ts           # Helper functions
├── public/                 # Static assets
├── sanity/                 # Sanity schemas
└── styles/                # Global styles
```

---

## 🎯 Key Features Deep Dive

### 🎨 Command Palette
Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette for quick navigation.

### 📊 GitHub Activity
Real-time GitHub contribution graph powered by the GitHub GraphQL API.

### 🎵 Now Playing
Live Spotify integration showing currently playing music with album artwork.

### 📈 Blog Analytics
Built-in view counter and reading time estimates for blog posts.

### 🌙 Theme System
Automatic dark mode detection with manual toggle support.

---

## 📝 Content Management

### Adding Blog Posts (Sanity CMS)

1. Navigate to `/studio` in your browser
2. Create a new blog post with:
   - Title, slug, and excerpt
   - Cover image and content blocks
   - Tags and publication date
3. Publish and it will appear automatically

### Adding Projects

Edit `data/projects.json`:

```json
{
  "title": "Project Name",
  "description": "Description",
  "image": "/path/to/image.jpg",
  "tags": ["Next.js", "TypeScript"],
  "github": "https://github.com/user/repo",
  "demo": "https://demo.com"
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ronisarkar-official/portfolio-nextjs)

1. Click the button above or manually import in Vercel
2. Configure environment variables
3. Deploy with one click

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static site
npm run build && npm run export
```

---

## 📈 Performance Optimizations

Recent optimizations (November 2025):

- ✅ **Image Optimization:** Implemented Next.js Image across all components
- ✅ **Caching Strategy:** React cache() wrappers for data fetching
- ✅ **ISR Implementation:** Hourly revalidation for fresh content
- ✅ **SEO Enhancement:** Dynamic metadata and JSON-LD schemas
- ✅ **Code Splitting:** Optimized bundle size with lazy loading
- ✅ **Type Safety:** Fixed TypeScript errors, improved type definitions

See [OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md) for detailed analysis.

---

## 🧪 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for pre-commit hooks (optional)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Connect With Me

<div align="center">

[![Website](https://img.shields.io/badge/🌐-Website-blue?style=for-the-badge)](https://ronisarkar.spechype.com)
[![GitHub](https://img.shields.io/badge/GitHub-ronisarkar--official-181717?style=for-the-badge&logo=github)](https://github.com/ronisarkar-official)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Roni%20Sarkar-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ronisarkar)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:contact@ronisarkar.spechype.com)

</div>

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Built with ❤️ and ☕ by [Roni Sarkar](https://ronisarkar.spechype.com)

</div>
