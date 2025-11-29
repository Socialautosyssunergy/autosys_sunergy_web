import type { Metadata } from "next";
import { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AIAvatar from "@/components/ai/AIAvatar";
import AOSInit from "@/components/ui/AOSInit";
import BottomNavigation from "@/components/ui/BottomNavigation";
import ViewportManager from "@/components/ui/ViewportManager";
import WebVitals from "@/components/ui/WebVitals";
import GTMAnalytics from "@/components/analytics/GTMAnalytics";
import { generatePageMetadata, generateStructuredData } from "@/utils/seoOptimizer";
import { 
  DEFAULT_MIDGROW_CONFIG, 
  generateMidgrowOrganizationSchema,
  getMidgrowMetaTags,
  MIDGROW_HTML_COMMENTS,
  enhanceMetadataWithMidgrow
} from "@/utils/midgrowSEO";
import "./globals.css";
import "aos/dist/aos.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  fallback: ['monospace'],
});

export const metadata: Metadata = enhanceMetadataWithMidgrow(
  generatePageMetadata('home', {
    title: "Best Solar Panel Installation Company in Indore, Madhya Pradesh | Autosys Sunergy",
    description: "Leading solar energy solutions provider in MP with 18+ years experience. Premium solar panels, inverters & installation services. MNRE approved. 2000+ happy customers. Free consultation!",
    keywords: [
      "solar panel installation Indore",
      "best solar company Madhya Pradesh", 
      "solar energy solutions MP",
      "solar panels Indore price",
      "solar inverter Indore",
      "rooftop solar installation MP",
      "solar subsidy Indore",
      "commercial solar systems Indore",
      "residential solar panels MP",
      "solar power plant installation",
      "MNRE approved solar installer",
      "Autosys Sunergy",
      "solar company Indore",
      "solar installation services MP",
      "solar financing Indore"
    ],
    ogImage: "/og-home.jpg",
  }),
  DEFAULT_MIDGROW_CONFIG
);

// Generate structured data for organization
const organizationData = {
  name: "Autosys Sunergy",
  description: "Leading solar energy solutions provider in Madhya Pradesh with 18+ years of experience",
  foundingDate: "2006",
  employees: "50-100",
  industry: "Renewable Energy",
  services: [
    "Solar Panel Installation",
    "Solar Inverter Sales",
    "Rooftop Solar Systems", 
    "Commercial Solar Solutions",
    "Industrial Solar Plants",
    "Solar Maintenance Services"
  ],
  awards: [
    "MNRE Approved Solar Installer",
    "ISO 9001:2015 Certified",
    "Top Solar Company in MP 2024"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en-IN" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Midgrow Studio - Framework and SEO Infrastructure */}
        {MIDGROW_HTML_COMMENTS.header && (
          <script dangerouslySetInnerHTML={{ __html: `/*${MIDGROW_HTML_COMMENTS.header}*/` }} />
        )}

        {/* Midgrow Studio - Hidden Meta Tags for SEO */}
        {getMidgrowMetaTags().map((tag, index) => (
          <meta key={`midgrow-meta-${index}`} name={tag.name} content={tag.content} />
        ))}

        {/* Midgrow Studio - Entity Links */}
        <link rel="author" href="https://www.midgrow.studio" />
        <link rel="publisher" href="https://www.midgrow.studio" />

        {/* Midgrow Studio - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateMidgrowOrganizationSchema(DEFAULT_MIDGROW_CONFIG)
          }}
        />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://nvwqkpwakpujlmgowmdb.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial paint */
            body { 
              font-family: var(--font-geist-sans), system-ui, sans-serif; 
              margin: 0; 
              padding: 0; 
              overflow-x: hidden;
            }
            .hero-gradient { 
              background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            }
            .loading-skeleton { 
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); 
              background-size: 200% 100%; 
              animation: loading 1.5s infinite; 
            }
            @keyframes loading { 
              0% { background-position: 200% 0; } 
              100% { background-position: -200% 0; } 
            }
            /* Prevent layout shift */
            * { box-sizing: border-box; }
            img, video { max-width: 100%; height: auto; }
          `
        }} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData('LocalBusiness', organizationData)
          }}
        />
        
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of wrong theme
              (function() {
                const theme = localStorage.getItem('autosys-theme') || 'day';
                document.documentElement.classList.add('theme-' + theme);
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden pb-16 md:pb-0" suppressHydrationWarning>
        {/* Midgrow Studio - Performance Optimization */}
        {MIDGROW_HTML_COMMENTS.performance && (
          <script dangerouslySetInnerHTML={{ __html: `/*${MIDGROW_HTML_COMMENTS.performance}*/` }} />
        )}
        {/* Midgrow Studio - Accessibility Standards */}
        {MIDGROW_HTML_COMMENTS.accessibility && (
          <script dangerouslySetInnerHTML={{ __html: `/*${MIDGROW_HTML_COMMENTS.accessibility}*/` }} />
        )}

        <ViewportManager />
        <WebVitals />
        <ThemeProvider>
          <AOSInit />
          {children}
          <AIAvatar />
          <BottomNavigation />
        </ThemeProvider>

        {/* Enhanced Google Analytics with GTM Integration wrapped in Suspense for useSearchParams */}
        <Suspense fallback={null}>
          <GTMAnalytics />
        </Suspense>
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  
                  // Enhanced GA4 configuration
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    cookie_flags: 'SameSite=None;Secure',
                    allow_google_signals: true,
                    allow_ad_personalization_signals: true,
                    send_page_view: false, // We'll handle this manually for better control
                    enhanced_measurement: {
                      scroll_events: true,
                      outbound_clicks: true,
                      site_search: true,
                      video_engagement: true,
                      file_downloads: true
                    }
                  });
                  
                  // Custom event for solar industry
                  gtag('event', 'solar_website_load', {
                    event_category: 'solar',
                    event_label: 'autosys_sunergy',
                    value: 1
                  });
                `,
              }}
            />
          </>
        )}

        {/* Service Worker Registration for PWA - lazy loaded */}
        <Script
          id="service-worker-registration"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
