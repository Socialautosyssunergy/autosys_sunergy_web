import HomePageClient from "@/components/home/HomePageClient";
import Script from "next/script";
import { generatePageMetadata, generateStructuredData } from "@/utils/seoOptimizer";

export const metadata = generatePageMetadata("home");

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a wide range of solar energy solutions including residential and commercial solar panel installation, battery storage solutions, and maintenance services."
      }
    },
    {
      "@type": "Question",
      name: "How much does it cost to install solar panels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost of solar panel installation varies depending on the size of your system, your energy needs, and available incentives. We provide a free consultation to give you a detailed quote."
      }
    },
    {
      "@type": "Question",
      name: "What are the benefits of switching to solar energy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switching to solar energy can significantly reduce your electricity bills, decrease your carbon footprint, and increase the value of your property. Plus, there are often government incentives and tax credits available."
      }
    },
    {
      "@type": "Question",
      name: "How long does the installation process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical residential solar installation takes 1-3 days. The entire process from consultation to activation can take a few weeks, depending on local permits and utility company timelines."
      }
    }
  ]
});

const serviceJsonLd = generateStructuredData("Service", {
  name: "Solar Installation Services",
  description: "Complete solar installation services in Madhya Pradesh including residential, commercial and industrial solar solutions",
  services: [
    {
      "@type": "Service",
      name: "Residential Solar Installation",
      description: "Complete rooftop solar solutions for homes",
      provider: { "@type": "Organization", name: "Autosys Sunergy" }
    },
    {
      "@type": "Service",
      name: "Commercial Solar Systems",
      description: "Solar power solutions for businesses and institutions",
      provider: { "@type": "Organization", name: "Autosys Sunergy" }
    },
    {
      "@type": "Service",
      name: "Industrial Solar Plants",
      description: "Large-scale solar installations for industrial facilities",
      provider: { "@type": "Organization", name: "Autosys Sunergy" }
    }
  ]
});

const aggregateRatingJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Autosys Sunergy",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2000"
  }
});

export default function HomePage() {
  return (
    <>
        <Script
          id="homepage-faq-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
        <Script
          id="homepage-service-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: serviceJsonLd }}
        />
        <Script
          id="homepage-aggregate-rating-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: aggregateRatingJsonLd }}
        />
      <HomePageClient />
    </>
  );
}
