
import 'dotenv/config';
import mongoose from 'mongoose';
import Category from './models/Category.js';

await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/local_famous');
await Category.deleteMany({});
await Category.insertMany([
  { name: 'Food', slug: 'food' },
  { name: 'Crafts', slug: 'crafts' },
  { name: 'Art', slug: 'art' },
  { name: 'Heritage', slug: 'heritage' }
]);
console.log('Seeded categories');
process.exit(0);
