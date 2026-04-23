# 🎨 Design Document
## LogistiQ India — System Architecture & UI/UX Design
---
## 1. System Architecture Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  React Web   │  │  Driver App  │  │  Mobile PWA      │  │
│  │  Dashboard   │  │  (React PWA) │  │  (Warehouse)     │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
└─────────┼────────────────-┼────────────────────┼───────────┘
          │ HTTPS/WSS       │ HTTPS/WSS           │
┌─────────▼─────────────────▼────────────────────▼───────────┐
│                    API GATEWAY (Nginx)                       │
│            Rate Limiting | SSL Termination | LB             │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                  BACKEND MICROSERVICES                       │
│  ┌─────────────┐ ┌────────────┐ ┌───────────────────────┐  │
│  │ Auth Service│ │ Tracking   │ │  Route Intelligence   │  │
│  │ (Node.js)   │ │ Service    │ │  Service (Node+Python) │  │
│  └─────────────┘ │ (Node.js + │ └───────────────────────┘  │
│  ┌─────────────┐ │  Socket.IO)│ ┌───────────────────────┐  │
│  │  Shipment   │ └────────────┘ │  Analytics & ML       │  │
│  │  Service    │ ┌────────────┐ │  Service (Python)     │  │
│  │ (Node.js)   │ │ Alert &    │ └───────────────────────┘  │
│  └─────────────┘ │ Notif Svc  │ ┌───────────────────────┐  │
│  ┌─────────────┐ │ (Node.js)  │ │  Integration Service  │  │
│  │  Fleet Mgmt │ └────────────┘ │  (External APIs)      │  │
│  │  Service    │                └───────────────────────┘  │
│  └─────────────┘                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    DATA LAYER                               │
│  ┌─────────────┐ ┌────────────┐ ┌──────────────────────┐   │
│  │  MongoDB    │ │   Redis    │ │     Kafka            │   │
│  │  (Primary   │ │  (Cache +  │ │  (Event Streaming)   │   │
│  │   Database) │ │  Sessions) │ │                      │   │
│  └─────────────┘ └────────────┘ └──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```
---
## 2. Frontend Architecture
### 2.1 Technology Stack
| Component | Technology | Reason |
|-----------|-----------|--------|
| Framework | React 18 + TypeScript | Type safety, component reuse |
| State Management | Zustand / Redux Toolkit | Global state for real-time data |
| Routing | React Router v6 | SPA navigation |
| Styling | Tailwind CSS 3 | Utility-first, India-friendly themes |
| Charts | Recharts + Chart.js | Rich data visualization |
| Maps | Leaflet.js | Free, India map support |
| Real-time | Socket.IO Client | WebSocket with fallback |
| HTTP Client | Axios | Interceptors, retry logic |
| Forms | React Hook Form + Zod | Validation |
| i18n | react-i18next | Hindi/Regional language |
| Build | Vite | Fast builds |
### 2.2 Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Button, Input, Modal, Card
│   │   ├── dashboard/       # KPI cards, summary widgets
│   │   ├── maps/            # MapView, VehicleMarker, RouteLayer
│   │   ├── charts/          # LineChart, HeatMap, BarChart
│   │   ├── alerts/          # AlertPanel, NotificationBell
│   │   └── forms/           # ShipmentForm, VehicleForm
│   ├── pages/
│   │   ├── Dashboard/       # Main overview
│   │   ├── Tracking/        # Live vehicle map
│   │   ├── Shipments/       # Shipment list/detail
│   │   ├── Routes/          # Route planning & comparison
│   │   ├── Fleet/           # Vehicle management
│   │   ├── Warehouse/       # Hub management
│   │   ├── Analytics/       # Advanced analytics
│   │   ├── Alerts/          # Alert management
│   │   └── Settings/        # Config & admin
│   ├── hooks/
│   │   ├── useSocket.ts     # WebSocket connection
│   │   ├── useVehicles.ts   # Vehicle tracking data
│   │   ├── useAlerts.ts     # Alert management
│   │   └── useAnalytics.ts  # Analytics queries
│   ├── store/
│   │   ├── authStore.ts     # Authentication state
│   │   ├── vehicleStore.ts  # Vehicle positions
│   │   ├── alertStore.ts    # Active alerts
│   │   └── shipmentStore.ts # Shipment state
│   ├── services/
│   │   ├── api.ts           # Axios instance
│   │   ├── authService.ts   # Auth API calls
│   │   ├── trackingService.ts
│   │   └── routeService.ts
│   ├── types/
│   │   ├── vehicle.ts
│   │   ├── shipment.ts
│   │   └── route.ts
│   └── utils/
│       ├── formatters.ts    # Date, currency, distance
│       ├── geoUtils.ts      # Coordinate calculations
│       └── riskCalculator.ts
```
---
## 3. Backend Architecture
### 3.1 Technology Stack
| Component | Technology |
|-----------|-----------|
| Runtime | Node.js 20 LTS |
| Framework | Express.js 4.x |
| Real-time | Socket.IO 4.x |
| Database ORM | Mongoose 8.x |
| Auth | JWT + bcrypt |
| Validation | Joi / Zod |
| Logging | Winston + Morgan |
| Cache | Redis (ioredis) |
| Queue | Bull (Redis-based) |
| Testing | Jest + Supertest |
### 3.2 Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   ├── redis.js         # Redis connection
│   │   └── socket.js        # Socket.IO setup
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Vehicle.js       # Vehicle schema
│   │   ├── Shipment.js      # Shipment schema
│   │   ├── Route.js         # Route schema
│   │   ├── Alert.js         # Alert schema
│   │   ├── GpsTrack.js      # Time-series GPS data
│   │   └── Warehouse.js     # Hub/warehouse schema
│   ├── routes/
│   │   ├── auth.js          # Login, register, refresh
│   │   ├── vehicles.js      # Vehicle CRUD + tracking
│   │   ├── shipments.js     # Shipment management
│   │   ├── routes.js        # Route optimization
│   │   ├── alerts.js        # Alert management
│   │   ├── analytics.js     # Dashboard data
│   │   └── warehouses.js    # Hub management
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vehicleController.js
│   │   ├── shipmentController.js
│   │   ├── routeController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   ├── rbac.js          # Role-based access
│   │   ├── rateLimit.js     # Rate limiting
│   │   └── errorHandler.js  # Global error handling
│   ├── services/
│   │   ├── aiRouteService.js    # AI route optimization
│   │   ├── weatherService.js    # Weather API integration
│   │   ├── trafficService.js    # Traffic data
│   │   ├── alertService.js      # Alert generation
│   │   ├── smsService.js        # SMS/WhatsApp notifications
│   │   └── etaService.js        # ETA prediction
│   └── socket/
│       ├── vehicleSocket.js     # Real-time GPS updates
│       └── alertSocket.js       # Real-time alerts
├── tests/
└── server.js                    # Entry point
```
---
## 4. Database Design
### 4.1 MongoDB Collections
#### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "Rajesh Kumar",
  "email": "rajesh@logistiq.in",
  "password": "hashed",
  "role": "dispatcher | manager | driver | admin",
  "phone": "+91-9876543210",
  "language": "hi | en | ta | te | bn",
  "assignedRegion": "North | South | East | West",
  "createdAt": "ISODate",
  "lastLogin": "ISODate",
  "isActive": true
}
```
#### Vehicles Collection
```json
{
  "_id": "ObjectId",
  "vehicleNumber": "DL-01-AB-1234",
  "type": "truck | mini-truck | three-wheeler | train | air",
  "capacity": { "weight": 20000, "volume": 50, "unit": "kg" },
  "driver": { "userId": "ObjectId", "name": "...", "phone": "..." },
  "currentLocation": {
    "type": "Point",
    "coordinates": [77.2090, 28.6139],
    "timestamp": "ISODate",
    "speed": 65,
    "heading": 180
  },
  "status": "active | idle | breakdown | maintenance",
  "assignedRoute": "ObjectId",
  "fuelLevel": 75,
  "engineHealth": 92,
  "lastMaintenance": "ISODate"
}
```
#### Shipments Collection
```json
{
  "_id": "ObjectId",
  "shipmentId": "LGQ-2025-001234",
  "origin": { "address": "...", "hub": "...", "coordinates": [] },
  "destination": { "address": "...", "hub": "...", "coordinates": [] },
  "waypoints": [],
  "status": "created | in-transit | at-hub | delivered | exception",
  "vehicle": "ObjectId",
  "driver": "ObjectId",
  "plannedETA": "ISODate",
  "predictedETA": "ISODate",
  "actualArrival": "ISODate",
  "cargo": {
    "type": "general | cold-chain | hazmat | fragile",
    "weight": 5000,
    "value": 250000,
    "documents": []
  },
  "riskScore": 25,
  "riskLevel": "low | medium | high | critical",
  "alerts": ["ObjectId"],
  "cost": { "planned": 8500, "actual": 9200, "fuel": 3500, "toll": 800 },
  "ewayBillNumber": "1234567890",
  "timeline": []
}
```
#### GPS Tracks Collection (Time-Series)
```json
{
  "_id": "ObjectId",
  "vehicleId": "ObjectId",
  "shipmentId": "ObjectId",
  "location": {
    "type": "Point",
    "coordinates": [77.2090, 28.6139]
  },
  "speed": 65,
  "heading": 180,
  "altitude": 220,
  "accuracy": 5,
  "timestamp": "ISODate",
  "flags": {
    "overspeeding": false,
    "idling": false,
    "harshBraking": false,
    "geofenceViolation": false
  }
}
```
#### Alerts Collection
```json
{
  "_id": "ObjectId",
  "type": "weather | traffic | strike | breakdown | delay | geofence",
  "severity": "low | medium | high | critical",
  "shipmentId": "ObjectId",
  "vehicleId": "ObjectId",
  "title": "Flood Warning on NH-44",
  "description": "Heavy rainfall predicted in next 3 hours...",
  "affectedRoutes": [],
  "suggestedActions": [
    { "type": "reroute", "description": "...", "savingMinutes": 45 },
    { "type": "modal-shift", "description": "...", "mode": "rail" }
  ],
  "status": "active | acknowledged | resolved",
  "acknowledgedBy": "ObjectId",
  "resolvedAt": "ISODate",
  "createdAt": "ISODate"
}
```
### 4.2 MongoDB Indexes
```javascript
// Geospatial index for location queries
db.vehicles.createIndex({ "currentLocation": "2dsphere" });
db.gpstracks.createIndex({ "location": "2dsphere" });
// Time-series index for GPS data
db.gpstracks.createIndex({ "vehicleId": 1, "timestamp": -1 });
// Compound indexes for common queries
db.shipments.createIndex({ "status": 1, "riskLevel": 1 });
db.alerts.createIndex({ "status": 1, "severity": 1, "createdAt": -1 });
```
---
## 5. API Design
### 5.1 REST API Endpoints
#### Authentication
```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
```
#### Vehicles
```
GET    /api/v1/vehicles              # List all vehicles
POST   /api/v1/vehicles              # Create vehicle
GET    /api/v1/vehicles/:id          # Get vehicle detail
PUT    /api/v1/vehicles/:id          # Update vehicle
DELETE /api/v1/vehicles/:id          # Delete vehicle
GET    /api/v1/vehicles/:id/track    # GPS history
POST   /api/v1/vehicles/:id/location # Update GPS (IoT device)
GET    /api/v1/vehicles/nearby       # Vehicles near a point
```
#### Shipments
```
GET    /api/v1/shipments             # List with filters
POST   /api/v1/shipments             # Create shipment
GET    /api/v1/shipments/:id         # Get detail
PUT    /api/v1/shipments/:id         # Update status
GET    /api/v1/shipments/:id/timeline # Status history
POST   /api/v1/shipments/:id/alert   # Raise alert
```
#### Route Intelligence
```
POST   /api/v1/routes/optimize       # Get optimal route
POST   /api/v1/routes/compare        # Compare 3 routes
POST   /api/v1/routes/reroute        # Emergency reroute
GET    /api/v1/routes/risk-zones     # Current risk zones on map
POST   /api/v1/routes/eta            # Predict ETA
```
#### Analytics
```
GET    /api/v1/analytics/kpis        # Main KPI metrics
GET    /api/v1/analytics/delays      # Delay analysis
GET    /api/v1/analytics/costs       # Cost analytics
GET    /api/v1/analytics/fleet       # Fleet utilization
GET    /api/v1/analytics/predictions # AI predictions
```
### 5.2 WebSocket Events
#### Client → Server
```javascript
socket.emit('vehicle:subscribe', { vehicleId });
socket.emit('vehicle:location:update', { lat, lng, speed, heading });
socket.emit('alert:acknowledge', { alertId, action });
```
#### Server → Client
```javascript
socket.emit('vehicle:location', { vehicleId, lat, lng, speed });
socket.emit('alert:new', { alertId, severity, title, actions });
socket.emit('shipment:status', { shipmentId, status, eta });
socket.emit('route:reroute', { shipmentId, newRoute, reason });
```
---
## 6. UI/UX Design System
### 6.1 Color Palette
```css
/* Primary - Trust & Technology */
--primary-900: #0C1B33    /* Deep Navy - Headers */
--primary-700: #1A3A6B    /* Dark Blue - Sidebar */
--primary-500: #2563EB    /* Brand Blue - Primary actions */
--primary-300: #93C5FD    /* Light Blue - Secondary */
/* Status Colors */
--success:  #10B981  /* Green - On Time, Safe */
--warning:  #F59E0B  /* Amber - At Risk */
--danger:   #EF4444  /* Red - Critical, Delayed */
--info:     #3B82F6  /* Blue - Information */
/* Indian Context */
--accent-saffron: #FF9933  /* Alerts, India-specific warnings */
--accent-green:   #138808  /* Positive metrics */
/* Neutrals */
--gray-50:  #F9FAFB
--gray-100: #F3F4F6
--gray-900: #111827
```
### 6.2 Typography
```css
/* Primary Font - Readable for Hindi support */
--font-primary: 'Noto Sans', 'Poppins', sans-serif;
/* Hindi/Devanagari */
--font-hindi: 'Noto Sans Devanagari', sans-serif;
/* Monospace for IDs/codes */
--font-mono: 'JetBrains Mono', monospace;
```
### 6.3 Key UI Screens
#### Screen 1: Main Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ 🚚 LogistiQ India  |  [🔔 3 Alerts]  |  [👤 Rajesh Kumar]  │
├──────────┬──────────────────────────────────────────────────┤
│          │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│
│ SIDEBAR  │  │ Active   │ │ On-Time  │ │Delayed   │ │ Cost ││
│          │  │ Trips:47 │ │ Rate:87% │ │ Ships: 6 │ │ Saved││
│ 🏠 Home  │  └──────────┘ └──────────┘ └──────────┘ └──────┘│
│ 📍 Track │  ┌──────────────────────────┐ ┌─────────────────┐│
│ 📦 Ships │  │    LIVE MAP              │ │  ALERTS PANEL   ││
│ 🛣️ Routes│  │  [India Map with trucks] │ │ 🔴 NH-44 Flood  ││
│ 🚛 Fleet │  │                          │ │ 🟡 Delhi Strike ││
│ 🏭 Hubs  │  │                          │ │ 🟠 Driver Fatigue│
│ 📊 Stats │  └──────────────────────────┘ └─────────────────┘│
│ ⚙️ Admin │  ┌──────────────────────────────────────────────┐│
│          │  │  ACTIVE SHIPMENTS TABLE                       ││
│          │  │  ID | Origin → Dest | ETA | Status | Risk    ││
└──────────┴──────────────────────────────────────────────────┘
```
#### Screen 2: Route Intelligence
```
┌─────────────────────────────────────────────────────────────┐
│  🛣️ Route Intelligence — Delhi → Mumbai                     │
├──────────────────────────┬──────────────────────────────────┤
│  ROUTE COMPARISON        │   MAP VIEW                       │
│                          │                                   │
│  Route A (Recommended)   │   [Map showing 3 route options]  │
│  🟢 NH-48 via Jaipur     │   Route A: Blue line             │
│  Time: 22h | ₹9,200      │   Route B: Orange line           │
│  Risk: LOW               │   Route C: Red line              │
│                          │                                   │
│  Route B (Alternative)   │   ⚠️ Risk Zones:                 │
│  🟡 NH-52 via Indore     │   🔴 Heavy rain near Vadodara    │
│  Time: 24h | ₹8,100      │   🟡 Traffic jam near Surat      │
│  Risk: MEDIUM            │                                   │
│                          │                                   │
│  Route C (Slow)          │   📊 AI Confidence: 94%          │
│  🔴 NH-44 via Nagpur     │   ⏱️ Last updated: 2 min ago     │
│  Time: 28h | ₹7,800      │                                   │
│  Risk: HIGH              │   [SELECT ROUTE A] [VIEW DETAIL] │
└──────────────────────────┴──────────────────────────────────┘
```
---
## 7. AI/ML Model Design
### 7.1 Delay Prediction Model
- **Architecture:** Graph Neural Network (GNN) + LSTM
- **Input Features:** GPS speed history, weather data, historical delay patterns, warehouse queue, day-of-week, time-of-day, festival calendar
- **Output:** Probability of delay (0-1) + estimated delay minutes
- **Training Data:** 2 years of historical shipment data
- **Target Accuracy:** F1-score > 0.85 (based on EAGLE framework benchmark)
### 7.2 Route Optimization Model
- **Algorithm:** Dijkstra + Reinforcement Learning (Q-learning)
- **Graph Structure:** Warehouses as nodes, highways as edges
- **Edge Weights:** Dynamic — updated with traffic, weather, fuel cost
- **Output:** Top 3 route options with cost-time trade-off
### 7.3 Risk Scoring Model
- **Method:** Weighted ensemble of multiple signals
- **Signals:** Weather risk (25%), Traffic (20%), Historical delay (20%), Vehicle health (15%), Driver fatigue (10%), External events (10%)
- **Output:** Risk score 0-100 → Low/Medium/High/Critical
---
## 8. Security Architecture
```
Internet → WAF → Load Balancer → API Gateway
                                       ↓
                               JWT Verification
                                       ↓
                          RBAC Middleware (role check)
                                       ↓
                               Service Logic
                                       ↓
                        Mongoose (data validation)
                                       ↓
                          MongoDB (encrypted at rest)
```
---
*Design Document Version: 1.0 | Status: Final*
