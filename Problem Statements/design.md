# 🚚 Design Document — LogiSense India
### AI-Powered Logistics & Supply Chain Intelligence Platform

---

## 1. 🎯 Overview

**LogiSense India** is a context-aware, AI-driven logistics intelligence platform built specifically for the Indian market. It predicts supply chain disruptions, dynamically optimizes routes, and automatically recommends multi-modal rerouting strategies — all within the unique constraints of the Indian logistics ecosystem.

The platform combines real-time GPS, weather, traffic, warehouse, driver, fuel, and external event data into a unified intelligence layer, giving dispatchers and logistics managers proactive control over their supply chain.

---

## 2. 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────────┐   ┌──────────────────┐  ┌──────────────┐ │
│  │  Web Dashboard   │   │  Driver Mobile   │  │ SMS/WhatsApp │ │
│  │  (React.js)      │   │  App (React PWA) │  │  Alerts      │ │
│  └────────┬─────────┘   └────────┬─────────┘  └──────┬───────┘ │
└───────────┼──────────────────────┼────────────────────┼─────────┘
            │                      │                    │
┌───────────▼──────────────────────▼────────────────────▼─────────┐
│                        API GATEWAY (Express.js / Node.js)        │
│  REST API  │  WebSocket (Socket.io)  │  Auth (JWT)              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND SERVICES LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ Data Ingestion│  │ AI/ML Engine │  │ Notification Service  │  │
│  │ Service       │  │ (Python)     │  │ (SMS, WhatsApp, Push) │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ Route Engine │  │ Alert Engine │  │ Analytics Service      │  │
│  │ Service      │  │ Service      │  │                        │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  ┌─────────┐ │
│  │  MongoDB     │  │  Redis      │  │ Time-Series│  │ File    │ │
│  │  (Primary)   │  │  (Cache)    │  │ DB (Influx)│  │ Storage │ │
│  └─────────────┘  └─────────────┘  └────────────┘  └─────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                  EXTERNAL DATA SOURCES                           │
│  GPS APIs │ OpenWeatherMap │ Google Maps │ PM GatiShakti         │
│  ONDC API │ Fuel Price APIs │ News/Strike APIs │ IoT Sensors     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 🧩 Component Breakdown

### 3.1 Frontend (React.js)

| Component | Description |
|---|---|
| `Dashboard` | Main dispatcher view — map, active shipments, alert panel |
| `ShipmentTracker` | Real-time tracking of individual shipments with ETA |
| `AlertCenter` | Active risk alerts with severity levels and recommendations |
| `RouteOptimizer` | Visual route comparison tool (current vs. alternate) |
| `AnalyticsPanel` | Historical trends, delay patterns, cost analysis |
| `DriverApp` | PWA for drivers — voice alerts, navigation, status updates |
| `SettingsPanel` | Language toggle (Hindi/English), notification preferences |

**State Management**: Redux Toolkit  
**Map Rendering**: Mapbox GL JS / Google Maps React  
**Real-time Updates**: Socket.io client  
**Charts**: Recharts / Chart.js  

---

### 3.2 Backend (Node.js + Express.js)

#### API Structure

```
/api/v1/
  ├── auth/           → JWT-based login, signup, refresh
  ├── shipments/      → CRUD for shipments
  ├── vehicles/       → Fleet management, GPS data ingestion
  ├── routes/         → Route optimization requests & history
  ├── alerts/         → Create, fetch, dismiss alerts
  ├── warehouses/     → Warehouse capacity & queue data
  ├── analytics/      → Historical reports, pattern queries
  └── notifications/  → Manage notification preferences
```

#### Key Services

- **DataIngestionService**: Polls and aggregates GPS, weather, traffic, fuel APIs
- **AlertEngine**: Evaluates risk thresholds, triggers alerts in real-time
- **RouteService**: Interfaces with ML engine to compute optimal routes
- **NotificationService**: Dispatches SMS (Twilio), WhatsApp (Meta API), Push notifications
- **WebSocketManager**: Broadcasts live updates to connected clients via Socket.io

---

### 3.3 AI / ML Engine (Python — FastAPI Microservice)

