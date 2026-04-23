# 🚀 Project Plan — LogiSense India
### AI-Powered Logistics & Supply Chain Intelligence Platform
#### Google Solution Challenge 2026

---

## 🌐 Project Overview

**Project Name**: LogiSense India  
**Tagline**: *"For India, By India's Data — Smarter Logistics, Zero Surprises"*  
**Category**: AI for Social Good + Infrastructure & Logistics  
**UN SDG Alignment**: SDG 9 (Industry, Innovation & Infrastructure) | SDG 11 (Sustainable Cities)  

### The Problem
India's logistics costs represent **13–14% of GDP** (vs. global benchmark of 8–9%), driven by:
- Fragmented ecosystem — 80% of trucking companies have < 10 vehicles
- No unified real-time data layer across fleets and infrastructure
- Reactive problem-solving instead of proactive prediction
- Vulnerability to India-specific disruptions (monsoons, strikes, fuel crises)

### Our Solution
A unified, AI-powered platform that **predicts disruptions before they happen** and **automatically recommends context-aware rerouting** in the Indian logistics context — integrating GPS, weather, traffic, warehouse, and external event data through a modern web dashboard and driver mobile app.

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React.js + Redux Toolkit | Dynamic UI, state management |
| **Map** | Mapbox GL JS | High-performance vehicle clustering |
| **Real-time** | Socket.io | Live GPS & alert updates |
| **Backend** | Node.js + Express.js | Scalable REST APIs |
| **AI/ML** | Python + FastAPI | GNN + XGBoost + RL models |
| **Database** | MongoDB Atlas | Flexible schema for logistics data |
| **Cache** | Redis (Upstash) | GPS data caching, pub/sub |
| **Notifications** | Twilio + WhatsApp API | SMS & WhatsApp alerts |
| **Auth** | JWT + bcrypt | Secure, stateless authentication |
| **Hosting** | Vercel + Google Cloud Run | Scalable serverless deployment |
| **CI/CD** | GitHub Actions | Automated testing & deployment |

---

## 📁 Project Folder Structure

```
logisense-india/
├── client/                        # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json          # PWA manifest
│   │   └── service-worker.js      # Offline support
│   ├── src/
│   │   ├── assets/                # Images, icons, fonts
│   │   ├── components/
│   │   │   ├── common/            # Button, Modal, Badge, Loader
│   │   │   ├── map/               # MapView, VehicleMarker, RouteOverlay
│   │   │   ├── alerts/            # AlertCard, AlertPanel, SeverityBadge
│   │   │   ├── shipments/         # ShipmentCard, ShipmentTimeline
│   │   │   ├── routes/            # RouteComparison, RouteOption
│   │   │   ├── analytics/         # DelayHeatmap, SummaryCards, Charts
│   │   │   ├── driver/            # DriverMap, VoiceAlert, StatusUpdate
│   │   │   └── layout/            # Sidebar, Header, NotificationBell
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ShipmentsPage.jsx
│   │   │   ├── AlertsPage.jsx
│   │   │   ├── RoutesPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── WarehousesPage.jsx
│   │   │   ├── DriverAppPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── store/                 # Redux slices
│   │   │   ├── authSlice.js
│   │   │   ├── shipmentsSlice.js
│   │   │   ├── alertsSlice.js
│   │   │   └── routesSlice.js
│   │   ├── services/              # API service functions
│   │   │   ├── api.js             # Axios instance
│   │   │   ├── shipmentService.js
│   │   │   ├── alertService.js
│   │   │   └── routeService.js
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useSocket.js
│   │   │   ├── useGeoLocation.js
│   │   │   └── useVoiceAlert.js
│   │   ├── i18n/                  # Localization
│   │   │   ├── en.json
│   │   │   └── hi.json
│   │   ├── utils/                 # Helper functions
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│
├── server/                        # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   ├── redis.js           # Redis connection
│   │   │   └── env.js             # Environment config
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Shipment.js
│   │   │   ├── Vehicle.js
│   │   │   ├── Route.js
│   │   │   ├── Alert.js
│   │   │   └── Warehouse.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── shipment.routes.js
│   │   │   ├── vehicle.routes.js
│   │   │   ├── route.routes.js
│   │   │   ├── alert.routes.js
│   │   │   ├── warehouse.routes.js
│   │   │   ├── analytics.routes.js
│   │   │   └── notification.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── shipment.controller.js
│   │   │   ├── route.controller.js
│   │   │   ├── alert.controller.js
│   │   │   └── analytics.controller.js
│   │   ├── services/
│   │   │   ├── DataIngestionService.js
│   │   │   ├── AlertEngineService.js
│   │   │   ├── RouteService.js
│   │   │   ├── NotificationService.js
│   │   │   └── MLService.js       # Calls Python microservice
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js  # JWT verification
│   │   │   ├── rbac.middleware.js  # Role-based access
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── sockets/
│   │   │   └── socketManager.js   # Socket.io event handlers
│   │   ├── jobs/                  # Background cron jobs
│   │   │   ├── gpsPoller.js
│   │   │   ├── weatherPoller.js
│   │   │   └── alertEvaluator.js
│   │   └── app.js                 # Express app entry
│   ├── package.json
│   └── .env.example
│
├── ml/                            # Python AI/ML Microservice
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   ├── models/
│   │   │   ├── delay_predictor.py # GNN + XGBoost ensemble
│   │   │   └── route_optimizer.py # RL-based route engine
│   │   ├── features/
│   │   │   └── pipeline.py        # Feature engineering
│   │   ├── schemas/
│   │   │   └── prediction.py      # Pydantic request/response schemas
│   │   └── utils/
│   │       └── graph_builder.py   # Logistics network graph
│   ├── data/
│   │   ├── raw/                   # Raw historical data
│   │   └── processed/             # Cleaned, feature-engineered data
│   ├── notebooks/
│   │   ├── 01_eda.ipynb
│   │   ├── 02_feature_engineering.ipynb
│   │   └── 03_model_training.ipynb
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml             # Local dev setup
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Run tests on PR
│       └── deploy.yml             # Deploy on merge to main
├── README.md
└── .gitignore
```

