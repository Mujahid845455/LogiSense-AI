const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'] }
});

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const shipmentRoutes = require('./routes/shipments');
const alertRoutes = require('./routes/alerts');
const warehouseRoutes = require('./routes/warehouses');

app.use('/api/auth', authRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/warehouses', warehouseRoutes);

// Socket.io integration
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Example of broadcasting a mock alert
  // setTimeout(() => {
  //   socket.emit('new_alert', { id: 'ALT-NEW', title: 'Live Update', message: 'Test live alert broadcast' });
  // }, 5000);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/logisense';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('DB error:', err);
    server.listen(PORT, () => console.log(`Server on ${PORT} (no DB)`));
  });
}

// Export for Vercel
module.exports = app;
