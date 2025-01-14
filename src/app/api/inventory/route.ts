import { NextResponse } from 'next/server'
import { getInventory } from '@/app/lib/db'

export async function GET() {
  try {
    const inventory = await getInventory()
    return NextResponse.json({ inventory })
  } catch (error) {
    console.error('Failed to fetch inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' }, 
      { status: 500 }
    )
  }
}