```
┌──────────────────────────────────────────────────┐
│              Python ML Microservice               │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │   Feature Engineering Pipeline          │    │
│  │   (GPS + Weather + Traffic → Features)  │    │
│  └────────────────┬────────────────────────┘    │
│                   │                              │
│  ┌────────────────▼────────────────────────┐    │
│  │   Delay Prediction Model               │    │
│  │   (GNN + XGBoost Ensemble)             │    │
│  └────────────────┬────────────────────────┘    │
│                   │                              │
│  ┌────────────────▼────────────────────────┐    │
│  │   Route Optimization Engine            │    │
│  │   (Reinforcement Learning + Dijkstra)  │    │
│  └────────────────┬────────────────────────┘    │
│                   │                              │
│  ┌────────────────▼────────────────────────┐    │
│  │   Risk Score API                       │    │
│  │   (POST /predict, GET /recommend)      │    │
│  └─────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

**Models Used:**
- **GNN (Graph Neural Network)**: Models the logistics network as a graph (warehouses = nodes, routes = edges) for spatiotemporal delay prediction
- **XGBoost**: Tabular risk scoring using historical delay patterns
- **Reinforcement Learning (PPO)**: Learns and improves route recommendations over time based on real-world outcomes

---

### 3.4 Database Design (MongoDB)

#### Collections

```javascript
// Shipments Collection
{
  _id: ObjectId,
  shipmentId: String,            // e.g., "SHP-2024-007"
  origin: { lat, lng, name },
  destination: { lat, lng, name },
  currentLocation: { lat, lng },
  status: Enum["in_transit", "delayed", "delivered", "rerouted"],
  vehicleId: ObjectId,
  driverId: ObjectId,
  cargo: { type, weight, isColchain: Boolean, temperature },
  eta: Date,
  predictedEta: Date,            // ML-computed ETA
  riskScore: Number,             // 0-100
  alerts: [ObjectId],
  timeline: [{ event, timestamp, location }],
  createdAt, updatedAt
}

// Routes Collection
{
  _id: ObjectId,
  shipmentId: ObjectId,
  segments: [{ from, to, mode: Enum["road","rail","air"], distance, duration }],
  totalDistance, totalDuration, totalCost,
  isActive: Boolean,
  alternates: [{ segments, reason, savingsEstimate }],
  createdAt
}

// Alerts Collection
{
  _id: ObjectId,
  shipmentId: ObjectId,
  type: Enum["weather","traffic","strike","flood","fuel","warehouse"],
  severity: Enum["low","medium","high","critical"],
  message: String,
  recommendation: String,
  affectedRoutes: [String],
  isResolved: Boolean,
  createdAt
}

// Vehicles Collection
{
  _id: ObjectId,
  vehicleNumber: String,
  gpsDeviceId: String,
  liveLocation: { lat, lng, speed, heading },
  carrier: String,
  capacity: Number,
  currentShipmentId: ObjectId,
  lastUpdated: Date
}

// Users Collection
{
  _id: ObjectId,
  name, email, phone,
  role: Enum["admin","dispatcher","driver","viewer"],
  language: Enum["en","hi","bn","ta"],
  notificationPrefs: { sms, whatsapp, push, email },
  createdAt
}

// Warehouses Collection
{
  _id: ObjectId,
  name, location: { lat, lng, city },
  currentLoad: Number,          // % capacity
  queueLength: Number,
  processingTimeAvg: Number,    // minutes
  operationalStatus: Enum["open","busy","closed"],
  updatedAt
}
```

---

## 4. 🔄 Data Flow Diagrams

### 4.1 Real-Time Alert Flow

```
GPS Device → DataIngestion → Kafka/Queue → AlertEngine
                                            │
                               ┌────────────▼──────────────┐
                               │  Is risk threshold met?   │
                               └────────────┬──────────────┘
                                           YES
                               ┌────────────▼──────────────┐
                               │  Call ML Microservice      │
                               │  → Get risk score &        │
                               │    recommendation          │
                               └────────────┬──────────────┘
                                            │
                               ┌────────────▼──────────────┐
                               │  Save Alert to MongoDB     │
                               │  Notify via Socket.io      │
                               │  Send SMS/WhatsApp         │
                               └───────────────────────────┘
