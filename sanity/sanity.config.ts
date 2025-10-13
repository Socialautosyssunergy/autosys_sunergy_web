import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {codeInput} from '@sanity/code-input'
import {autoFillPlugin} from './plugins/autoFill'

// Import all schemas from index
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'AutoSys Sunergy CMS',

  projectId: 'qepvii24',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Blog Section
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog Management')
                  .items([
                    S.listItem()
                      .title('Posts')
                      .schemaType('post')
                      .child(S.documentTypeList('post')),
                    S.listItem()
                      .title('Categories')
                      .schemaType('category')
                      .child(S.documentTypeList('category')),
                    S.listItem()
                      .title('Authors')
                      .schemaType('author')
                      .child(S.documentTypeList('author')),
                  ])
              ),
            
            // Product Section
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Product Management')
                  .items([
                    S.listItem()
                      .title('Products')
                      .schemaType('product')
                      .child(S.documentTypeList('product')),
                    S.listItem()
                      .title('Categories')
                      .schemaType('productCategory')
                      .child(S.documentTypeList('productCategory')),
                    S.listItem()
                      .title('Brands')
                      .schemaType('productBrand')
                      .child(S.documentTypeList('productBrand')),
                    S.listItem()
                      .title('Reviews')
                      .schemaType('productReview')
                      .child(S.documentTypeList('productReview')),
                  ])
              ),
          ])
    }),
    codeInput(),
    autoFillPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
