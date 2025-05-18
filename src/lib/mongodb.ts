import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import mongoose from 'mongoose';

// Cached connection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedMongoose: mongoose.Connection | null = null;

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalWithMongo = global as typeof globalThis & {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
  mongodb: {
    client: MongoClient | null;
    db: Db | null;
    promise: Promise<{ client: MongoClient, db: Db }> | null;
  }
};

// MongoDB Native Driver connection (for direct operations)
export async function connectToDatabase(): Promise<{ client: MongoClient, db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!globalWithMongo.mongodb) {
    globalWithMongo.mongodb = {
      client: null,
      db: null,
      promise: null,
    };
  }

  if (!globalWithMongo.mongodb.promise) {
    globalWithMongo.mongodb.promise = MongoClient.connect(uri, options)
      .then((client) => {
        const db = client.db();
        return { client, db };
      });
  }

  const { client, db } = await globalWithMongo.mongodb.promise;
  
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

// Mongoose connection (for schema-based operations)
export async function connectToMongoose(): Promise<mongoose.Connection> {
  if (cachedMongoose) {
    return cachedMongoose;
  }

  if (!globalWithMongo.mongoose) {
    globalWithMongo.mongoose = {
      conn: null,
      promise: null,
    };
  }

  if (!globalWithMongo.mongoose.promise) {
    mongoose.set('strictQuery', true);
    
    globalWithMongo.mongoose.promise = mongoose.connect(uri)
      .then((mongoose) => {
        return mongoose.connection;
      });
  }
  
  cachedMongoose = await globalWithMongo.mongoose.promise;
  return cachedMongoose;
}

// Disconnect function (useful for testing)
export async function disconnectFromDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
  }
  
  if (cachedMongoose) {
    await mongoose.disconnect();
    cachedMongoose = null;
  }
  
  cachedDb = null;
} 