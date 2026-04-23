const mongoose = require('mongoose');
const User = require('./models/User');
const Shipment = require('./models/Shipment');
const Alert = require('./models/Alert');
const Warehouse = require('./models/Warehouse');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/logisense';

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected. Dropping DB...');
    await mongoose.connection.dropDatabase();

    // Seed Users
    await User.create([
      { name: 'Arjun Sharma', terminalId: 'IND-DS-001', password: 'demo123', role: 'dispatcher' },
      { name: 'Priya Singh', terminalId: 'IND-MG-001', password: 'demo123', role: 'manager' },
      { name: 'Ramesh Kumar', terminalId: 'IND-DR-001', password: 'demo123', role: 'driver' },
    ]);

    // Seed Shipments
    await Shipment.create([
      { id: 'LSI-8829-MUM', origin: 'Warehouse Alpha, Delhi', destination: 'Port Terminal, Mumbai', status: 'delayed', riskScore: 75, currentLocation: 'Western Express Hwy', speed: 45, driver: 'Ramesh Kumar', vehicle: 'TRK-892A', eta: '14:30', cargo: 'Electronics' },
      { id: 'LSI-4410-BLR', origin: 'Hub Pune', destination: 'Warehouse Bangalore', status: 'in_transit', riskScore: 22, currentLocation: 'NH-48 Pune', speed: 62, driver: 'Suresh Patel', vehicle: 'TRK-110C', eta: '18:00', cargo: 'FMCG' },
      { id: 'LSI-7712-CHN', origin: 'Factory Surat', destination: 'Port Chennai', status: 'in_transit', riskScore: 35, currentLocation: 'NH-44 Hyderabad', speed: 58, driver: 'Vijay Singh', vehicle: 'C-44B', eta: '22:00', cargo: 'Cold Chain' },
      { id: 'LSI-3301-DEL', origin: 'Hub Mumbai', destination: 'Warehouse Delhi', status: 'delivered', riskScore: 0, currentLocation: 'Delivered', speed: 0, driver: 'Mohan Das', vehicle: 'TRK-220D', eta: 'Delivered', cargo: 'Pharma' },
    ]);

    // Seed Alerts
    await Alert.create([
        { id: 'ALT-001', type: 'traffic', severity: 'critical', title: 'Route Blockage Detected', shipmentId: 'TRK-892A', route: 'Mumbai-Pune Exp', message: 'Unexpected heavy traffic congestion ahead. Estimated delay: +45 mins.', icon: 'warning', color: 'error', action1: 'Suggest Reroute', action2: 'View on Map', resolved: false, time: '2 min ago' },
        { id: 'ALT-002', type: 'temperature', severity: 'high', title: 'Temperature Variance', shipmentId: 'C-44B', route: 'Cold Chain Logistics', message: 'Cargo temp approaching critical threshold (4°C). Immediate check required.', icon: 'thermostat', color: 'secondary-container', action1: 'Contact Driver', action2: 'Details', resolved: false, time: '8 min ago' },
    ]);

    // Seed Warehouses
    await Warehouse.create([
        { id: 'BLR-W01', name: 'Bangalore West Hub', city: 'Bangalore', load: 78, queue: 12, status: 'Nominal', color: 'emerald' },
        { id: 'DEL-N04', name: 'Delhi North Facility', city: 'Delhi NCR', load: 62, queue: 8, status: 'Nominal', color: 'emerald' },
        { id: 'BOM-H02', name: 'Mumbai Harbor Terminal', city: 'Mumbai', load: 89, queue: 24, status: 'Elevated', color: 'yellow' },
    ]);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedData();
