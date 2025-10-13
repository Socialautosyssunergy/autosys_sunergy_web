// Enhanced AI response service for Autosys Sunergy - FAQ Assistant
export class SolarAIService {
  private knowledgeBase = {
    greetings: [
      "Hello! I'm your Autosys Solar Energy Expert. How can I help you today?",
      "Welcome to Autosys Sunergy! Feel free to ask any questions about solar panels.",
      "Hi there! I'm here to answer all your solar energy questions.",
      "Hello! Are you thinking about installing solar panels? I'll guide you through everything."
    ],

    // Comprehensive keyword-based responses
    responses: {
      'price|cost|rates|money|pricing|expensive|cheap': {
        priority: 1,
        answers: [
          "Solar system costs range from ₹40,000 to ₹3,00,000 depending on your needs. A 1kW system starts at ₹45,000. For detailed pricing, call us at +91 8818880540",
          "We have solar packages for every budget. 3kW home system costs ₹1,35,000, 5kW costs ₹2,00,000. Government subsidies are also available.",
          "Solar costs ₹45-50 per watt. What's your monthly electricity bill? I can suggest the right system size based on that."
        ]
      },

      'subsidy|government|scheme|rebate|incentive': {
        priority: 1,
        answers: [
          "Government provides up to 40% subsidy! Under PM Surya Ghar Muft Bijli Yojana, you get ₹78,000 subsidy for up to 3kW. We handle all the paperwork.",
          "Central government MNRE subsidy + additional state government subsidy available. Total benefit can be 40-60%.",
          "We handle the complete subsidy process from documentation to approval - everything is taken care of by our team."
        ]
      },

      'installation|install|setup|fitting|mounting': {
        priority: 1,
        answers: [
          "Installation is very simple! Our certified engineer team installs the complete system at your home in 1-3 days. Comes with 25-year warranty.",
          "Process: Site survey first, then design, then professional installation. Complete process takes 15-20 days.",
          "After installation, we also handle net metering connection. You don't need to do anything."
        ]
      },

      'maintenance|service|cleaning|repair': {
        priority: 1,
        answers: [
          "Solar panels need very little maintenance. Cleaning 2-3 times a year is sufficient. We offer AMC at ₹5,000 annually.",
          "Minimal maintenance for 25 years! Just keep panels clean. Inverter needs servicing every 5-10 years.",
          "Our AMC includes cleaning, inspection, and performance monitoring. Any issues are resolved within 24 hours."
        ]
      },

      'savings|benefit|electricity bill|reduction': {
        priority: 1,
        answers: [
          "You can reduce your electricity bill by 80-95%! If your bill is ₹5,000, it will come down to just ₹300-400. System pays for itself in 4-5 years.",
          "With net metering, you can also sell excess electricity. This becomes an additional income source. Total savings over 25 years can be 15-20 lakhs.",
          "Installing solar also increases your property value by 15-20%. It's a smart investment."
        ]
      },

      'warranty|guarantee|lifespan|durability': {
        priority: 1,
        answers: [
          "We provide 25-year performance warranty. Panels have 25 years, inverter 10 years, and installation 5 years warranty.",
          "All our products are from tier-1 companies - Novasys Greenergy panels and Mikrotek inverters. International quality guarantee.",
          "Warranty includes free replacement and service. Any problem gets resolved immediately."
        ]
      },

      'capacity|size|kw|kilowatt|how much|how many': {
        priority: 1,
        answers: [
          "Capacity depends on your monthly electricity consumption. 1kW generates 3-4 units daily. What's your monthly bill amount?",
          "For normal homes, 3-5kW is sufficient. For larger homes or commercial use, 10-20kW can be installed.",
          "For load calculation, I need your last 12 months electricity bills. Based on that, I can suggest the perfect size."
        ]
      },

      'company|autosys|novasys|mikrotek|about us': {
        priority: 1,
        answers: [
          "Autosys Sunergy has 17+ years in the solar industry. We're authorized distributors of Novasys Greenergy panels and Mikrotek inverters.",
          "We've completed 1000+ successful installations. Government recognition received. You can see our projects on our website.",
          "Our company is based in Indore but serves all over India and worldwide. Expert team with quality guarantee."
        ]
      },

      'contact|number|call|phone|reach': {
        priority: 1,
        answers: [
          "You can call us at +91 8818880540. Our experts will give you detailed consultation. Site visit is also free.",
          "Contact us: Phone: +91 8818880540. You can also click the Get Quote button.",
          "For immediate expert consultation, call +91 8818880540 or send an inquiry through our website."
        ]
      },

      'grid tie|net metering|grid connected': {
        priority: 2,
        answers: [
          "Grid-tie system allows you to sell excess electricity to the grid. Net metering makes your electricity meter count both ways.",
          "Grid-tie is the most popular system because no battery is needed. Lower cost and less maintenance.",
          "We handle net metering approval from the electricity board. Bi-directional meter is installed for free."
        ]
      },

      'battery|backup|off grid|storage': {
        priority: 2,
        answers: [
          "For battery backup, you can install a hybrid system. Uses solar during day, battery at night, and grid when needed.",
          "Lithium battery lasts 10-15 years. Lead acid is cheaper but needs replacement every 3-5 years.",
          "Off-grid system is perfect for remote areas without electricity. Gives complete independence."
        ]
      }
    },

    // Fallback responses for unmatched queries
    fallbacks: [
      "That's a great question! For detailed information, please speak with our expert at +91 8818880540. Free site visit is also available.",
      "I'd recommend our solar consultant for this specific query. They can provide you with a complete solution. Call: +91 8818880540",
      "For more information about this, you can explore our website or call directly at +91 8818880540",
      "Could you please clarify your question? Or for detailed discussion with our expert, contact +91 8818880540."
    ],

    // Context-aware responses
    contextualResponses: {
      'how|what|why|when|where': [
        "Solar energy converts sunlight into electricity using photovoltaic cells with silicon semiconductors. It's completely safe and clean energy.",
        "Solar panels last 25+ years. ROI is achieved in 4-5 years. After that, it's pure profit and free electricity.",
        "Installation process: 1) Site survey 2) Design 3) Approval 4) Installation 5) Net metering connection. Total 15-20 days."
      ]
    }
  };

