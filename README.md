# Yolora - Accessibility & Volunteer Platform

Yolora is a modern mobile application designed to connect people with disabilities with nearby volunteers. It features a map-centric interface to help users navigate and request assistance in real-time.

## Project Structure

This repository is a monorepo containing:
- `/yolora-app`: The React Native mobile application.
- `/yolora-backend`: The NestJS API service.

## Mobile App Features

- **Modern Map Interface**: Integrated Mapbox for high-performance mapping.
- **Accessibility Markers**: Visual indicators for wheelchair-accessible points and parking.
- **Volunteer Tracking**: See nearby volunteers on the map.
- **Interactive UI**: Custom light-themed navigation with a floating voice assistant button.
- **Real-time Navigation**: Simulated routes for accessibility guidance.

## Setup Instructions

### Mobile App (`/yolora-app`)

1. **Install Dependencies**:
   ```bash
   cd yolora-app
   npm install
   ```

2. **API Configuration**:
   The app requires Google Maps and Mapbox API keys.
   - **Mapbox Public Token**: Add to `src/screens/disabled/DisabledHomeScreen.tsx` and `src/screens/shared/MapScreen.tsx`.
   - **Mapbox Secret Token**: Add to `android/gradle.properties` as `MAPBOX_DOWNLOADS_TOKEN`.
   - **Google Maps API Key**: Add to `android/app/src/main/AndroidManifest.xml`.

3. **Run Android**:
   ```bash
   npm run android
   ```

### Backend (`/yolora-backend`)

1. **Install Dependencies**:
   ```bash
   cd yolora-backend
   npm install
   ```

2. **Database**:
   Ensure you have a PostgreSQL instance running.

3. **Run Server**:
   ```bash
   npm run start:dev
   ```

## Tech Stack

- **Frontend**: React Native, Mapbox, React Navigation, Vector Icons.
- **Backend**: NestJS, TypeORM, PostgreSQL.
- **Design**: Premium light-themed UI with glassmorphism touches.

---

*Note: Sensitive API keys have been removed from the repository. Please provide your own keys to run the project.*
