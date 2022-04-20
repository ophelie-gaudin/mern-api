import mongoose from 'mongoose';

export const initDb = async () => {
  console.log('[Mongo] Connecting to database...');

  const mongooseClient = await mongoose.connect(process.env.MONGO_URL as string);

  console.log('[Mongo] Successfuly connected');

  return mongooseClient;
};
