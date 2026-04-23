const express = require('express');
const Warehouse = require('../models/Warehouse');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
