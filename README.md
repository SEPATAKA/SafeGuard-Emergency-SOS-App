# SafeGuard - Emergency SOS & Location Sharing System

[![Laravel](https://img.shields.io/badge/Backend-Laravel-orange)](#)
[![React Native](https://img.shields.io/badge/Mobile-React%20Native-blue)](#)
[![License](https://img.shields.io/badge/License-MIT-green)](#)

<img width="1239" height="867" alt="Screenshot 2026-06-26 143241" src="https://github.com/user-attachments/assets/e99460df-faf6-4dff-83c5-a0be2e1c5bc7" />
<img width="1260" height="877" alt="Screenshot 2026-06-26 143313" src="https://github.com/user-attachments/assets/3c5e72c4-7a01-4b73-a370-8f0fa7085ef6" />



**SafeGuard** is a comprehensive, life-saving emergency response and real-time location-sharing platform designed to bridge the gap between individuals in critical situations and their emergency contacts or system administrators. 

The system architecture consists of a cross-platform **React Native mobile application** for end-users to dispatch instant alerts, and a web-based **Laravel Admin Dashboard** for real-time incident monitoring, response tracking, and analytics.

---

## 📱 Core Features

### Mobile Application (React Native)
* **One-Tap SOS Alert:** Trigger an immediate emergency status by holding the SOS button for 3 seconds.
* **Real-Time GPS Tracking:** Captures and shares precise live coordinates (`Latitude & Longitude`) along with regional address details.
* **Instant Email Notifications:** Dispatches automated email alerts via PHP Mail/SMTP directly to pre-configured emergency contacts upon trigger.

### Admin Dashboard (Laravel)
* **Live Incident Monitoring:** Real-time top banner alerts immediately show active incidents (e.g., *Active Alert: Amali Fernando has triggered SOS from Kandy*).
* **System Metrics & Analytics:** Interactive graphs tracking weekly/monthly incident volume, resolutions, and mail dispatch rates.
* **Alert Breakdown Panel:** Visual representation of alert statuses categorized into *Resolved*, *False Alarm*, and *Active*.
* **User & Contact Management:** Centralized management system to handle registered users and emergency contacts.

---

## 🛠️ Tech Stack

* **Backend API & Admin Panel:** Laravel (PHP)
* **Mobile Application:** React Native (JavaScript / TypeScript)
* **Database:** MySQL
* **Mailing System:** PHP Mail / SMTP Integration (Gmail)
* **Location Services:** Real-time GPS & Geolocation APIs

---

## 📊 System Performance Metrics (Demo Data)
* **Average Response Time:** 4m 32s
* **Alerts Resolved Rate:** 99.2%
* **System Uptime:** 99.97%

---

## ⚙️ Installation & Setup

### Prerequisites
* PHP >= 8.1 & Composer
* Node.js & npm/yarn
* Android Studio / Xcode
* MySQL Server

### 1. Backend & Admin Panel Setup
``bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/safeguard-emergency-sos.git](https://github.com/YOUR_USERNAME/safeguard-emergency-sos.git)
cd safeguard-emergency-sos/backend

# Install composer dependencies
composer install

# Configure environment files
cp .env.example .env
# Open .env and configure your Database and Mail (SMTP/PHP Mail) settings

# Generate app key and run migrations
php artisan key:generate
php artisan migrate --seed

# Start Laravel server
php artisan serve

2. Mobile App Setup
cd ../mobile

# Install npm packages
npm install

# Run on Android
npm run android

# Run on iOS
npm run ios

👨‍💻 Developer
Developed by Charith Wannisingha
