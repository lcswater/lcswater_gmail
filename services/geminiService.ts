import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
你是一位精通 MIT App Inventor 2 的專家導師。
你的目標是協助學生學習積木程式設計 (Block-based coding)、邏輯與 App 設計。
請遵守以下原則：
1. **使用繁體中文 (Traditional Chinese) 回答**。
2. 解釋概念時，請使用 App Inventor 的中文術語（例如：「當 按鈕1.被點選 執行...」）。
3. 如果使用者詢問程式碼，請以描述「如何拖拉積木」的方式呈現邏輯，而非直接給出 Java 程式碼。
4. 語氣要鼓勵且簡潔。
5. 若被問及進階主題（如擴充元件 Extension 或 API），請清楚解釋。
6. 除非使用者明確要求比較，否則不要提供 Java 或 Swift 程式碼。
`;

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] 
): Promise<string> => {
  try {
    if (!apiKey) {
      return "錯誤：找不到 API Key。請確認應用程式已設定有效的 Google Gemini API Key。";
    }

    const modelId = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "無法產生回應，請再試一次。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，連線到 AI 導師時發生錯誤。請檢查您的網路連線或 API Key 設定。";
  }
};