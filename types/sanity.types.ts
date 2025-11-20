// TypeScript types for Sanity documents

export interface SanityAuthor {
  _id: string
  _type: 'author'
  _createdAt: string
  _updatedAt: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  bio?: any[] // Portable Text
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
}

export interface SanityCategory {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}

export interface SanityPost {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  author: SanityAuthor
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
    caption?: string
  }
  categories?: SanityCategory[]
  publishedAt: string
  excerpt: string
  body: any[] // Portable Text
  seo?: {
    metaDescription?: string
    metaKeywords?: string[]
  }
  featured: boolean
  views?: number
}

// Simplified types for listing pages
export interface PostCard {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  author: {
    name: string
    image?: string
  }
  mainImage?: {
    url: string
    alt: string
  }
  categories?: Array<{
    title: string
    slug: string
    color?: string
  }>
  featured: boolean
  views?: number
}
