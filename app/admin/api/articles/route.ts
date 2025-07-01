import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Article from '@/models/Article'
import { checkAuth } from '@/lib/auth'

// GET: دریافت همه مقالات
export async function GET(req: NextRequest) {
  const authError = checkAuth(req)
  if (authError) return authError

  await connectToDatabase()
  const articles = await Article.find().sort({ createdAt: -1 })
  return NextResponse.json(articles)
}

// POST: ساخت مقاله جدید
export async function POST(req: NextRequest) {
  const authError = checkAuth(req)
  if (authError) return authError

  await connectToDatabase()
  const data = await req.json()

  if (!data.title || !data.content) {
    return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
  }

  const newArticle = await Article.create(data)
  return NextResponse.json(newArticle, { status: 201 })
}
