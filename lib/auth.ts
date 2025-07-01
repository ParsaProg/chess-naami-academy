import { NextRequest, NextResponse } from 'next/server'

export function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1] // Bearer token

  if (!token || token !== process.env.API_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  return null // یعنی مجازه
}
