import React, { useEffect } from 'react'
import { useFormValue, PatchEvent, setIfMissing, set } from 'sanity'
import { StringInputProps, TextInputProps, TagsArrayInputProps } from 'sanity'

// Advanced AI-based tag generation function
const generateAdvancedTags = (content: any[]): string[] => {
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
  
  // Solar energy and renewable energy keywords
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

// Auto-fill Tags Component
export const AutoFillTags = (props: any) => {
  const content = useFormValue(['content']) as any[]
  const currentTags = props.value || []

  useEffect(() => {
    // Generate tags when content changes and no tags exist yet
    if (content && content.length > 0) {
      const generatedTags = generateAdvancedTags(content)
      
      // Only auto-fill if there are no current tags or if current tags are empty
      if (generatedTags.length > 0 && (!currentTags || currentTags.length === 0)) {
        console.log('Auto-generating tags:', generatedTags) // Debug log
        props.onChange(PatchEvent.from(set(generatedTags)))
      }
    }
  }, [content]) // Remove props and currentTags from dependency array to avoid infinite loops

  const handleManualUpdate = () => {
    if (content && content.length > 0) {
      const generatedTags = generateAdvancedTags(content)
      if (generatedTags.length > 0) {
        console.log('Manually generating tags:', generatedTags)
        props.onChange(PatchEvent.from(set(generatedTags)))
      }
    }
  }

  return (
    <div>
      {props.renderDefault(props)}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={handleManualUpdate}
          disabled={!content || content.length === 0}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (content && content.length > 0) ? 'pointer' : 'not-allowed',
            opacity: (content && content.length > 0) ? 1 : 0.5
          }}
        >
          🏷️ Generate Tags from Content
        </button>
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          💡 Tags are automatically generated based on your content. Add content above to see suggested tags.
        </div>
      </div>
    </div>
  )
}

// Auto-fill SEO Title Component
export const AutoFillSEOTitle = (props: StringInputProps) => {
  const title = useFormValue(['title']) as string
  const currentValue = props.value

  useEffect(() => {
    if (title && !currentValue) {
      // Use exact title without modifications
      props.onChange(PatchEvent.from(set(title)))
    }
  }, [title, currentValue, props])

  const handleManualUpdate = () => {
    if (title) {
      props.onChange(PatchEvent.from(set(title)))
    }
  }

  // Show warning if title exceeds 60 characters (SEO recommendation), error if over 180 (hard limit)
  const isOverSEOLimit = currentValue && currentValue.length > 60
  const isOverHardLimit = currentValue && currentValue.length > 180
  
  return (
    <div>
      {props.renderDefault(props)}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={handleManualUpdate}
          disabled={!title}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: title ? 'pointer' : 'not-allowed',
            opacity: title ? 1 : 0.5
          }}
        >
          🔄 Update from Title
        </button>
        {isOverHardLimit && (
          <div style={{ 
            color: '#dc2626', 
            fontSize: '12px',
            padding: '4px 8px',
            backgroundColor: '#fef2f2',
            borderRadius: '4px',
            border: '1px solid #dc2626'
          }}>
            ❌ Error: SEO title is {currentValue.length} characters. Maximum allowed is 180 characters.
          </div>
        )}
        {isOverSEOLimit && !isOverHardLimit && (
          <div style={{ 
            color: '#f59e0b', 
            fontSize: '12px',
            padding: '4px 8px',
            backgroundColor: '#fef3c7',
            borderRadius: '4px',
            border: '1px solid #f59e0b'
          }}>
            ⚠️ Warning: SEO title is {currentValue.length} characters. Recommended limit is 60 characters for better SEO.
          </div>
        )}
      </div>
    </div>
  )
}

// Auto-fill Meta Description Component
export const AutoFillMetaDescription = (props: TextInputProps) => {
  const excerpt = useFormValue(['excerpt']) as string
  const currentValue = props.value

  useEffect(() => {
    if (excerpt && !currentValue) {
      // Use exact excerpt without modifications
      props.onChange(PatchEvent.from(set(excerpt)))
    }
  }, [excerpt, currentValue, props])

  const handleManualUpdate = () => {
    if (excerpt) {
      props.onChange(PatchEvent.from(set(excerpt)))
    }
  }

  // Show warning if description exceeds 160 characters (SEO recommendation), error if over 480 (hard limit)
  const isOverSEOLimit = currentValue && currentValue.length > 160
  const isOverHardLimit = currentValue && currentValue.length > 480
  
  return (
    <div>
      {props.renderDefault(props)}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={handleManualUpdate}
          disabled={!excerpt}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: excerpt ? 'pointer' : 'not-allowed',
            opacity: excerpt ? 1 : 0.5
          }}
        >
          🔄 Update from Excerpt
        </button>
        {isOverHardLimit && (
          <div style={{ 
            color: '#dc2626', 
            fontSize: '12px',
            padding: '4px 8px',
            backgroundColor: '#fef2f2',
            borderRadius: '4px',
            border: '1px solid #dc2626'
          }}>
            ❌ Error: Meta description is {currentValue.length} characters. Maximum allowed is 480 characters.
          </div>
        )}
        {isOverSEOLimit && !isOverHardLimit && (
          <div style={{ 
            color: '#f59e0b', 
            fontSize: '12px',
            padding: '4px 8px',
            backgroundColor: '#fef3c7',
            borderRadius: '4px',
            border: '1px solid #f59e0b'
          }}>
            ⚠️ Warning: Meta description is {currentValue.length} characters. Recommended limit is 160 characters for better SEO.
          </div>
        )}
      </div>
    </div>
  )
}
