import { definePlugin } from 'sanity'

// Advanced AI-based tag generation function
export const generateAdvancedTags = (content: any[]): string[] => {
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
  
  // Solar energy and renewable energy keywords with comprehensive coverage
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

  // Technical terms detection
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

  // Convert to array and limit to 8 tags maximum
  return Array.from(foundTags).slice(0, 8);
};

// Simple plugin for auto-fill functionality
export const autoFillPlugin = definePlugin({
  name: 'auto-fill-plugin'
});
