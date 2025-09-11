
import { Router } from 'express';
import Listing from '../models/Listing.js';
import Vendor from '../models/Vendor.js';
import Category from '../models/Category.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.post('/', auth(), async (req, res, next) => {
  try {
    const { title, description, categorySlug, geoPoint, images, hours } = req.body;
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) return res.status(400).json({ error: 'Vendor profile required' });
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) return res.status(400).json({ error: 'Invalid category' });
    const listing = await Listing.create({
      vendorId: vendor._id,
      title, description,
      categoryId: category._id,
      geoPoint: { type: 'Point', coordinates: [geoPoint.lon, geoPoint.lat] },
      status: 'pending',
      images, hours
    });
    res.status(201).json(listing);
  } catch (e) { next(e); }
});

r.get('/nearby', async (req, res, next) => {
  try {
    const { lat, lon, radius=5000, limit=50, category } = req.query;
    const q = { status: 'published' };
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) q.categoryId = cat._id;
    }
    const docs = await Listing.aggregate([
      { $geoNear: {
        near: { type: 'Point', coordinates: [Number(lon), Number(lat)] },
        distanceField: 'distance',
        maxDistance: Number(radius),
        spherical: true
      }},
      { $match: q },
      { $limit: Number(limit) }
    ]);
    res.json(docs);
  } catch (e) { next(e); }
});

r.get('/:id', async (req, res, next) => {
  try {
    const item = await Listing.findById(req.params.id);
    res.json(item);
  } catch (e) { next(e); }
});

r.get('/mine/vendor', auth(), async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (!vendor) return res.json([]);
    const items = await Listing.find({ vendorId: vendor._id });
    res.json(items);
  } catch (e) { next(e); }
});

r.patch('/:id/status', auth(), requireRole('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    const item = await Listing.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(item);
  } catch (e) { next(e); }
});

export default r;
