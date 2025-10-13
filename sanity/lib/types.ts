export interface BlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[];
  coverImage: {
    _type: 'image';
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  publishDate: string;
  lastModified?: string;
  category: Category;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  author: string; // Simple string instead of reference
  relatedPosts?: BlogPost[];
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  color: string;
}
