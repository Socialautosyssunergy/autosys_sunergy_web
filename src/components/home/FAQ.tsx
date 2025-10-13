// src/components/home/FAQ.tsx
"use client";
import React from 'react';
import FAQItem from './FAQItem';

const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of solar energy solutions including residential and commercial solar panel installation, battery storage solutions, and maintenance services."
    },
    {
      question: "How much does it cost to install solar panels?",
      answer: "The cost of solar panel installation varies depending on the size of your system, your energy needs, and available incentives. We provide a free consultation to give you a detailed quote."
    },
    {
      question: "What are the benefits of switching to solar energy?",
      answer: "Switching to solar energy can significantly reduce your electricity bills, decrease your carbon footprint, and increase the value of your property. Plus, there are often government incentives and tax credits available."
    },
    {
      question: "How long does the installation process take?",
      answer: "A typical residential solar installation takes 1-3 days. The entire process from consultation to activation can take a few weeks, depending on local permits and utility company timelines."
    }
  ];
  

const FAQ = () => {
  return (
    <div className="space-y-2 sm:space-y-3">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isDay={true}
        />
      ))}
    </div>
  );
};

export default FAQ;
