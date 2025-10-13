// GROQ queries for blog posts
export const blogPostsQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishDate desc) {
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
    featured,
    author
  }
`;

export const singleBlogPostQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    publishDate,
    lastModified,
    category->{
      name,
      slug,
      color
    },
    tags,
    metaTitle,
    metaDescription,
    featured,
    author,
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      publishDate,
      category->{
        name,
        slug,
        color
      }
    }
  }
`;

export const featuredBlogPostsQuery = `
  *[_type == "post" && featured == true && !(_id in path("drafts.**"))] | order(publishDate desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishDate,
    category->{
      name,
      slug,
      color
    },
    tags,
    author
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description
  }
`;

export const postsByCategoryQuery = `
  *[_type == "post" && category._ref == $categoryId && !(_id in path("drafts.**"))] | order(publishDate desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishDate,
    tags,
    author
  }
`;
