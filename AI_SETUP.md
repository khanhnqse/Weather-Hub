# AI Integration Setup for WeatherHub

## Environment Variables

Add these to your `.env.local` file:

```env
# Required: OpenWeatherMap API Key
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

# Optional: Google Gemini API Key (for advanced AI features)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## AI Features

### 1. **Local AI (Default)**

- Works without any AI API key
- Uses pattern matching and rules
- Fast and free
- Provides basic weather insights in Vietnamese

### 2. **Google Gemini Integration (Optional)**

- Requires free Google AI API key
- Advanced natural language understanding
- More personalized responses in Vietnamese
- Better conversation flow
- **FREE TIER AVAILABLE** - Much more generous than OpenAI

## Getting Google Gemini API Key (FREE!)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add to your `.env.local` file:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

## API Usage and Costs

- **Local AI**: Completely free
- **Google Gemini API**: 
  - **FREE TIER**: 15 requests per minute, 1,500 requests per day
  - Perfect for personal weather apps
  - Much more generous than OpenAI's free tier
  - No billing required for free tier usage

## Why Gemini Instead of OpenAI?

- ✅ **Free tier**: No billing required
- ✅ **Higher limits**: 1,500 requests/day vs OpenAI's limited trial
- ✅ **Better Vietnamese support**: Native multilingual capabilities
- ✅ **Faster responses**: Lower latency
- ✅ **No quota issues**: Reliable free access

## Security Notes

- Never commit API keys to version control
- Keep `.env.local` in `.gitignore`
- Use environment variables in production
- Rotate keys periodically

## Testing AI Features

1. **Without OpenAI**: AI will use local patterns
2. **With OpenAI**: More advanced responses
3. Test both modes to compare functionality
