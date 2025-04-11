import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
    try {
        const { title, description, ingredients, instructions, categories } =
            await request.json()

        const prompt = `Generate a plate for a recipe with title "${title}", description "${description}", ingredients "${ingredients}", instructions "${instructions}", categories "${categories}". The image should be a realistic, high-quality photograph of the prepared dish, well-lit and appetizing.`

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        return NextResponse.json({
            success: true,
            image: response.data[0].b64_json,
        })
    } catch (error) {
        console.error('Error generating image:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to generate image',
            },
            { status: 500 },
        )
    }
}
