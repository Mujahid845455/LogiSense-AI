const express = require('express');
const Alert = require('../models/Alert');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an alert (e.g., mark as resolved)
router.patch('/:id/resolve', async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
        { id: req.params.id },
        { resolved: true },
        { new: true }
    );
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
