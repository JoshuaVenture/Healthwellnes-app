# Health & Wellness App

A modern, comprehensive health and wellness tracking application built with React, TypeScript, and Vite. Track your daily activities, water intake, mood, sleep, and set personalized health goals.

![Health & Wellness](https://img.shields.io/badge/Health-Wellness-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF)

## 🌟 Features

### 📊 Dashboard
- Real-time overview of all health metrics
- Daily progress tracking
- 7-day activity trend visualization
- Quick insights into your wellness journey

### 🏃 Activity Tracker
- Log various types of exercises (Running, Cycling, Yoga, etc.)
- Track duration and calories burned
- View recent activity history
- Daily exercise summary

### 💧 Water Intake Tracker
- Visual water glass progress indicator
- Quick-add buttons (250ml, 500ml, 750ml, 1000ml)
- Custom amount logging
- Daily hydration goal tracking

### ❤️ Mood Tracker
- Log daily mood with 5 emotion levels
- Add personal notes about your feelings
- Track emotional wellbeing over time
- Visual mood history

### 😴 Sleep Tracker
- Record hours of sleep
- Rate sleep quality (Excellent, Good, Fair, Poor)
- View 7-day average sleep
- Compare against daily sleep goals

### 🎯 Goals Settings
- Set personalized daily goals for:
  - Steps (default: 10,000 steps)
  - Water intake (default: 2,000 ml)
  - Exercise (default: 30 minutes)
  - Sleep (default: 8 hours)
- Helpful recommendations for each goal

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
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

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technology Stack

- **React 18.2** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **date-fns** - Modern date utility library
- **CSS3** - Custom styling with gradients and animations

## 📱 Features in Detail

### Data Persistence
All your health data is automatically saved to browser localStorage, ensuring your progress is never lost. Data persists across sessions.

### Responsive Design
The app is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

### User-Friendly Interface
- Intuitive navigation with icon-based tabs
- Beautiful gradient color schemes
- Smooth animations and transitions
- Clear visual feedback for all actions

## 🎨 Design Highlights

- **Modern Gradient UI** - Beautiful purple-blue gradient theme
- **Card-Based Layout** - Clean, organized information display
- **Interactive Components** - Hover effects and smooth transitions
- **Visual Progress Indicators** - Progress bars and animated water glass
- **Emoji Support** - Friendly mood tracking with emojis

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard with metrics overview
│   ├── Dashboard.css          # Dashboard-specific styles
│   ├── ActivityTracker.tsx    # Activity logging component
│   ├── WaterTracker.tsx       # Water intake tracking
│   ├── MoodTracker.tsx        # Mood logging component
│   ├── SleepTracker.tsx       # Sleep tracking component
│   ├── GoalsSettings.tsx      # Goals configuration
│   └── Tracker.css            # Shared tracker styles
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main app component
├── App.css                    # App-level styles
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 💡 Usage Tips

1. **Start with Goals** - Visit the Goals tab to set your personalized daily targets
2. **Daily Check-in** - Use the Dashboard to see your progress at a glance
3. **Log Regularly** - Track activities, water, mood, and sleep consistently
4. **Review Trends** - Check the 7-day activity chart to see your patterns
5. **Stay Motivated** - Watch your progress bars fill up throughout the day!

## 🌈 Future Enhancements

Potential features for future development:
- Data export functionality (CSV/JSON)
- Charts and advanced analytics
- Reminder notifications
- Social sharing capabilities
- Integration with fitness devices
- Nutrition tracking
- Custom activity types
- Weekly/monthly reports

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests.

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for better health and wellness**
