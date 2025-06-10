## How to Get a Free Google Gemini API Key

### Step 1: Go to Google AI Studio
Visit: https://aistudio.google.com/

### Step 2: Sign in with your Google Account
Use any Google account (Gmail, Google Workspace, etc.)

### Step 3: Get Your API Key
1. Click "Get API key" in the top navigation
2. Click "Create API key in new project" (or select existing project)
3. Copy the generated API key

### Step 4: Add API Key to Your Weather App
1. Open your `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```
3. Save the file and restart your development server

### Free Tier Limits
- **1,500 requests per day** (much more generous than OpenAI)
- **1 million tokens per month**
- **15 requests per minute**

### API Features Used in WeatherHub
- **Smart Weather Insights**: AI-generated outfit, activity, health, and travel recommendations
- **Interactive Chat**: Natural language weather assistance in Vietnamese
- **Automatic Fallback**: If API fails, switches to local pattern-based responses

### Troubleshooting
- Make sure your API key doesn't have quotes around it
- Restart the development server after adding the key
- Check the browser console for any error messages

### Security Note
- Keep your API key secure
- Don't commit `.env.local` to version control
- The API key is safe to use in frontend (starts with client-side prefix)

---

**Your WeatherHub app will work perfectly without the API key too!** It will automatically use the enhanced local AI system we built, which provides intelligent weather recommendations based on pattern matching.
