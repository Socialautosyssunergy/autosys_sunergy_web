import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qepvii24',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // Required for preview mode and mutations
});

// Image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate optimized image URLs
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Preview mode helpers
export const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getPreviewPostBySlug = async (slug: string) => {
  const data = await previewClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      publishDate,
      category->{
        name,
        slug,
        color
      },
      tags,
      metaTitle,
      metaDescription,
      author->{
        name,
        role,
        bio,
        image
      }
    }`,
    { slug }
  );
  return data;
};
