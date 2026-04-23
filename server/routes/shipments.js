const express = require('express');
const Shipment = require('../models/Shipment');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const shipment = await Shipment.findOne({ id: req.params.id });
      if(!shipment) return res.status(404).json({ message: 'Not found' })
      res.json(shipment);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
