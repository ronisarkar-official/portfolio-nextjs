import { type SchemaTypeDefinition } from 'sanity'

import author from './author'
import category from './category'
import post from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category],
}
