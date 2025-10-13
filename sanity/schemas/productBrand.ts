import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productBrand',
  title: 'Product Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url'
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string'
    }),
    defineField({
      name: 'establishedYear',
      title: 'Established Year',
      type: 'number'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'logo',
      active: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, media, active } = selection
      return {
        title: `${title}${!active ? ' (Inactive)' : ''}`,
        subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Country',
      name: 'country',
      by: [{ field: 'country', direction: 'asc' }]
    }
  ]
})
