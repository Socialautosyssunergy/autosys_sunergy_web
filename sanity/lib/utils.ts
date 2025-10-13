// Helper function to generate tags from blog content
export const generateTagsFromContent = (content: string): string[] => {
  const commonSolarTerms = [
    'solar', 'renewable energy', 'photovoltaic', 'inverter', 'installation',
    'maintenance', 'efficiency', 'subsidy', 'government', 'policy',
    'rooftop', 'commercial', 'residential', 'industrial', 'savings',
    'ROI', 'investment', 'clean energy', 'sustainability', 'grid',
    'net metering', 'battery', 'storage', 'monitoring', 'performance'
  ];

  const contentLower = content.toLowerCase();
  const foundTerms = commonSolarTerms.filter(term => 
    contentLower.includes(term.toLowerCase())
  );

  // Convert to proper case and remove duplicates
  return [...new Set(foundTerms.map(term => 
    term.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  ))];
};

// Advanced AI-based tag generation from structured content
export const generateAdvancedTagsFromContent = (content: any[]): string[] => {
  if (!content || !Array.isArray(content)) return [];
  
  // Extract text from content blocks
  let textContent = '';
  content.forEach((block) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          textContent += child.text + ' ';
        }
      });
    }
  });

  const text = textContent.toLowerCase();
  
  // Comprehensive solar energy keywords
  const solarKeywords = {
    'Solar Panel': ['solar panel', 'photovoltaic', 'pv panel', 'solar module', 'solar cell'],
    'Solar Installation': ['installation', 'mounting', 'setup', 'install', 'commissioning'],
    'Solar Inverter': ['inverter', 'power conversion', 'dc to ac', 'string inverter', 'microinverter'],
    'Solar Maintenance': ['maintenance', 'cleaning', 'servicing', 'repair', 'troubleshooting'],
    'Solar Efficiency': ['efficiency', 'performance', 'output', 'generation', 'yield'],
    'Solar Subsidy': ['subsidy', 'government scheme', 'financial benefit', 'rebate', 'incentive'],
    'Renewable Energy': ['renewable', 'clean energy', 'green energy', 'sustainable', 'eco-friendly'],
    'Grid Connection': ['grid', 'net metering', 'electricity board', 'connection', 'grid-tied'],
    'Solar Battery': ['battery', 'storage', 'backup', 'energy storage', 'lithium'],
    'Commercial Solar': ['commercial', 'industrial', 'business', 'enterprise', 'office'],
    'Residential Solar': ['residential', 'home', 'rooftop', 'domestic', 'house'],
    'Solar Technology': ['technology', 'innovation', 'advancement', 'latest', 'breakthrough'],
    'Solar Cost': ['cost', 'price', 'investment', 'roi', 'return', 'savings'],
    'Solar Policy': ['policy', 'regulation', 'government', 'law', 'norms'],
    'Energy Independence': ['independence', 'self-sufficient', 'autonomous', 'off-grid'],
    'Carbon Footprint': ['carbon', 'emission', 'environmental', 'climate', 'pollution'],
    'Solar Monitoring': ['monitoring', 'tracking', 'analysis', 'data', 'app'],
    'Solar Warranty': ['warranty', 'guarantee', 'service', 'support', 'amc'],
    'Hybrid Solar': ['hybrid', 'combined system', 'integrated', 'backup'],
    'MPPT': ['mppt', 'maximum power point', 'charge controller', 'optimization'],
    'Solar Financing': ['financing', 'loan', 'emi', 'payment plan', 'zero down'],
    'Energy Audit': ['audit', 'assessment', 'evaluation', 'analysis', 'survey']
  };

  const foundTags = new Set<string>();

  // Check for keyword matches
  Object.entries(solarKeywords).forEach(([tag, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      foundTags.add(tag);
    }
  });

  // Technical and content type detection
  const technicalTerms = {
    'Technical Guide': ['technical', 'specification', 'engineering', 'datasheet'],
    'Installation Guide': ['guide', 'how to', 'step by step', 'tutorial', 'instructions'],
    'Comparison': ['vs', 'versus', 'compare', 'comparison', 'difference'],
    'Product Review': ['review', 'analysis', 'evaluation', 'assessment', 'rating'],
    'Industry News': ['news', 'update', 'announcement', 'latest', 'launch'],
    'Expert Tips': ['tips', 'advice', 'suggestions', 'recommendations', 'best practices'],
    'Benefits': ['benefits', 'advantages', 'pros', 'positive'],
    'Challenges': ['challenges', 'problems', 'issues', 'disadvantages', 'cons'],
    'Case Study': ['case study', 'project', 'implementation', 'success story'],
    'Market Trends': ['trends', 'market', 'forecast', 'growth', 'future']
  };

  Object.entries(technicalTerms).forEach(([tag, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      foundTags.add(tag);
    }
  });

  // Convert to array and limit to 8 tags maximum for better UX
  return Array.from(foundTags).slice(0, 8);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to calculate reading time
export const calculateReadingTime = (content: any[]): number => {
  const wordsPerMinute = 200;
  let wordCount = 0;

  content.forEach((block) => {
    if (block._type === 'block') {
      block.children?.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.split(' ').length;
        }
      });
    }
  });

  return Math.ceil(wordCount / wordsPerMinute);
};

// Helper function to truncate text
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Auto-generate SEO title from blog title
export const generateSEOTitle = (title: string): string => {
  // Add company name and make it SEO-friendly
  if (title.includes('AutoSys') || title.includes('Sunergy')) {
    return title.length <= 60 ? title : title.substring(0, 57) + '...';
  }
  
  const seoTitle = `${title} | AutoSys Sunergy`;
  return seoTitle.length <= 60 ? seoTitle : title.substring(0, 57) + '...';
};

// Auto-generate meta description from excerpt
export const generateMetaDescription = (excerpt: string): string => {
  // Ensure it's within 160 characters and add company mention if not present
  if (excerpt.includes('AutoSys') || excerpt.includes('Sunergy')) {
    return excerpt.length <= 160 ? excerpt : excerpt.substring(0, 157) + '...';
  }
  
  const metaDesc = `${excerpt} - AutoSys Sunergy`;
  return metaDesc.length <= 160 ? metaDesc : excerpt.substring(0, 157) + '...';
};