---

## 📅 Development Timeline

### Phase 1 — Foundation (Week 1–2)
| Task | Owner | Status |
|---|---|---|
| Project scaffolding (React + Node.js + MongoDB) | Full Stack | 🔲 |
| Authentication system (JWT, RBAC, 3 roles) | Backend | 🔲 |
| MongoDB schema design + seed data | Backend | 🔲 |
| Base UI layout + routing + i18n setup | Frontend | 🔲 |
| Socket.io setup for real-time events | Backend | 🔲 |

### Phase 2 — Core Features (Week 3–5)
| Task | Owner | Status |
|---|---|---|
| Real-time map with vehicle markers (Mapbox) | Frontend | 🔲 |
| GPS data ingestion + Redis caching pipeline | Backend | 🔲 |
| Shipment CRUD + timeline event log | Full Stack | 🔲 |
| Weather + traffic API integrations | Backend | 🔲 |
| Alert engine (threshold rules + auto-generation) | Backend | 🔲 |
| Alert dashboard + severity badges | Frontend | 🔲 |
| SMS + WhatsApp notification integration | Backend | 🔲 |

### Phase 3 — AI/ML Integration (Week 6–7)
| Task | Owner | Status |
|---|---|---|
| Historical data collection + cleaning | ML | 🔲 |
| Feature engineering pipeline | ML | 🔲 |
| Delay prediction model (GNN + XGBoost) | ML | 🔲 |
| Route optimization engine (RL baseline) | ML | 🔲 |
| Python FastAPI microservice deployment | ML | 🔲 |
| Backend ↔ ML integration via MLService | Backend | 🔲 |
| Risk score display on shipment cards | Frontend | 🔲 |
| Route comparison UI with map overlay | Frontend | 🔲 |

### Phase 4 — Analytics & Driver App (Week 8–9)
| Task | Owner | Status |
|---|---|---|
| Analytics dashboard (summary KPIs + charts) | Frontend | 🔲 |
| Delay heatmap by route and month | Frontend | 🔲 |
| Warehouse capacity view and management | Full Stack | 🔲 |
| Driver PWA (route view + status update) | Frontend | 🔲 |
| Voice alert system (Hindi TTS) | Frontend | 🔲 |
| Report export (PDF / CSV) | Backend | 🔲 |

