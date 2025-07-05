// lib/mongodb.ts or utils/mongodb.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "لطفاً متغیر محیطی MONGODB_URI را در فایل .env.local تنظیم کنید"
  );
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // This prevents TypeScript error when adding to the global object
  // Only in development, since global variables are shared in Fast Refresh
  var mongoose: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  globalForMongoose.mongoose = cached;

  return cached.conn;
}
