import { useState, useEffect } from 'react'
import { Activity, Heart, Droplet, Moon, Target } from 'lucide-react'
import { HealthData } from './types'
import Dashboard from './components/Dashboard'
import ActivityTracker from './components/ActivityTracker'
import WaterTracker from './components/WaterTracker'
import MoodTracker from './components/MoodTracker'
import SleepTracker from './components/SleepTracker'
import GoalsSettings from './components/GoalsSettings'
import './App.css'

const STORAGE_KEY = 'health-wellness-data'

const initialData: HealthData = {
  activities: [],
  waterIntakes: [],
  moodEntries: [],
  sleepEntries: [],
  dailyGoals: {
    steps: 10000,
    water: 2000,
    exercise: 30,
    sleep: 8,
  },
}

type Tab = 'dashboard' | 'activity' | 'water' | 'mood' | 'sleep' | 'goals'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [data, setData] = useState<HealthData>(initialData)

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setData(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateData = (updates: Partial<HealthData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <Heart className="logo" />
            Health & Wellness
          </h1>
          <p className="tagline">Track your journey to better health</p>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={20} />
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <Activity size={20} />
          <span>Activity</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'water' ? 'active' : ''}`}
          onClick={() => setActiveTab('water')}
        >
          <Droplet size={20} />
          <span>Water</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          <Heart size={20} />
          <span>Mood</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'sleep' ? 'active' : ''}`}
          onClick={() => setActiveTab('sleep')}
        >
          <Moon size={20} />
          <span>Sleep</span>
        </button>
        <button
          className={`nav-button ${activeTab === 'goals' ? 'active' : ''}`}
          onClick={() => setActiveTab('goals')}
        >
          <Target size={20} />
          <span>Goals</span>
        </button>
      </nav>

      <main className="app-main">
        <div className="content-wrapper">
          {activeTab === 'dashboard' && <Dashboard data={data} />}
          {activeTab === 'activity' && (
            <ActivityTracker
              activities={data.activities}
              onUpdate={(activities) => updateData({ activities })}
            />
          )}
          {activeTab === 'water' && (
            <WaterTracker
              waterIntakes={data.waterIntakes}
              dailyGoal={data.dailyGoals.water}
              onUpdate={(waterIntakes) => updateData({ waterIntakes })}
            />
          )}
          {activeTab === 'mood' && (
            <MoodTracker
              moodEntries={data.moodEntries}
              onUpdate={(moodEntries) => updateData({ moodEntries })}
            />
          )}
          {activeTab === 'sleep' && (
            <SleepTracker
              sleepEntries={data.sleepEntries}
              dailyGoal={data.dailyGoals.sleep}
              onUpdate={(sleepEntries) => updateData({ sleepEntries })}
            />
          )}
          {activeTab === 'goals' && (
            <GoalsSettings
              goals={data.dailyGoals}
              onUpdate={(dailyGoals) => updateData({ dailyGoals })}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
