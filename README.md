# Miftah Real Estate - Expo & Firebase MVP

A Real estate application built with **React Native (Expo)** and **Firebase Firestore**. This project implements a full lifecycle for property listings, from geospatial data entry to advanced map visualization.

## Features

- **Create Property**: Dynamic form with 5 mandatory fields (Type, Price/Currency, Bedrooms, Bathrooms, and Interactive Map Location Picker).
- **Geospatial Map View**: Powered by `react-native-maps` (Google Maps API) featuring custom markers that combine icons and price tags.
- **Optimized Feed**: Explore screen with **Pagination (Load-on-scroll)** and Skeleton loading states for smooth performance.
- **Real-time Sync**: Custom `useProperties` hook for instant data synchronization between Home and Map screens.
- **Adaptive UI**: Full support for **Dark Mode** and Light Mode across all inputs, dropdowns, and components.

## Technical Implementation

### 1. No-Clipping Custom Markers
Non-clipped markers on both iOS and Android, implemented a custom SVG rendering logic. Instead of standard image assets, markers are rendered as high-fidelity SVG components within the `Marker` children, ensuring clarity and perfect alignment of price tags and icons.

### 2. Scalable Data Fetching
- **Map/Home**: Real-time listeners via `onSnapshot` for immediate updates.
- **Explore**: Efficient Pagination using Firestore `startAfter` and `limit` to prevent excessive data usage and maintain 60FPS scrolling.
 

