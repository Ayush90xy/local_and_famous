
import { Router } from 'express';
import Vendor from '../models/Vendor.js';
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

r.post('/', auth(), async (req, res, next) => {
  try {
    const { phone, docs } = req.body;
    const vendor = await Vendor.create({ userId: req.user.id, phone, docs, verified: false });
    res.status(201).json(vendor);
  } catch (e) { next(e); }
});

r.get('/me', auth(), async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });
    res.json(vendor);
  } catch (e) { next(e); }
});

r.patch('/:id/verify', auth(), requireRole('admin'), async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json(vendor);
  } catch (e) { next(e); }
});

export default r;
