import { NextResponse } from 'next/server'
import { getSuppliers } from '@/app/lib/db'

export async function GET() {
  try {
    const suppliers = await getSuppliers()
    return NextResponse.json({ suppliers })
  } catch (error) {
    console.error('Failed to fetch suppliers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' }, 
      { status: 500 }
    )
  }
}

