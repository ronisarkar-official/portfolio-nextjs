import { defineType, defineField } from 'sanity'
import { Award } from 'lucide-react'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the award or achievement (e.g., "1st Place — Vibe-a-thon 2026")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prize',
      title: 'Prize / Position',
      type: 'string',
      description: 'What you won (e.g., "1st Place", "Grand Prize", "Best Innovation")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'grade',
      title: 'Grade / Level',
      type: 'string',
      description: 'Grade or level (e.g., "University Level", "National", "International", "Regional")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date Awarded',
      type: 'date',
      description: 'When you received this award',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JSX', value: 'jsx' },
              { title: 'TSX', value: 'tsx' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
            ],
            withFilename: true,
          },
        },
      ],
      description: 'Detailed description — supports rich text formatting (bold, italic, links). This will be shown in the expandable section.',
    }),
    defineField({
      name: 'referenceLink',
      title: 'Reference / Certificate Link',
      type: 'url',
      description: 'Link to the certificate image, verification page, or project demo. A link icon will appear so visitors can open it in a new tab.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name to display (e.g., "crown", "trophy", "medal", "award", "star", "zap"). Browse icons at lucide.dev/icons. Leave empty for default crown icon.',
      initialValue: 'crown',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (leave empty to sort by date)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'prize',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle}${date ? ` — ${date}` : ''}`,
      }
    },
  },
})
