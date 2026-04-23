# 📋 Requirements Document — LogiSense India
### AI-Powered Logistics & Supply Chain Intelligence Platform

---

## 1. 📌 Project Summary

Build an AI-powered logistics intelligence web platform for the Indian market using **React**, **Node.js**, and **MongoDB**. The system predicts supply chain disruptions, provides real-time shipment tracking, and recommends dynamic rerouting options through a unified dashboard and driver mobile app.

---

## 2. 👥 Stakeholders & User Roles

| Role | Description | Primary Actions |
|---|---|---|
| **Admin** | System owner / logistics company manager | Full access — manage users, view all analytics, configure settings |
| **Dispatcher** | Fleet operations team member | Monitor shipments, act on alerts, trigger rerouting |
| **Driver** | Truck/delivery driver | View assigned route, receive alerts, update status |
| **Viewer** | Client / read-only partner | View shipment status and ETA only |

---

## 3. ✅ Functional Requirements

### 3.1 Authentication & Authorization
- [ ] **FR-AUTH-01**: Users can register with name, email, phone, role, and preferred language
- [ ] **FR-AUTH-02**: Secure login via email/password with JWT-based sessions
- [ ] **FR-AUTH-03**: Token refresh mechanism to maintain sessions
- [ ] **FR-AUTH-04**: Role-based access control — routes and UI features controlled by role
- [ ] **FR-AUTH-05**: Multilingual login screen (English / Hindi)

### 3.2 Real-Time Shipment Tracking
- [ ] **FR-TRACK-01**: Display all active shipments on an interactive map in real-time
- [ ] **FR-TRACK-02**: Each shipment shows current GPS location, speed, ETA (actual & predicted)
- [ ] **FR-TRACK-03**: Shipment timeline event log (departed, stopped, delayed, arrived)
- [ ] **FR-TRACK-04**: Filter shipments by status (in_transit, delayed, rerouted, delivered)
- [ ] **FR-TRACK-05**: Zoom in on a specific shipment for detailed view
- [ ] **FR-TRACK-06**: Support tracking 500+ vehicles simultaneously on the map

### 3.3 AI-Powered Delay Detection & Risk Scoring
- [ ] **FR-AI-01**: System continuously evaluates each shipment's risk using ML model
- [ ] **FR-AI-02**: Risk score (0–100) displayed per shipment with color-coded indicator
- [ ] **FR-AI-03**: Delay prediction model considers: GPS speed drop, weather, traffic, historical patterns, time of day, season
- [ ] **FR-AI-04**: System generates proactive alerts before expected delays occur
- [ ] **FR-AI-05**: Model accuracy target: F1-score ≥ 0.85 on Indian logistics dataset

### 3.4 Dynamic Route Optimization
- [ ] **FR-ROUTE-01**: Dispatcher can request route optimization for any active shipment
- [ ] **FR-ROUTE-02**: System returns up to 3 ranked alternate route options
- [ ] **FR-ROUTE-03**: Each option shows: estimated time, distance, cost, and reason for recommendation
- [ ] **FR-ROUTE-04**: Options include multi-modal alternatives (road → rail, road → hub transfer)
- [ ] **FR-ROUTE-05**: Dispatcher can approve and apply a selected route
- [ ] **FR-ROUTE-06**: Route comparison visualized side-by-side on the map

### 3.5 Alert Management
- [ ] **FR-ALERT-01**: Alerts auto-generated for: weather events, heavy traffic, detected strikes, warehouse overload, driver fatigue threshold
- [ ] **FR-ALERT-02**: Alert severity levels: `Low`, `Medium`, `High`, `Critical`
- [ ] **FR-ALERT-03**: Each alert contains: description (in Hindi/English), affected shipment list, recommended action
- [ ] **FR-ALERT-04**: Dispatcher can dismiss / acknowledge alerts
- [ ] **FR-ALERT-05**: Alert history available for audit
- [ ] **FR-ALERT-06**: Critical alerts trigger push notifications in real-time

