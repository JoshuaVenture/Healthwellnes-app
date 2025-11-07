import { useState } from 'react'
import Dashboard from './components/Dashboard'
import ActivityTracker from './components/ActivityTracker'
import GoalTracker from './components/GoalTracker'
import WaterIntake from './components/WaterIntake'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activity' | 'goals' | 'water'>('dashboard')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 Health & Wellness</h1>
        <p>Track your journey to better health</p>
      </header>
      
      <nav className="app-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'activity' ? 'active' : ''}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          Goals
        </button>
        <button 
          className={activeTab === 'water' ? 'active' : ''}
          onClick={() => setActiveTab('water')}
        >
          Water
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'activity' && <ActivityTracker />}
        {activeTab === 'goals' && <GoalTracker />}
        {activeTab === 'water' && <WaterIntake />}
      </main>
    </div>
  )
}

export default App
