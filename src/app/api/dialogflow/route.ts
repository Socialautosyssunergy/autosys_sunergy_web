import { NextRequest, NextResponse } from 'next/server';

// Mock Dialogflow API for development (replace with actual Dialogflow integration)
export async function POST(request: NextRequest) {
  try {
    const { text, sessionId, languageCode } = await request.json();

    // For production, you would integrate with actual Dialogflow here
    // This is a mock implementation that returns responses based on keywords
    
    const solarResponses = {
      'price|cost|कीमत|दाम': [
        "सोलर सिस्टम की कीमत ₹40,000 से ₹3,00,000 तक होती है। आपकी आवश्यकता के अनुसार हम best quote दे सकते हैं। +91 8818880540 पर कॉल करें।",
        "1kW सिस्टम ₹45,000 से शुरू होता है। 3kW होम सिस्टम ₹1,35,000 में। सरकारी सब्सिडी भी मिलती है।"
      ],
      'subsidy|सब्सिडी|योजना': [
        "सरकार 40% तक सब्सिडी देती है! PM सूर्य घर योजना के तहत ₹78,000 तक की सब्सिडी मिल सकती है। हम पूरी प्रक्रिया में आपकी मदद करते हैं।",
        "केंद्र और राज्य सरकार दोनों की सब्सिडी मिलती है। Documentation हम handle करते हैं।"
      ],
      'installation|install|लगाना': [
        "हमारी expert team 1-3 दिन में professional installation करती है। 25 साल की warranty के साथ। Site survey free है।",
        "Installation process: Site survey → Design → Approval → Installation → Net metering। Total 15-20 दिन।"
      ],
      'maintenance|रखरखाव|सर्विस': [
        "सोलर पैनल को minimal maintenance चाहिए। साल में 2-3 बार cleaning। हम ₹5,000 सालाना AMC भी देते हैं।",
        "25 साल तक low maintenance! हमारी AMC में cleaning, inspection और emergency support शामिल है।"
      ],
      'savings|बचत|फायदा': [
        "80-95% तक electricity bill में कमी! 4-5 साल में investment recover हो जाता है। Net metering से extra income भी।",
        "Monthly ₹5,000 का bill सिर्फ ₹300-400 हो जाता है। 25 साल में total saving 15-20 लाख तक।"
      ],
      'warranty|वारंटी|गारंटी': [
        "25 साल performance warranty! Panel पर 25 साल, inverter पर 10 साल। Complete service guarantee।",
        "Tier-1 products से comprehensive warranty। Free replacement और service included।"
      ]
    };

    const input = text.toLowerCase();
    let response = "यह अच्छा सवाल है! विस्तृत जानकारी के लिए हमारे expert से बात करें: +91 8818880540";

    // Find matching response
    for (const [pattern, responses] of Object.entries(solarResponses)) {
      const keywords = pattern.split('|');
      if (keywords.some(keyword => input.includes(keyword))) {
        response = responses[Math.floor(Math.random() * responses.length)];
        break;
      }
    }

    // Return Dialogflow-like response format
    return NextResponse.json({
      fulfillmentText: response,
      sessionId: sessionId,
      languageCode: languageCode,
      confidence: 0.8
    });

  } catch (error) {
    console.error('Dialogflow API error:', error);
    return NextResponse.json(
      { 
        fulfillmentText: 'माफ करें, कुछ technical समस्या है। कृपया दोबारा try करें या +91 8818880540 पर कॉल करें।',
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'Dialogflow API endpoint is working',
    timestamp: new Date().toISOString()
  });
}
