import { defineType, defineField } from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'This is a singleton document for site-wide settings',
      initialValue: 'Site Settings',
      readOnly: true,
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
      description: 'Link to your resume (Google Drive, Dropbox, or direct file URL)',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      description: 'Images displayed in the hero section (max 2 recommended)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'rotatingTitles',
      title: 'Rotating Titles',
      type: 'array',
      description: 'Rotating job titles/descriptions shown on the homepage',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your contact email address',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Your portfolio/personal website URL',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      }),
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Section Content',
      type: 'array',
      description: 'Rich text content for the About section with formatting, links, etc.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
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
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.required().uri({
                      scheme: ['http', 'https', 'mailto']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      resumeUrl: 'resumeUrl',
    },
    prepare({ title, resumeUrl }) {
      return {
        title,
        subtitle: resumeUrl ? `Resume: ${resumeUrl}` : 'No resume URL set',
      }
    },
  },
})
