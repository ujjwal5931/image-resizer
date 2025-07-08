import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    // Get form data from the request
    const formData = await request.formData()
    
    // Extract the image file and dimensions
    const imageFile = formData.get('image') as File
    const width = parseInt(formData.get('width') as string)
    const height = parseInt(formData.get('height') as string)

    // Validate required fields
    if (!imageFile || !width || !height) {
      return NextResponse.json(
        { error: 'Missing required fields: image, width, or height' },
        { status: 400 }
      )
    }

    // Validate dimensions
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return NextResponse.json(
        { error: 'Invalid dimensions. Width and height must be positive numbers.' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())

    // Resize the image using sharp
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(width, height, {
        fit: 'fill', // Fill the exact dimensions
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .jpeg({ quality: 90 }) // Convert to JPEG with 90% quality
      .toBuffer()

    // Return the resized image
    return new NextResponse(resizedImageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="resized_${imageFile.name || 'image'}.jpg"`,
      },
    })

  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image. Please try again.' },
      { status: 500 }
    )
  }
} 