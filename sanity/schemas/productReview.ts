import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productReview',
  title: 'Product Review',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 }
        ]
      }
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0]
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Avatar',
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
      name: 'isFeatured',
      title: 'Featured Review',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Purchase',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes for review moderation'
    })
  ],

  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewText',
      media: 'avatar',
      rating: 'rating',
      status: 'status',
      product: 'product.title'
    },
    prepare(selection) {
      const { title, subtitle, media, rating, status, product } = selection
      const stars = '★'.repeat(rating || 0)
      return {
        title: `${title} (${stars})`,
        subtitle: `${product || 'No Product'} • ${status}`,
        media
      }
    }
  },

  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'rating', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }]
    },
    {
      title: 'Most Recent',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ]
})
