<<<<<<< HEAD

import { Router } from 'express';
import Vendor from '../models/Vendor.js';
=======
import { Router } from 'express';
import Vendor from '../models/Vendor.js';
import User from '../models/User.js';
>>>>>>> ef3ca6a (Initial commit)
import { auth, requireRole } from '../middleware/auth.js';

const r = Router();

<<<<<<< HEAD
r.post('/', auth(), async (req, res, next) => {
  try {
    const { phone, docs } = req.body;
    const vendor = await Vendor.create({ userId: req.user.id, phone, docs, verified: false });
    res.status(201).json(vendor);
  } catch (e) { next(e); }
});

=======
/**
 * 🏗️ Create a vendor profile (user applies to become vendor)
 */
r.post('/', auth(), async (req, res, next) => {
  try {
    const { phone, docs } = req.body;

    // Check if vendor already exists for this user
    const existing = await Vendor.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ error: 'Vendor profile already exists' });
    }

    const vendor = await Vendor.create({
      userId: req.user.id,
      phone,
      docs,
      verified: false,
    });

    res.status(201).json(vendor);
  } catch (e) {
    next(e);
  }
});

/**
 * 👤 Get the current user's vendor profile
 */
>>>>>>> ef3ca6a (Initial commit)
r.get('/me', auth(), async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });
    res.json(vendor);
<<<<<<< HEAD
  } catch (e) { next(e); }
});

r.patch('/:id/verify', auth(), requireRole('admin'), async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    res.json(vendor);
  } catch (e) { next(e); }
=======
  } catch (e) {
    next(e);
  }
});

/**
 * ✅ Admin-only: Verify vendor + update user role
 */
r.patch('/:id/verify', auth(), requireRole('admin'), async (req, res, next) => {
  try {
    // 1️⃣ Verify the vendor
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // 2️⃣ Update the corresponding user role to "vendor"
    await User.findByIdAndUpdate(vendor.userId, { role: 'vendor' });

    res.json({
      message: 'Vendor verified successfully and user role updated to vendor',
      vendor,
    });
  } catch (e) {
    next(e);
  }
>>>>>>> ef3ca6a (Initial commit)
});

export default r;
