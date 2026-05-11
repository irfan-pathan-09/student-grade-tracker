const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');

// GET all grades
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find().sort({ createdAt: -1 });
    res.json({ success: true, data: grades });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single grade
router.get('/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ success: false, message: 'Grade not found' });
    res.json({ success: true, data: grade });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create grade
router.post('/', async (req, res) => {
  try {
    const grade = new Grade(req.body);
    const saved = await grade.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update grade
router.put('/:id', async (req, res) => {
  try {
    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Grade not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE grade
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Grade.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Grade not found' });
    res.json({ success: true, message: 'Grade deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
