import mongoose from "mongoose";

const localMongoUri = "mongodb://127.0.0.1:27017/CareerHub";

const connectDB = async () => {
  const connectionUris = [
    process.env.MONGO_URI,
    process.env.MONGO_URI_LOCAL,
    process.env.NODE_ENV !== "production"
      ? localMongoUri
      : null,
  ].filter(Boolean);

  let lastError = null;

  for (const [index, uri] of connectionUris.entries()) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log(
        `MongoDB Connected: ${conn.connection.host}`
      );
      return conn;
    } catch (error) {
      lastError = error;
      console.error(
        `MongoDB Error (attempt ${index + 1}):`,
        error.message
      );
    }
  }

  console.warn(
    "MongoDB connection failed. Check MONGO_URI, whitelist your Atlas IP, or start a local MongoDB instance for development."
  );

  if (lastError) {
    return null;
  }
};

export default connectDB;