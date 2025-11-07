# Health & Wellness App

A modern web application for tracking your health and wellness journey. Built with React, TypeScript, and Vite.

## Features

- **Dashboard**: Overview of your daily health metrics, workouts, and nutrition
- **Workout Tracker**: Log and track your exercise sessions
- **Nutrition Logger**: Record meals and monitor daily calorie intake
- **Health Metrics**: Track weight and daily steps

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS variables

## Data Storage

The app uses browser localStorage to persist your data. All workouts, meals, and health metrics are stored locally in your browser.

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── Dashboard.tsx
  │   ├── WorkoutTracker.tsx
  │   ├── NutritionLogger.tsx
  │   └── HealthMetrics.tsx
  ├── App.tsx           # Main app component with routing
  ├── main.tsx          # Entry point
  └── index.css         # Global styles
```

## License

MIT
