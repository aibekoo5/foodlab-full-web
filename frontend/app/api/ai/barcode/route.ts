import { NextResponse } from 'next/server'
import ai from '@/lib/ai'

export async function POST(req: Request) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  const found = ai.lookupBarcode(code)
  if (!found) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(found)
}
