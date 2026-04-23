const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Mock Login Route
router.post('/login', async (req, res) => {
  const { terminalId, password } = req.body;

  try {
    // In a real app, this would query the DB. Since we might rely on the frontend demo credentials,
    // we'll implement a basic check that allows either the demo DB user or a mock response.
    let user = await User.findOne({ terminalId });

    if (!user) {
        // Fallback for demo
        if(terminalId === 'IND-DS-001' && password === 'demo123') {
            user = { name: 'Arjun Sharma', terminalId: 'IND-DS-001', role: 'dispatcher' };
        } else if (!terminalId) {
             user = { name: 'Demo Dispatcher', terminalId: 'DEMO', role: 'dispatcher' };
        } else {
             return res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        if(user.password !== password) {
             return res.status(401).json({ message: 'Invalid credentials' });
        }
    }

    const token = jwt.sign(
      { id: user.id || 'demo-id', terminalId: user.terminalId, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
