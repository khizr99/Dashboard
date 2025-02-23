
import express from 'express';
import Profile from '../models/Profile.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Create profile
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, instagram, youtube } = req.body;
    
    const profile = await Profile.create({
      user: req.userId,
      name,
      email,
      phone,
      instagram,
      youtube
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profiles
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.userId });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete profile
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; // ES Module