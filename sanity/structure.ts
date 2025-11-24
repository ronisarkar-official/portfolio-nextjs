import type {StructureResolver} from 'sanity/structure'
import { Cog } from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Settings singleton
      S.listItem()
        .title('Site Settings')
        .icon(Cog)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings'].includes(listItem.getId() || '')
      ),
    ])
