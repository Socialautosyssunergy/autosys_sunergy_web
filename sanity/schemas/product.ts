import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information'
    },
    {
      name: 'details',
      title: 'Product Details'
    },
    {
      name: 'media',
      title: 'Media & Documents'
    },
    {
      name: 'specifications',
      title: 'Specifications'
    },
    {
      name: 'pricing',
      title: 'Pricing & Availability'
    },
    {
      name: 'seo',
      title: 'SEO & Meta'
    }
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: Rule => Rule.required().max(200),
      group: 'basic'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(300),
      group: 'basic'
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 6,
      group: 'basic'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      group: 'basic'
    }),
    defineField({
      name: 'model',
      title: 'Model Number',
      type: 'string',
      group: 'basic'
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'basic'
    }),

    // Product Details
    defineField({
      name: 'efficiency',
      title: 'Efficiency',
      type: 'string',
      description: 'e.g., "22.5%" or "95%"',
      group: 'details'
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity/Power',
      type: 'string',
      description: 'e.g., "550W" or "5kWh"',
      group: 'details'
    }),
    defineField({
      name: 'powerOutput',
      title: 'Power Output',
      type: 'string',
      description: 'Alternative power specification',
      group: 'details'
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'iconName',
              title: 'Icon Name (Lucide)',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'feature',
              subtitle: 'description'
            }
          }
        }
      ],
      group: 'details'
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Application Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Application Description',
              type: 'text',
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description'
            }
          }
        }
      ],
      group: 'details'
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'certificationBody',
              title: 'Certification Body',
              type: 'string'
            },
            {
              name: 'certificate',
              title: 'Certificate Document',
              type: 'file',
              options: {
                accept: '.pdf,.jpg,.jpeg,.png'
              }
            },
            {
              name: 'issueDate',
              title: 'Issue Date',
              type: 'date'
            },
            {
              name: 'expiryDate',
              title: 'Expiry Date',
              type: 'date'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'certificationBody'
            }
          }
        }
      ],
      group: 'details'
    }),
    defineField({
      name: 'compatibleProducts',
      title: 'Compatible Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Compatible Product',
              type: 'reference',
              to: [{ type: 'product' }]
            },
            {
              name: 'compatibilityType',
              title: 'Compatibility Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Direct', value: 'direct' },
                  { title: 'Recommended', value: 'recommended' },
                  { title: 'Optional', value: 'optional' }
                ]
              }
            },
            {
              name: 'notes',
              title: 'Compatibility Notes',
              type: 'text',
              rows: 2
            }
          ]
        }
      ],
      group: 'details'
    }),

    // Media & Documents
    defineField({
      name: 'primaryImage',
      title: 'Primary Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      group: 'media'
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            },
            {
              name: 'imageType',
              title: 'Image Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Product', value: 'product' },
                  { title: 'Installation', value: 'installation' },
                  { title: 'Comparison', value: 'comparison' },
                  { title: 'Certificate', value: 'certificate' }
                ]
              },
              initialValue: 'product'
            }
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'image'
            }
          }
        }
      ],
      group: 'media'
    }),
    defineField({
      name: 'documents',
      title: 'Product Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Document Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'file',
              title: 'Document File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.xls,.xlsx'
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'documentType',
              title: 'Document Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Datasheet', value: 'datasheet' },
                  { title: 'Manual', value: 'manual' },
                  { title: 'Certification', value: 'certification' },
                  { title: 'Specification', value: 'specification' },
                  { title: 'Installation Guide', value: 'installation' },
                  { title: 'Warranty', value: 'warranty' },
                  { title: 'Other', value: 'other' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'documentType'
            }
          }
        }
      ],
      group: 'media'
    }),
    defineField({
      name: 'videos',
      title: 'Product Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Video Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'youtubeUrl',
              title: 'YouTube URL',
              type: 'url',
              validation: Rule => Rule.uri({
                scheme: ['https']
              })
            },
            {
              name: 'description',
              title: 'Video Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'videoType',
              title: 'Video Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Product Demo', value: 'demo' },
                  { title: 'Installation', value: 'installation' },
                  { title: 'Review', value: 'review' },
                  { title: 'Comparison', value: 'comparison' },
                  { title: 'Technical', value: 'technical' }
                ]
              }
            },
            {
              name: 'thumbnail',
              title: 'Custom Thumbnail',
              type: 'image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'videoType'
            }
          }
        }
      ],
      group: 'media'
    }),

    // Specifications
    defineField({
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Specification Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Electrical', value: 'electrical' },
                  { title: 'Physical', value: 'physical' },
                  { title: 'Environmental', value: 'environmental' },
                  { title: 'Performance', value: 'performance' },
                  { title: 'Safety', value: 'safety' },
                  { title: 'General', value: 'general' }
                ]
              }
            },
            {
              name: 'key',
              title: 'Specification Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'unit',
              title: 'Unit',
              type: 'string',
              description: 'e.g., kW, V, A, kg, mm, %'
            }
          ],
          preview: {
            select: {
              title: 'key',
              subtitle: 'value',
              unit: 'unit'
            },
            prepare(selection) {
              const { title, subtitle, unit } = selection
              return {
                title,
                subtitle: `${subtitle}${unit ? ` ${unit}` : ''}`
              }
            }
          }
        }
      ],
      group: 'specifications'
    }),

    // Pricing & Availability
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      description: 'e.g., "₹25,000 - ₹30,000" or "Contact for pricing"',
      group: 'pricing'
    }),
    defineField({
      name: 'moq',
      title: 'Minimum Order Quantity (MOQ)',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'pricing'
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'pricing'
    }),
    defineField({
      name: 'leadTime',
      title: 'Lead Time',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'pricing'
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      group: 'pricing'
    }),
    defineField({
      name: 'rating',
      title: 'Product Rating',
      type: 'number',
      validation: Rule => Rule.min(0).max(5),
      initialValue: 4.5,
      group: 'pricing'
    }),
    defineField({
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
      initialValue: 0,
      group: 'pricing'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      group: 'pricing'
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Product',
      type: 'boolean',
      initialValue: false,
      group: 'pricing'
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      group: 'pricing'
    }),

    // SEO & Meta
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60),
      group: 'seo'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160),
      group: 'seo'
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'seo'
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft',
      group: 'seo'
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'primaryImage',
      category: 'category.name',
      brand: 'brand.name',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, media, category, brand, status } = selection
      return {
        title: `${title}${status !== 'published' ? ` (${status})` : ''}`,
        subtitle: `${brand || 'No Brand'} • ${category || 'No Category'}`,
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
        { field: 'sortOrder', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Popular First',
      name: 'popularFirst',
      by: [
        { field: 'isPopular', direction: 'desc' },
        { field: 'rating', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Recently Added',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    }
  ]
})
