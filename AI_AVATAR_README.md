# AI Avatar Implementation - Aurora AI Assistant

## Overview
This implementation provides a sophisticated AI avatar that uses a video file as the floating icon and supports real-time voice interaction in Hindi for Autosys Sunergy's solar energy consultations.

## Features Implemented

### 🎥 Video Avatar
- **Primary Icon**: Uses `Autosys_sunergy_AI_Support_Avatar.mp4` as the floating avatar
- **Responsive Design**: 80x80px floating button with video content
- **Fallback Support**: Graceful fallback to icon if video fails to load
- **Optimized Performance**: CSS classes for smooth animations and video controls hiding

### 🎤 Voice Interaction
- **Female Voice**: Configured to use female Hindi voices (Google हिन्दी, Microsoft Heera, etc.)
- **Speech Recognition**: Hindi language support (`hi-IN`)
- **Real-time Transcription**: Shows what the user is saying during speech recognition
- **Voice Synthesis**: Enhanced female voice with optimized pitch and rate

### 🤖 AI Integration
- **Dual AI Support**: 
  - Local SolarAIService for offline/fallback responses
  - Google Dialogflow integration for advanced conversations
- **Solar-Specific Knowledge**: Comprehensive knowledge base about solar panels, pricing, subsidies, installation, and more
- **Contextual Responses**: Intelligent keyword matching and contextual help

### 🎨 Visual Features
- **Theme-Aware**: Adapts to day/night themes with pink/purple color scheme
- **Status Indicators**: 
  - Green dot: Microphone permission granted
  - Red dot: Permission denied
  - Speaking animation: Green pulsing border
  - Listening animation: Red bouncing border
- **Welcome Popup**: Introduces the AI assistant and requests microphone permission
- **Chat Interface**: Modern chat UI with message history

## File Structure

```
src/components/ai/
├── AIAvatar.tsx              # Main avatar component
├── AIAvatar.module.css       # Avatar-specific styles
├── SolarAIService.ts         # Local AI service with solar knowledge
├── WelcomePopup.tsx          # Initial welcome dialog
└── DIALOGFLOW_SETUP.md      # Dialogflow integration guide
```

## Key Components

### AIAvatar.tsx
The main component that handles:
- Video avatar rendering with fallback
- Speech recognition and synthesis
- Chat interface
- State management for all interactions

### SolarAIService.ts
Comprehensive solar energy knowledge base covering:
- Pricing and cost information
- Government subsidies and schemes
- Installation and maintenance
- Savings calculations
- Warranty information
- Company details

### Video Integration
```tsx
<video
  className="ai-avatar-video"
  autoPlay
  loop
  muted
  playsInline
  onError={handleVideoError}
  onLoadedData={handleVideoLoad}
>
  <source src="/Autosys_sunergy_AI_Support_Avatar.mp4" type="video/mp4" />
</video>
```

## Voice Configuration

### Female Voice Selection Priority:
1. Google हिन्दी (Google Hindi female voice)
2. Microsoft Heera - Hindi (India)
3. Google हिन्दी (भारत)
4. Lekha (Hindi female voice)
5. Veena (Another Hindi female voice)
6. Any available Hindi voice
7. Any available female voice

### Voice Parameters:
- **Language**: `hi-IN` (Hindi - India)
- **Rate**: 0.85 (slightly slower for clarity)
- **Pitch**: 1.2 (higher for female voice)
- **Volume**: 0.9

## Usage

### Basic Integration
```tsx
import AIAvatar from '@/components/ai/AIAvatar';

// In your layout or page
<AIAvatar />
```

### Environment Variables
```env
NEXT_PUBLIC_DIALOGFLOW_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

## User Interaction Flow

1. **Page Load**: Welcome popup appears after 3 seconds
2. **Permission Request**: User grants microphone access
3. **Greeting**: AI greets user in Hindi with female voice
4. **Voice Interaction**: User speaks, AI responds with relevant solar information
5. **Visual Feedback**: Avatar shows speaking/listening states
6. **Chat History**: All conversations are preserved in the session

## Accessibility Features

- **ARIA Labels**: Proper labels for screen readers
- **Keyboard Navigation**: Focus management with visible focus indicators
- **Error Handling**: Graceful fallbacks for video/audio failures
- **Visual Indicators**: Clear status indicators for different states

## Performance Optimizations

- **Video Optimization**: CSS-controlled video playback
- **Lazy Loading**: Components load only when needed
- **Memory Management**: Proper cleanup of audio/video resources
- **Fallback Systems**: Multiple fallback layers for reliability

## Browser Compatibility

- **Chrome/Edge**: Full support including video and voice
- **Firefox**: Good support with some voice limitations
- **Safari**: iOS/macOS support with webkit prefixes
- **Mobile**: Optimized for touch interactions

## Future Enhancements

1. **Advanced Dialogflow**: Full integration with custom intents
2. **Voice Cloning**: Custom female voice for brand consistency
3. **Multilingual**: Support for English and other regional languages
4. **Analytics**: Conversation tracking and insights
5. **Integration**: CRM and lead management integration

## Testing

To test the implementation:

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000`
3. Click on the video avatar in the bottom-right corner
4. Grant microphone permissions
5. Start speaking in Hindi about solar panels

## Troubleshooting

### Video Not Loading
- Check if the MP4 file exists in `/public/`
- Verify video format compatibility
- Check browser console for errors

### Voice Not Working
- Ensure microphone permissions are granted
- Check if Hindi voices are available in the system
- Verify browser voice synthesis support

### AI Responses
- Check SolarAIService for knowledge base updates
- Verify Dialogflow configuration if using advanced AI
- Check network connectivity for external AI services

## Support

For technical support or feature requests, contact the development team or refer to the project documentation.
