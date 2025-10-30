<<<<<<< HEAD

=======
>>>>>>> ef3ca6a (Initial commit)
import { Router } from 'express';
import Review from '../models/Review.js';
import Listing from '../models/Listing.js';
import { auth } from '../middleware/auth.js';

const r = Router();

<<<<<<< HEAD
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

=======
/**
 * Create or update review (one per user)
 */
r.post('/:listingId', auth(), async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const { rating, text } = req.body;

    // Upsert only for this user
    const review = await Review.findOneAndUpdate(
      { listingId, userId: req.user.id },
      { rating, text },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Update listing's average rating
    const agg = await Review.aggregate([
      { $match: { listingId: review.listingId } },
      { $group: { _id: '$listingId', avg: { $avg: '$rating' } } },
    ]);
    const avg = agg[0]?.avg ?? rating;

    await Listing.findByIdAndUpdate(listingId, { ratingAvg: avg });
    res.status(201).json(review);
  } catch (e) {
    next(e);
  }
});

/**
 * Get all reviews for a listing
 */
r.get('/for/:listingId', auth(false), async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.find({ listingId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (e) {
    next(e);
  }
});

/**
 * Delete review — ✅ ONLY the review author can delete
 * (Admin cannot delete others' reviews)
 */
>>>>>>> ef3ca6a (Initial commit)
r.delete('/:id', auth(), async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
<<<<<<< HEAD
    if (req.user.role !== 'admin' && String(review.userId) !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await review.deleteOne();
    res.json({ ok: true });
  } catch (e) { next(e); }
=======

    // Enforce: only owner can delete (no admin bypass)
    if (String(review.userId) !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own review' });
    }

    const listingId = review.listingId;
    await review.deleteOne();

    // Recalculate listing's average rating
    const agg = await Review.aggregate([
      { $match: { listingId } },
      { $group: { _id: '$listingId', avg: { $avg: '$rating' } } },
    ]);
    const avg = agg[0]?.avg ?? 0;
    await Listing.findByIdAndUpdate(listingId, { ratingAvg: avg });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
>>>>>>> ef3ca6a (Initial commit)
});

export default r;
