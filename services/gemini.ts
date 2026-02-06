
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const geminiService = {
  async generateEmail(leadName: string, context: string, goal: string, tone: string) {
    const ai = new GoogleGenAI({ apiKey: API_KEY! });
    const prompt = `
      Act as a world-class sales professional. Generate a personalized outreach email for a CRM.
      Lead Name: ${leadName}
      Lead Context: ${context}
      Email Goal: ${goal}
      Desired Tone: ${tone}
      
      Requirements:
      - Subject line included at the start.
      - Use placeholders like {{My Name}} for the sender.
      - Keep it concise and focused on the goal.
      - Output as plain text.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to generate email draft. Please try again.";
    }
  },

  async getAiSuggestions(crmSummary: string) {
    const ai = new GoogleGenAI({ apiKey: API_KEY! });
    const prompt = `
      Based on the following CRM summary, provide 3 key "Next Best Action" suggestions to improve deal velocity and lead conversion.
      
      CRM Data Summary:
      ${crmSummary}
      
      Return a JSON array of objects with fields: title, description, and priority (High, Medium, Low).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING }
              },
              required: ["title", "description", "priority"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini Error:", error);
      return [];
    }
  },

  async summarizeLead(leadContext: string) {
    const ai = new GoogleGenAI({ apiKey: API_KEY! });
    const prompt = `
      Analyze this lead's activity and profile. Provide a 2-sentence strategic summary for a sales rep.
      Lead Data: ${leadContext}
    `;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text;
    } catch (error) {
      return "Unable to generate analysis at this time.";
    }
  },

  async chatAssistant(history: { role: 'user' | 'model', parts: { text: string }[] }[], crmContext: string, userMessage: string) {
    const ai = new GoogleGenAI({ apiKey: API_KEY! });
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are SalesAI, a helpful assistant for a CRM platform. 
        You have access to the following CRM data context: ${crmContext}. 
        Answer user questions about their leads, deals, and tasks. 
        Be professional, concise, and helpful. If you don't know something, say you don't have that data.`
      }
    });

    try {
      const result = await chat.sendMessage({ message: userMessage });
      return result.text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I'm having trouble connecting to my brain right now. Please try again.";
    }
  }
};