### 3.6 Notification System
- [ ] **FR-NOTIF-01**: SMS alerts sent to dispatchers and drivers via Twilio
- [ ] **FR-NOTIF-02**: WhatsApp alerts for critical disruptions to all stakeholders
- [ ] **FR-NOTIF-03**: In-app push notifications via service worker (PWA)
- [ ] **FR-NOTIF-04**: Users can configure notification preferences (SMS / WhatsApp / Push / Email)
- [ ] **FR-NOTIF-05**: Notifications available in Hindi and English

### 3.7 Warehouse Management
- [ ] **FR-WH-01**: Display all warehouses/hubs on map with current load % and status
- [ ] **FR-WH-02**: Real-time update of warehouse capacity (Open / Busy / Closed)
- [ ] **FR-WH-03**: System suggests alternate warehouse when primary is overloaded
- [ ] **FR-WH-04**: Admin can manually update warehouse status

### 3.8 Analytics & Reporting
- [ ] **FR-ANALYTICS-01**: Dashboard summary: total shipments, delays today, on-time %, average delay time
- [ ] **FR-ANALYTICS-02**: Historical delay heatmap by route and time of year
- [ ] **FR-ANALYTICS-03**: Cost savings report from AI-driven rerouting decisions
- [ ] **FR-ANALYTICS-04**: Driver performance report (on-time delivery rate)
- [ ] **FR-ANALYTICS-05**: Export reports as PDF or CSV

### 3.9 Driver Mobile App (PWA)
- [ ] **FR-DRIVER-01**: Driver logs in and sees their assigned shipment
- [ ] **FR-DRIVER-02**: Turn-by-turn navigation with route shown on map
- [ ] **FR-DRIVER-03**: Voice alert in Hindi when a reroute or hazard is detected
- [ ] **FR-DRIVER-04**: Driver can mark status: "Stopped", "Back in transit", "Reached warehouse"
- [ ] **FR-DRIVER-05**: Driver receives real-time route change instructions

### 3.10 External Data Integration
- [ ] **FR-EXT-01**: Integrate with OpenWeatherMap API for weather data every 30 minutes
- [ ] **FR-EXT-02**: Integrate with Google Maps API for real-time traffic data
- [ ] **FR-EXT-03**: Integrate with NewsData.io API for strike and event detection
- [ ] **FR-EXT-04**: Integrate with fuel price API for cost optimization
- [ ] **FR-EXT-05**: Support PM GatiShakti infrastructure data feeds
- [ ] **FR-EXT-06**: ONDC integration for discovering available logistics capacity

---

## 4. ⚙️ Non-Functional Requirements

### 4.1 Performance
| Requirement | Target |
|---|---|
| Dashboard load time | < 2 seconds |
| Real-time GPS update latency | < 5 seconds |
| API response time (95th percentile) | < 300ms |
| ML prediction response time | < 2 seconds |
| Concurrent active users supported | ≥ 200 |
| Concurrent tracked vehicles | ≥ 500 |

### 4.2 Scalability
- [ ] **NFR-SCALE-01**: Stateless backend enables horizontal scaling
- [ ] **NFR-SCALE-02**: Redis caching reduces repeated external API load
- [ ] **NFR-SCALE-03**: MongoDB Atlas auto-scaling enabled
- [ ] **NFR-SCALE-04**: ML microservice deployed with auto-scaling on Cloud Run

### 4.3 Reliability & Availability
- [ ] **NFR-REL-01**: System uptime target: 99.5%
- [ ] **NFR-REL-02**: Graceful degradation if external APIs fail (cached data used)
- [ ] **NFR-REL-03**: Automatic retry with exponential backoff on external API failures
- [ ] **NFR-REL-04**: All critical alerts persist even if notification delivery fails

### 4.4 Security
- [ ] **NFR-SEC-01**: All API endpoints require valid JWT token
- [ ] **NFR-SEC-02**: HTTPS enforced on all routes
- [ ] **NFR-SEC-03**: Rate limiting: max 100 requests/min per user
- [ ] **NFR-SEC-04**: XSS and CSRF protection via Helmet.js
- [ ] **NFR-SEC-05**: Input validation on all request bodies
- [ ] **NFR-SEC-06**: Secrets stored securely — no hardcoded credentials

