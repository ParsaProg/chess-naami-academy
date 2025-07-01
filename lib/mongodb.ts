import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('لطفاً متغیر محیطی MONGODB_URI را در فایل .env.local تنظیم کنید')
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
