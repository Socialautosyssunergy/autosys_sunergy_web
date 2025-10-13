#!/usr/bin/env node

/**
 * 🚀 Autosys Sunergy - Image Optimization Script
 * Bulk convert <img> tags to next/image optimized components
 */

const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const SRC_DIR = './src';

// Critical images that should have priority loading
const PRIORITY_IMAGES = [
  'hero', 'banner', 'logo', 'above-fold', 
  'main', 'featured', 'primary'
];

function isPriorityImage(src) {
  return PRIORITY_IMAGES.some(keyword => 
    src.toLowerCase().includes(keyword.toLowerCase())
  );
}

function generateOptimizedImageComponent(match, src, alt, className = '', width = '', height = '') {
  const priority = isPriorityImage(src);
  
  let props = `src="${src}" alt="${alt}"`;
  
  if (className) props += ` className="${className}"`;
  if (width && height) {
    props += ` width={${width}} height={${height}}`;
  } else {
    props += ` width={800} height={600}`;
  }
  
  if (priority) props += ` priority={true}`;
  
  return `<OptimizedImageComponent ${props} />`;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Pattern 1: <img src="..." alt="..." />
  let newContent = content.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*\/?>|<img\s+alt="([^"]*)"\s+src="([^"]+)"[^>]*\/?>/gi,
    (match, src1, alt1, alt2, src2) => {
      modified = true;
      const src = src1 || src2;
      const alt = alt1 || alt2 || 'Autosys Sunergy Solar Solutions';
      return generateOptimizedImageComponent(match, src, alt);
    }
  );
  
  // Pattern 2: <img src="..." alt="..." className="..." />
  newContent = newContent.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]*)"\s+className="([^"]*)"[^>]*\/?>|<img\s+className="([^"]*)"\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*\/?>/gi,
    (match, src1, alt1, className1, className2, src2, alt2) => {
      modified = true;
      const src = src1 || src2;
      const alt = alt1 || alt2 || 'Autosys Sunergy Solar Solutions';
      const className = className1 || className2;
      return generateOptimizedImageComponent(match, src, alt, className);
    }
  );
  
  // Add import statement if modifications were made
  if (modified && !content.includes('OptimizedImageComponent')) {
    const importStatement = "import OptimizedImageComponent from '@/components/ui/OptimizedImageComponent';\n";
    
    // Find the best place to insert the import
    const lines = newContent.split('\n');
    let insertIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import')) {
        insertIndex = i + 1;
      } else if (lines[i].trim() === '' && insertIndex > 0) {
        break;
      }
    }
    
    lines.splice(insertIndex, 0, importStatement);
    newContent = lines.join('\n');
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Optimized: ${filePath}`);
    return 1;
  }
  
  return 0;
}

function walkDirectory(dir) {
  let filesProcessed = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      filesProcessed += walkDirectory(filePath);
    } else if (stat.isFile() && EXTENSIONS.includes(path.extname(file))) {
      filesProcessed += processFile(filePath);
    }
  });
  
  return filesProcessed;
}

function createOptimizedImageComponent() {
  const componentPath = './src/components/ui/OptimizedImageComponent.tsx';
  
  if (!fs.existsSync(componentPath)) {
    const componentCode = `'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImageComponent({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={\`\${className} \${fill ? 'relative' : ''} overflow-hidden\`}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        className={\`transition-opacity duration-300 \${
          isLoading ? 'opacity-0' : 'opacity-100'
        } \${fill ? 'object-cover' : ''}\`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}`;

    // Ensure directory exists
    const dir = path.dirname(componentPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(componentPath, componentCode);
    console.log(`✅ Created: ${componentPath}`);
  }
}

// Main execution
console.log('🚀 Starting Image Optimization for Lighthouse Performance...\n');

// Create the OptimizedImageComponent if it doesn't exist
createOptimizedImageComponent();

// Process all files
const filesProcessed = walkDirectory(SRC_DIR);

console.log(`\n✅ Image optimization complete!`);
console.log(`📊 Files processed: ${filesProcessed}`);
console.log(`\n🎯 Next steps:`);
console.log(`1. Run: npm run build`);
console.log(`2. Test with: npx lighthouse http://localhost:3000 --view`);
console.log(`3. Expected performance boost: +10-15% Lighthouse score`);
console.log(`\n💡 Pro tip: Test on both mobile and desktop for comprehensive results!`);