### 4.5 Localization
- [ ] **NFR-L10N-01**: UI available in English and Hindi (हिंदी)
- [ ] **NFR-L10N-02**: Driver alerts delivered in regional language of driver's preference
- [ ] **NFR-L10N-03**: All dates and times shown in IST

### 4.6 Accessibility & Usability
- [ ] **NFR-A11Y-01**: WCAG 2.1 Level AA compliance for web dashboard
- [ ] **NFR-A11Y-02**: Mobile-first responsive design for driver app
- [ ] **NFR-A11Y-03**: Minimum touch target size: 44x44px for mobile UI

---

## 5. 📊 Data Requirements

### 5.1 Input Data Sources

| Data Type | Source | Frequency |
|---|---|---|
| GPS Location & Speed | Fleetx.io / Vamosys API | Every 30 seconds |
| Weather (Rain, Fog, Temp) | OpenWeatherMap / IMD | Every 30 minutes |
| Traffic & Road Closures | Google Maps Platform | Every 5 minutes |
| Warehouse Load & Queue | Internal system input | Every 10 minutes |
| Fuel Prices | Petrol/Diesel price API | Daily |
| Strike / Event News | NewsData.io | Every 1 hour |
| Rail Schedules | FOIS / Indian Railways | Daily |
| Past Delay Records | MongoDB (historical) | On-demand for ML |

### 5.2 Data Retention Policy
- Real-time GPS data: 90 days
- Alerts: 1 year
- Shipment records: 3 years
- Analytics aggregates: Indefinite

---

## 6. 🔗 System Integration Requirements

| Integration | Type | Criticality |
|---|---|---|
| GPS Device API | REST / WebSocket | Critical |
| Google Maps Platform | REST | Critical |
| OpenWeatherMap API | REST | High |
| Twilio (SMS) | REST | High |
| Meta WhatsApp Cloud API | REST | Medium |
| ML Python Microservice | Internal REST | Critical |
| NewsData.io | REST | Medium |
| PM GatiShakti | REST (gov API) | Low |
| ONDC Network | REST | Low (Phase 2) |

---

## 7. 🚫 Constraints & Assumptions

### Constraints
- **Tech Stack**: React (frontend), Node.js + Express (backend), MongoDB (database) — as specified
- **Target Users**: Indian logistics companies, primarily SME trucking operators
- **Connectivity**: Must work on low-bandwidth mobile networks (3G fallback for driver app)
- **Language**: Primary language support = English + Hindi for MVP

### Assumptions
- GPS devices are already provisioned on vehicles and transmit data via standard APIs
- Drivers have access to smartphones capable of running the PWA
- Historical logistics data (past 1–2 years) will be available for ML model training
- The ML microservice will be hosted separately and consumed via internal API

---

## 8. 📐 Acceptance Criteria

| Feature | Acceptance Criteria |
|---|---|
| Shipment Tracking | Dispatcher sees vehicle on map updated within 5 seconds of GPS ping |
| Delay Alert | Alert generated and rendered on dashboard before delay actually occurs |
| Route Optimization | 3 route options with cost/time comparison returned within 3 seconds |
| Notifications | SMS received within 30 seconds of alert trigger |
| Driver App | Driver receives voice route update within 10 seconds of reroute approval |
| Analytics | Monthly delay heatmap loads and renders in under 3 seconds |
| Language Toggle | Full UI switches to Hindi without page reload |

---

## 9. 📅 MVP Scope (Phase 1)

The following features constitute the Minimum Viable Product for the Google Solution Challenge submission:

✅ User authentication (3 roles: Admin, Dispatcher, Driver)  
✅ Real-time shipment tracking on map  
✅ AI delay prediction with risk scoring  
✅ Alert generation (weather, traffic, strike types)  
✅ Basic route optimization (2 alternate options)  
✅ In-app notifications + SMS alerts  
✅ Dispatcher dashboard in English + Hindi  
✅ Driver PWA with route and alerts  
✅ Analytics dashboard (summary + delay heatmap)  

### Phase 2 (Post-MVP)
- Rail/air multi-modal routing
- ONDC integration
- Digital Twin simulation
- Advanced RL-based autonomous rerouting
- IoT cold chain monitoring

---

*Document Version: 1.0 | Date: April 2026 | Project: Google Solution Challenge*
