import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

interface ChatRequestBody {
  prompt: string;
}

interface ChatResponseData {
  message?: string;
  tokens_used?: number;
  co2_emission?: number;
  water_usage?: number;
  error?: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Environmental impact factors
const CO2_PER_TOKEN = 0.02; // grams per token
const WATER_PER_TOKEN = 0.1 / 1000; // milliliters converted to liters per token

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { prompt } = body;

    // Using GPT-4 model
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    // Calculate usage statistics
    const tokensUsed = response.usage?.total_tokens ?? 0;
    const co2Emission = tokensUsed * CO2_PER_TOKEN; // updated CO₂ in grams
    const waterUsage = tokensUsed * WATER_PER_TOKEN; // updated water in liters

    // Record usage in Supabase
    await supabase.from('api_usage').insert([
      {
        tokens_used: tokensUsed,
        api_calls: 1,
        co2_emission: co2Emission,
        water_usage: waterUsage,
      },
    ]);

    // Use the ChatResponseData interface for typing the response
    const responseData: ChatResponseData = {
      message: response.choices[0]?.message.content ?? '',
      tokens_used: tokensUsed,
      co2_emission: co2Emission,
      water_usage: waterUsage,
    };

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    // Use 'unknown' instead of 'any' for better type safety
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage } as ChatResponseData, { status: 500 });
  }
}
