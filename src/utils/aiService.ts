import { WeatherData } from "@/types/weather";

export interface WeatherInsight {
  id: string;
  type: "outfit" | "activity" | "health" | "travel" | "general";
  title: string;
  description: string;
  icon: string;
  confidence: number;
  priority: "low" | "medium" | "high";
}

export interface AIWeatherService {
  generateInsights(weather: WeatherData): Promise<WeatherInsight[]>;
  getChatResponse(question: string, weather: WeatherData): Promise<string>;
}

export class GeminiWeatherService implements AIWeatherService {
  private apiKey: string;
  private baseURL = "https://generativelanguage.googleapis.com/v1beta";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateInsights(weather: WeatherData): Promise<WeatherInsight[]> {
    try {
      const prompt = this.createInsightPrompt(weather);
      
      const response = await fetch(`${this.baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI insights");
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return this.parseAIResponse(aiResponse, weather);
      
    } catch (error) {
      console.error("AI insights error:", error);
      return this.getFallbackInsights(weather);
    }
  }

  async getChatResponse(question: string, weather: WeatherData): Promise<string> {
    try {
      const context = this.createWeatherContext(weather);
      const prompt = `Bạn là trợ lý thời tiết. Thời tiết hiện tại: ${context}. Trả lời bằng tiếng Việt: ${question}`;
      
      const response = await fetch(`${this.baseURL}/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      
    } catch (error) {
      console.error("AI chat error:", error);
      const localAI = new LocalAIWeatherService();
      return await localAI.getChatResponse(question, weather);
    }
  }

  private createInsightPrompt(weather: WeatherData): string {
    return `Tạo gợi ý thời tiết cho: Vị trí ${weather.name}, nhiệt độ ${weather.main.temp}°C, thời tiết ${weather.weather[0].description}. Trả lời JSON: {"insights": [{"type": "outfit", "title": "Tiêu đề", "description": "Mô tả", "icon": "🌞", "confidence": 0.9, "priority": "high"}]}`;
  }

  private createWeatherContext(weather: WeatherData): string {
    return `${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`;
  }

  private parseAIResponse(response: string, weather: WeatherData): WeatherInsight[] {
    try {
      const jsonMatch = response.match(/{[\s\S]*}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      const parsed = JSON.parse(jsonStr);
      return parsed.insights.map((insight: Record<string, unknown>, index: number) => ({
        id: `ai-insight-${Date.now()}-${index}`,
        type: insight.type as WeatherInsight['type'],
        title: insight.title as string,
        description: insight.description as string,
        icon: insight.icon as string,
        confidence: insight.confidence as number,
        priority: insight.priority as WeatherInsight['priority']
      }));    } catch {
      return this.getFallbackInsights(weather);
    }
  }

  private getFallbackInsights(weather: WeatherData): WeatherInsight[] {
    const temp = weather.main.temp;
    const insights: WeatherInsight[] = [];

    if (temp > 30) {
      insights.push({
        id: "fallback-hot",
        type: "outfit",
        title: "Thời tiết nóng",
        description: "Mặc quần áo nhẹ và thoáng mát.",
        icon: "👕",
        confidence: 0.9,
        priority: "high"
      });
    }

    return insights;
  }
}

export class LocalAIWeatherService implements AIWeatherService {
  async generateInsights(weather: WeatherData): Promise<WeatherInsight[]> {
    const temp = weather.main.temp;
    const insights: WeatherInsight[] = [];

    if (temp > 30) {
      insights.push({
        id: "local-hot",
        type: "outfit",
        title: "Thời tiết nóng",
        description: "Mặc quần áo nhẹ, thoáng mát và đội mũ.",
        icon: "🌞",
        confidence: 0.9,
        priority: "high"
      });
    } else if (temp < 10) {
      insights.push({
        id: "local-cold",
        type: "outfit", 
        title: "Thời tiết lạnh",
        description: "Mặc áo khoác ấm và giữ ấm cơ thể.",
        icon: "🧥",
        confidence: 0.9,
        priority: "high"
      });
    }

    return insights;
  }

  async getChatResponse(question: string, weather: WeatherData): Promise<string> {
    const temp = weather.main.temp;
    const location = weather.name;
    
    if (question.toLowerCase().includes("mặc")) {
      if (temp > 30) {
        return `Với nhiệt độ ${temp}°C ở ${location}, bạn nên mặc quần áo nhẹ và thoáng mát.`;
      } else if (temp < 15) {
        return `Thời tiết ${temp}°C ở ${location} khá lạnh, nên mặc áo khoác ấm.`;
      }
    }
    
    return `Thời tiết hiện tại ở ${location}: ${temp}°C. Tôi có thể tư vấn về trang phục và hoạt động phù hợp.`;
  }
}

export async function testGeminiConnection(apiKey?: string): Promise<{ success: boolean; message: string }> {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!key) {
    return { success: false, message: "No Gemini API key found" };
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
      }),
    });

    if (response.ok) {
      return { success: true, message: "Gemini API connection successful" };
    } else {
      return { success: false, message: `API Error ${response.status}` };
    }  } catch (error) {
    return { success: false, message: `Connection error: ${String(error)}` };
  }
}

export function createAIWeatherService(): AIWeatherService {
  const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (geminiApiKey && geminiApiKey !== "your_gemini_api_key_here") {
    console.log("✅ Using Gemini AI service");
    return new GeminiWeatherService(geminiApiKey);
  }
  
  console.log("🔄 Using Local AI service");
  return new LocalAIWeatherService();
}
