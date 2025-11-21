import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for SSR with revalidation to ensure fresh data
  perspective: 'published', // Only fetch published documents
  stega: {
    enabled: false,
  },
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We need fresh data for updates
  token: process.env.SANITY_API_TOKEN,
})

