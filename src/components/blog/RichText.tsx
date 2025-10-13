'use client';

import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import OptimizedImage from './OptimizedImage';
import { useTheme } from '@/contexts/ThemeContext';
import { ContentBlockType } from '@/types/blog';

interface RichTextProps {
  content: ContentBlockType[];
  className?: string;
}

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  const { isDay } = useTheme();

  // Custom components for rich text rendering
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }) => (
        <div className="my-8 mx-auto max-w-4xl">
          <OptimizedImage
            image={value}
            alt={value.alt || 'Blog content image'}
            aspectRatio="16:9"
            width={800}
            className="rounded-2xl shadow-lg"
            quality={90}
          />
          {value.alt && (
            <p className={`text-sm text-center mt-3 italic ${
              isDay ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {value.alt}
            </p>
          )}
        </div>
      ),
      code: ({ value }) => (
        <div className="my-8">
          <div className={`rounded-2xl overflow-hidden ${
            isDay ? 'bg-slate-900' : 'bg-slate-800'
          } shadow-lg`}>
            <div className={`px-6 py-3 border-b ${
              isDay ? 'bg-slate-800 border-slate-700' : 'bg-slate-700 border-slate-600'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-slate-300 font-mono">
                  {value.language || 'code'}
                </span>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm text-slate-100 font-mono leading-relaxed">
                <code>{value.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    block: {
      normal: ({ children }) => (
        <p className={`mb-6 leading-relaxed text-lg ${
          isDay ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className={`text-3xl md:text-4xl font-bold mt-12 mb-6 ${
          isDay ? 'text-slate-800' : 'text-white'
        } leading-tight`}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={`text-2xl md:text-3xl font-bold mt-10 mb-5 ${
          isDay ? 'text-slate-800' : 'text-white'
        } leading-tight`}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className={`text-xl md:text-2xl font-bold mt-8 mb-4 ${
          isDay ? 'text-slate-800' : 'text-white'
        } leading-tight`}>
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`my-8 pl-8 border-l-4 ${
          isDay 
            ? 'border-blue-500 bg-blue-50/50' 
            : 'border-blue-400 bg-blue-900/20'
        } py-6 pr-6 rounded-r-2xl shadow-lg`}>
          <div className={`text-lg italic font-medium ${
            isDay ? 'text-slate-700' : 'text-slate-200'
          }`}>
            {children}
          </div>
          <div className="mt-2 text-2xl opacity-30">💡</div>
        </blockquote>
      )
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`my-6 space-y-3 ${
          isDay ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className={`my-6 space-y-3 ${
          isDay ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {children}
        </ol>
      )
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-4 text-lg leading-relaxed">
          <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
            isDay ? 'bg-blue-500' : 'bg-blue-400'
          }`}></span>
          <span className="flex-1">{children}</span>
        </li>
      ),
      number: ({ children, index = 0 }) => (
        <li className="flex items-start gap-4 text-lg leading-relaxed">
          <span className={`mt-1 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${
            isDay 
              ? 'bg-blue-500 text-white' 
              : 'bg-blue-400 text-slate-900'
          }`}>
            {index + 1}
          </span>
          <span className="flex-1">{children}</span>
        </li>
      )
    },
    marks: {
      strong: ({ children }) => (
        <strong className={`font-bold ${
          isDay ? 'text-slate-800' : 'text-white'
        }`}>
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }) => (
        <code className={`px-2 py-1 rounded-lg text-sm font-mono ${
          isDay 
            ? 'bg-slate-100 text-slate-800 border border-slate-200' 
            : 'bg-slate-800 text-slate-200 border border-slate-700'
        }`}>
          {children}
        </code>
      ),
      link: ({ value, children }) => (
        <a
          href={value.href}
          target={value.href?.startsWith('http') ? '_blank' : '_self'}
          rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`font-medium transition-colors duration-200 ${
            isDay 
              ? 'text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500' 
              : 'text-blue-400 hover:text-blue-300 underline decoration-blue-600 hover:decoration-blue-400'
          } underline-offset-2`}
        >
          {children}
        </a>
      )
    }
  };

  // Custom table handling
  const TableComponent = ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 overflow-x-auto">
      <div className={`inline-block min-w-full rounded-2xl overflow-hidden shadow-lg ${
        isDay ? 'bg-white border border-slate-200' : 'bg-slate-800 border border-slate-700'
      }`}>
        <table className="min-w-full">
          {children}
        </table>
      </div>
    </div>
  );

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div className={`rich-text-content ${
        isDay ? 'rich-text-day' : 'rich-text-night'
      }`}>
        <PortableText
          value={content}
          components={components}
        />
      </div>
      
      {/* Custom styles for rich text */}
      <style jsx global>{`
        .rich-text-content {
          line-height: 1.8;
        }
        
        .rich-text-content table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .rich-text-content th,
        .rich-text-content td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid ${isDay ? '#e2e8f0' : '#374151'};
        }
        
        .rich-text-content th {
          background-color: ${isDay ? '#f8fafc' : '#1f2937'};
          font-weight: 600;
          color: ${isDay ? '#1e293b' : '#f3f4f6'};
        }
        
        .rich-text-content td {
          color: ${isDay ? '#475569' : '#d1d5db'};
        }
        
        .rich-text-content tr:last-child td {
          border-bottom: none;
        }
        
        .rich-text-content tr:hover {
          background-color: ${isDay ? '#f1f5f9' : '#374151'};
        }
      `}</style>
    </div>
  );
};

export default RichText;