  // Generate intelligent response based on user input
  generateResponse(userInput: string): string {
    const input = userInput.toLowerCase().trim();
    
    // Priority matching - check high priority keywords first
    const priorityKeywords = Object.entries(this.knowledgeBase.responses)
      .sort(([,a], [,b]) => (a.priority || 0) - (b.priority || 0));
    
    for (const [pattern, responseData] of priorityKeywords) {
      const keywords = pattern.split('|');
      if (keywords.some(keyword => input.includes(keyword))) {
        const answers = responseData.answers;
        return answers[Math.floor(Math.random() * answers.length)];
      }
    }
    
    // Contextual responses for question words
    if (/^(how|what|why|when|where)/.test(input)) {
      const contextResponses = this.knowledgeBase.contextualResponses['how|what|why|when|where'];
      return contextResponses[Math.floor(Math.random() * contextResponses.length)];
    }
    
    // Default fallback
    return this.knowledgeBase.fallbacks[
      Math.floor(Math.random() * this.knowledgeBase.fallbacks.length)
    ];
  }

  // Get random greeting
  getGreeting(): string {
    return this.knowledgeBase.greetings[
      Math.floor(Math.random() * this.knowledgeBase.greetings.length)
    ];
  }

  // Get contextual help
  getContextualHelp(): string[] {
    return [
      "You can ask me about:",
      "• What is the price of solar?",
      "• How much subsidy do I get?", 
      "• How is installation done?",
      "• What maintenance is required?",
      "• How much will I save?",
      "• What warranty do you provide?"
    ];
  }
}

export default SolarAIService;
