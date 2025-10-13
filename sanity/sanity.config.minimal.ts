import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'AutoSys Sunergy Blog',
  projectId: 'qepvii24',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [],
  },
})
