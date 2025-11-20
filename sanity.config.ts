import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'

import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'My Portfolio Blog',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],

  schema,
})