```

### 4.2 Route Optimization Flow

```
Dispatcher Request → RouteService → ML Engine (POST /recommend)
                                         │
                              ┌──────────▼──────────────┐
                              │  Generate N best routes  │
                              │  considering:            │
                              │  - Current traffic       │
                              │  - Weather forecast      │
                              │  - Active strikes        │
                              │  - Rail/air availability │
                              └──────────┬──────────────┘
                                         │
                              ┌──────────▼──────────────┐
                              │  Return ranked options:  │
                              │  1. Alternate road route │
                              │  2. Rail segment switch  │
                              │  3. Hub transfer reroute │
                              └─────────────────────────┘
```

---

## 5. 🌐 External Integrations

| Integration | Purpose | API/Source |
|---|---|---|
| **GPS Tracking** | Real-time vehicle location | Fleetx.io / Vamosys APIs |
| **Weather** | Rain, storm, fog, temperature | OpenWeatherMap / IMD APIs |
| **Traffic** | Congestion, road closures | Google Maps Platform |
| **Government Infrastructure** | Road network, projects | PM GatiShakti Portal |
| **Fuel Prices** | Daily fuel cost optimization | Petrol/Diesel price APIs |
| **Strike / News** | Local disruption alerts | News APIs (NewsData.io) |
| **Rail Availability** | Rail freight scheduling | Indian Railways / FOIS API |
| **Messaging** | SMS & WhatsApp alerts | Twilio / Meta WhatsApp API |
| **ONDC** | Unified logistics capacity finding | ONDC Network APIs |

---

## 6. 🔒 Security Design

- **Authentication**: JWT-based with refresh token rotation
- **Authorization**: Role-Based Access Control (RBAC) — Admin, Dispatcher, Driver, Viewer
- **API Security**: Helmet.js, Rate Limiting (express-rate-limit), CORS policy
- **Data Encryption**: TLS in transit, AES-256 at rest for sensitive shipment data
- **Input Validation**: Joi / Zod schema validation on all API endpoints
- **Environment Secrets**: Managed via `.env` + dotenv, never committed to VCS

---

## 7. ⚡ Performance Design

| Concern | Strategy |
|---|---|
| Real-time GPS updates | Redis pub/sub + Socket.io |
| Heavy ML computation | Async job queue (Bull.js) → Python microservice |
| Repeated API calls | Redis caching with TTL (weather: 30min, fuel: 1hr) |
| Database reads | MongoDB indexing on `shipmentId`, `status`, `location` |
| Frontend bundle | Code splitting, lazy loading |
| Map rendering | Clustering for 1000+ vehicles on map |

---

## 8. 🌍 Localization Design

- **Languages Supported**: English, Hindi (हिंदी), Bengali, Tamil
- **i18n Library**: `react-i18next`
- **Voice Alerts**: Browser TTS / Native TTS for driver app in Hindi
- **Date/Time**: IST (Asia/Kolkata) as default timezone
- **Number Format**: Indian number system (lakh, crore notation)

---

## 9. 📱 Responsive & Accessibility Design

- Mobile-first layout for the Driver PWA
- WCAG 2.1 AA compliance for dashboard
- Touch-optimized controls for dispatch on tablets
- High contrast mode for field use in direct sunlight

---

## 10. 🚀 Deployment Architecture

```
┌─────────────────────────────────────┐
│         CI/CD Pipeline              │
│  GitHub → GitHub Actions → Deploy  │
└───────────────┬─────────────────────┘
                │
    ┌───────────▼───────────┐
    │   Cloud Platform      │
    │   (GCP / AWS)         │
    ├───────────────────────┤
    │  Frontend → Vercel    │
    │  Backend  → Cloud Run │
    │  ML API   → Cloud Run │
    │  MongoDB  → Atlas     │
    │  Redis    → Upstash   │
    └───────────────────────┘
```

---

*Document Version: 1.0 | Date: April 2026 | Project: Google Solution Challenge*
