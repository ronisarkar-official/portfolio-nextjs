import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We need fresh data for updates
  token: process.env.SANITY_API_TOKEN,
})
