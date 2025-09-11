
import { Router } from 'express';
import Review from '../models/Review.js';
import Listing from '../models/Listing.js';
import { auth } from '../middleware/auth.js';

const r = Router();

r.post('/', auth(), async (req, res, next) => {
  try {
    const { listingId, rating, text } = req.body;
    const review = await Review.create({ listingId, userId: req.user.id, rating, text });
    const agg = await Review.aggregate([
      { $match: { listingId: review.listingId } },
      { $group: { _id: '$listingId', avg: { $avg: '$rating' } } }
    ]);
    const avg = agg[0]?.avg || rating;
    await Listing.findByIdAndUpdate(listingId, { ratingAvg: avg });
    res.status(201).json(review);
  } catch (e) { next(e); }
});

r.get('/for/:listingId', async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.find({ listingId });
    res.json(reviews);
  } catch (e) { next(e); }
});

r.delete('/:id', auth(), async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
    if (req.user.role !== 'admin' && String(review.userId) !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await review.deleteOne();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default r;
