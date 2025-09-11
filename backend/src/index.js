
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import vendorRoutes from './routes/vendors.js';
import listingRoutes from './routes/listings.js';
import reviewRoutes from './routes/reviews.js';
import categoryRoutes from './routes/categories.js';
import adminRoutes from './routes/admin.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req,res)=>res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/vendors', vendorRoutes);
app.use('/listings', listingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/categories', categoryRoutes);
app.use('/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/local_famous';
mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
}).catch(err => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
