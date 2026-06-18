import { type SchemaTypeDefinition } from 'sanity'

import author from './author'
import category from './category'
import certification from './certification'
import post from './post'
import settings from './settings'
import visitorCount from './visitorCount'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, certification, settings, visitorCount],
}
