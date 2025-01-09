import { NextResponse } from 'next/server'
import { addProduct } from '@/app/lib/db'

export async function POST(request: Request) {
  try {
    const product = await request.json()
    const newProduct = await addProduct(product)
    return NextResponse.json({ product: newProduct })
  } catch (error) {
    console.error('Failed to add product:', error)
    return NextResponse.json(
      { error: 'Failed to add product' }, 
      { status: 500 }
    )
  }
}

