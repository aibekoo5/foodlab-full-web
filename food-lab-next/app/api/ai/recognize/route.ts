import { NextResponse } from 'next/server'
import ai from '@/lib/ai'

export async function POST(req: Request) {
  const body = await req.json()
  const image = body.image
  if (!image) return NextResponse.json({ error: 'image required' }, { status: 400 })
  const res = await ai.recognizeFromImage(image)
  return NextResponse.json(res)
}
