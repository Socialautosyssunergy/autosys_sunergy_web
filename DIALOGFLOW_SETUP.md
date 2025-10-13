# Google Dialogflow Integration Setup Guide

## Overview
This guide helps you set up Google Dialogflow for real-time conversations with the AI Avatar "Sunita" for Autosys Sunergy.

## Features Implemented
✅ Female voice synthesis (Hindi)
✅ Real-time speech recognition (Hindi)
✅ Dialogflow API integration
✅ Fallback to local AI service
✅ Welcome popup with permission request
✅ Professional female avatar design

## Setup Instructions

### 1. Google Cloud Project Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing: `autosys-sunergy-ai`
3. Enable the Dialogflow API
4. Create a service account with Dialogflow API permissions

### 2. Dialogflow Console Setup
1. Visit [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Create a new agent: `autosys-sunergy-bot`
3. Set default language to Hindi (hi)
4. Configure intents for solar energy queries

### 3. Intent Configuration
Create these intents in Dialogflow:

#### Intent: `solar.price`
**Training Phrases:**
- सोलर पैनल की कीमत क्या है
- solar panel price
- cost kitni hai
- दाम बताइए

**Response:**
```
सोलर सिस्टम की कीमत ₹40,000 से ₹3,00,000 तक होती है। 1kW सिस्टम ₹45,000 से शुरू होता है। details quote के लिए +91 8818880540 पर कॉल करें।
```

#### Intent: `solar.subsidy`
**Training Phrases:**
- सब्सिडी कितनी मिलती है
- government scheme
- योजना के बारे में बताइए

**Response:**
```
सरकार 40% तक सब्सिडी देती है! PM सूर्य घर योजना के तहत ₹78,000 तक की सब्सिडी मिल सकती है। हम पूरी documentation में आपकी मदद करते हैं।
```

#### Intent: `solar.installation`
**Training Phrases:**
- installation कैसे होती है
- लगाने में कितना समय
- setup process

**Response:**
```
हमारी expert team 1-3 दिन में professional installation करती है। Site survey free है। 25 साल की warranty के साथ complete solution मिलता है।
```

### 4. Environment Configuration
Update `.env.local`:
```env
NEXT_PUBLIC_DIALOGFLOW_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-key.json
DIALOGFLOW_LOCATION=asia-south1
```

### 5. Production Dialogflow Integration
Replace the mock API in `/api/dialogflow/route.ts` with actual Dialogflow client:

```typescript
import { SessionsClient } from '@google-cloud/dialogflow';

const sessionClient = new SessionsClient();

export async function POST(request: NextRequest) {
  const { text, sessionId } = await request.json();
  
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'hi',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return NextResponse.json({
    fulfillmentText: responses[0].queryResult.fulfillmentText
  });
}
```

### 6. Testing
1. Start development server: `npm run dev`
2. Open website - welcome popup should appear
3. Grant microphone permission
4. Test Hindi voice commands:
   - "सोलर पैनल की कीमत क्या है?"
   - "सब्सिडी कितनी मिलती है?"
   - "installation कैसे होती है?"

### 7. Voice Configuration
The system automatically selects the best female Hindi voice:
- Priority: Google Hindi female voices
- Fallback: Microsoft Hindi voices
- Final fallback: Any available female voice

## Current Features

### AI Avatar "Sunita"
- **Name**: सुनीता (Sunita)
- **Voice**: Female Hindi voice with optimized pitch and rate
- **Appearance**: Pink/purple gradient theme
- **Personality**: Friendly, knowledgeable solar consultant

### Voice Settings
- **Language**: Hindi (hi-IN)
- **Rate**: 0.85 (slightly slower for clarity)
- **Pitch**: 1.2 (higher for female voice)
- **Volume**: 0.9

### Interaction Flow
1. Welcome popup appears after 3 seconds
2. User grants microphone permission
3. Sunita greets in Hindi
4. Real-time voice conversation begins
5. Dialogflow processes queries
6. Fallback to local AI if needed

## Troubleshooting

### Voice Not Working
- Check browser microphone permissions
- Ensure HTTPS (required for speech APIs)
- Verify Hindi voices are available on system

### Dialogflow Errors
- Check API credentials
- Verify project ID configuration
- Monitor API quotas and billing

### Performance Optimization
- Implement voice caching
- Add conversation context
- Use streaming for long responses

## Free Usage Limits
- Dialogflow: 1000 requests/month free
- Speech APIs: Built-in browser APIs (free)
- Local fallback: Unlimited

This setup provides a professional, free-to-use AI avatar solution for Autosys Sunergy with female voice support and Dialogflow integration.
