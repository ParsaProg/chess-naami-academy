import { NextRequest, NextResponse } from 'next/server'

let articles: any[] = []

export async function GET(request: NextRequest) {
  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newArticle = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    createdAt: new Date().toISOString(),
  }
  articles.push(newArticle)
  return NextResponse.json(newArticle, { status: 201 })
}
