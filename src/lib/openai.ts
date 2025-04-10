import OpenAI from 'openai'

// Initialize the OpenAI client
// The API key will be loaded from environment variables
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Export types for better TypeScript support
export type OpenAIResponse = OpenAI.Chat.Completions.ChatCompletion
export type OpenAIRequest = OpenAI.Chat.Completions.ChatCompletionCreateParams
