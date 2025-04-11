import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
    try {
        const { image } = await request.json()

        // Convert base64 to buffer
        const imageBuffer = Buffer.from(image, 'base64')

        // Generate a unique filename
        const filename = `recipe-${Date.now()}.jpg`
        const uploadPath = path.join(
            process.cwd(),
            'public',
            'images',
            'recipes',
            filename,
        )

        // Ensure the directory exists
        const dir = path.dirname(uploadPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        // Save the image
        fs.writeFileSync(uploadPath, imageBuffer)

        return NextResponse.json({
            success: true,
            image_url: `/images/recipes/${filename}`,
        })
    } catch (error) {
        console.error('Error uploading image:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to upload image',
            },
            { status: 500 },
        )
    }
}
