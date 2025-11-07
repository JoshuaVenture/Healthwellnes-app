# Health & Wellness App

A modern, responsive web application for tracking your health and wellness goals. Built with React, TypeScript, and Vite.

## Features

- **Dashboard**: Overview of your daily health metrics
- **Activity Tracker**: Log workouts and track steps
- **Goal Tracker**: Set and monitor health goals with progress tracking
- **Water Intake**: Track daily water consumption

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with modern CSS features

## Project Structure

```
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.tsx
│   │   ├── ActivityTracker.tsx
│   │   ├── GoalTracker.tsx
│   │   └── WaterIntake.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css      # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features in Detail

### Dashboard
- View daily statistics at a glance
- Track steps, calories, water intake, and active minutes
- Wellness tips and recommendations

### Activity Tracker
- Log various activities (walking, running, cycling, yoga, etc.)
- Track steps with quick increment buttons
- Calculate calories burned
- View activity history

### Goal Tracker
- Create custom health goals
- Track progress with visual progress bars
- Mark goals as completed
- Set targets and monitor achievements

### Water Intake
- Track daily water consumption
- Visual progress indicator
- Quick add buttons for convenience
- Hydration tips and reminders

## Data Persistence

The app uses localStorage to persist your health data between sessions. Your stats, goals, and activities are saved locally in your browser.

## License

This project is part of the Health and Wellness App Project – Agile Sprint Tracking.
