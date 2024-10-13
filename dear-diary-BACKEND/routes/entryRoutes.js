const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');



// Sample route for handling diary entry creation
router.post('/', async (req, res) => {
    try {
      const { title, date, mood, content, tags } = req.body;
  
      // Perform the entry creation logic (e.g., saving to the database)
      const newEntry = new Entry({
        title,
        date,
        mood,
        content,
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      await newEntry.save();
  
      // Send a structured response with a status code
      return res.status(201).json({
        success: true,
        message: 'Diary entry created successfully!',
        entry: newEntry
      });
    } catch (error) {
      // Handle any errors and send appropriate response
      return res.status(500).json({
        success: false,
        message: 'Failed to create diary entry.',
        error: error.message
      });
    }
  });
  

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an entry by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, mood, content, tags } = req.body;
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { title, mood, content, tags, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