### Phase 5 — Polish & Deployment (Week 10)
| Task | Owner | Status |
|---|---|---|
| Full responsive design review | Frontend | 🔲 |
| WCAG accessibility audit | Frontend | 🔲 |
| Performance testing & optimization | Full Stack | 🔲 |
| Security hardening (rate limiting, Helmet) | Backend | 🔲 |
| CI/CD pipeline setup (GitHub Actions) | DevOps | 🔲 |
| Deploy to Vercel + Cloud Run | DevOps | 🔲 |
| Seed demo data for presentation | Full Stack | 🔲 |
| Create demo video | Everyone | 🔲 |

---

## 🎯 Google Solution Challenge Alignment

| Criterion | How LogiSense Addresses It |
|---|---|
| **Real-World Impact** | Directly reduces India's logistics cost bottleneck affecting millions of SMEs |
| **Technical Complexity** | GNN + RL-based AI, real-time data pipeline, multi-modal optimization |
| **Google Technology** | Google Maps Platform, Google Cloud Run, Firebase (optional push notifications) |
| **Scalability** | Serverless architecture on GCP, MongoDB Atlas auto-scaling |
| **Sustainability** | Optimized routing reduces fuel waste → lower carbon emissions |
| **Inclusivity** | Hindi/regional language support, low-bandwidth mobile PWA for drivers |

---

## 🔑 Key APIs & Services

| Service | Purpose | Free Tier |
|---|---|---|
| Google Maps Platform | Traffic + routing | $200/month credit |
| OpenWeatherMap | Weather forecasting | 1000 calls/day |
| Twilio | SMS notifications | Trial credits |
| NewsData.io | Strike/event detection | 200 requests/day |
| Mapbox | Map rendering | 50,000 loads/month |
| MongoDB Atlas | Database | 512MB free cluster |
| Upstash Redis | Caching + pub/sub | 10,000 commands/day |
| Vercel | Frontend hosting | Unlimited (Hobby) |
| Google Cloud Run | Backend + ML API | Always-free tier |

---

## 📏 Success Metrics

| Metric | Target |
|---|---|
| Delay prediction F1-score | ≥ 0.85 |
| Alert-to-resolution time reduction | 40% vs. manual process |
| Route cost optimization | 10–15% cost reduction demonstrated |
| Dashboard load time | < 2 seconds |
| Real-time GPS update latency | < 5 seconds |
| Demo system uptime | 99%+ during evaluation period |

---

## 🚧 Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| External API rate limits during demo | High | Cache responses, use mock fallback data |
| ML model accuracy insufficient on limited data | High | Start with XGBoost (requires less data), add GNN once data grows |
| GPS device access (no real fleet) | High | Simulate GPS data using mock streams + historical trajectories |
| Google Maps API cost overrun | Medium | Implement strict caching + use Mapbox for map rendering |
| Low-bandwidth driver app failure | Medium | PWA with offline-first design + local data sync |

---

## 📌 Demo Walkthrough Plan

1. **Login** as Dispatcher → See live map with 10+ simulated vehicles
2. **Alert fires** — weather event detected on Mumbai–Pune route
3. **AI risk score** updates to "Critical" for affected shipments
4. **Click "Optimize Route"** → See 3 alternate options (road, rail, hub transfer)
5. **Approve reroute** → Route updates on map + driver receives voice alert
6. **Analytics page** → Show delay heatmap and cost savings report
7. **Switch to Hindi** → Full UI language change
8. **Driver App view** → Voice navigation update in Hindi

---

## 👨‍💻 Team

| Name | Role |
|---|---|
| Mujahidul Islam | Full Stack Lead / ML Integration |
| *(Team member 2)* | Frontend / UI/UX |
| *(Team member 3)* | Backend / DevOps |
| *(Team member 4)* | ML / Data Engineering |

---

*Document Version: 1.0 | Date: April 2026 | Project: Google Solution Challenge 2026*
