import { useState, useEffect } from 'react'
import { Activity, Target, Droplet, TrendingUp } from 'lucide-react'
import './Dashboard.css'

interface Stats {
  steps: number
  calories: number
  water: number
  activeMinutes: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    steps: 0,
    calories: 0,
    water: 0,
    activeMinutes: 0
  })

  useEffect(() => {
    // Load stats from localStorage or initialize
    const savedStats = localStorage.getItem('healthStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const statCards = [
    {
      icon: <Activity size={24} />,
      label: 'Steps Today',
      value: stats.steps.toLocaleString(),
      color: '#3b82f6'
    },
    {
      icon: <Target size={24} />,
      label: 'Calories',
      value: stats.calories,
      color: '#ef4444'
    },
    {
      icon: <Droplet size={24} />,
      label: 'Water (glasses)',
      value: stats.water,
      color: '#06b6d4'
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Active Minutes',
      value: stats.activeMinutes,
      color: '#10b981'
    }
  ]

  return (
    <div className="dashboard">
      <h2>Today's Overview</h2>
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: card.color }}>
            <div className="stat-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-tips">
        <h3>💡 Wellness Tips</h3>
        <ul>
          <li>Drink at least 8 glasses of water daily</li>
          <li>Aim for 10,000 steps per day</li>
          <li>Get 30 minutes of moderate exercise</li>
          <li>Take breaks every hour if you're sitting</li>
        </ul>
      </div>
    </div>
  )
}
