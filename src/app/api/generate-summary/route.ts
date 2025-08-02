import { GoogleGenAI, Content } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import type {
  GeminiRequestBody,
  GeminiSuccessResponse,
  GeminiErrorResponse,
} from "~/types/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APIKEY });

export async function POST(request: NextRequest) {
  try {
    const { geminiModel, content, geminiHistory }: GeminiRequestBody =
      await request.json();

    const contents: Content[] = [
      ...(geminiHistory || []),
      { role: "user", parts: [{ text: content }] },
    ];

    const result = await ai.models.generateContent({
      model: geminiModel,
      contents,
      config: {
        systemInstruction:
          "You are a specialist sales analyst expert. Provide detailed sales summaries and insights based on the provided data.",
      },
    });

    const response = result.text;

    const responsePayload: GeminiSuccessResponse = {
      body: {
        choices: [{ message: { content: response } }],
      },
    };
    console.log("Response from Gemini AI:", responsePayload);
    return NextResponse.json(responsePayload);
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    const errorPayload: GeminiErrorResponse = {
      error: errorMessage,
    };
    return NextResponse.json(errorPayload, { status: 500 });
  }
}
