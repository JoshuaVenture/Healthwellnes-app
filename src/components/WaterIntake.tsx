import { useState, useEffect } from 'react'
import { Droplet, Plus, Minus } from 'lucide-react'
import './WaterIntake.css'

export default function WaterIntake() {
  const [glasses, setGlasses] = useState(0)
  const target = 8

  useEffect(() => {
    // Load from localStorage
    const savedStats = JSON.parse(localStorage.getItem('healthStats') || '{}')
    setGlasses(savedStats.water || 0)
  }, [])

  const updateWater = (delta: number) => {
    const newValue = Math.max(0, glasses + delta)
    setGlasses(newValue)
    
    // Save to localStorage
    const savedStats = JSON.parse(localStorage.getItem('healthStats') || '{}')
    savedStats.water = newValue
    localStorage.setItem('healthStats', JSON.stringify(savedStats))
  }

  const progress = Math.min(100, (glasses / target) * 100)

  return (
    <div className="water-intake">
      <h2>Water Intake Tracker</h2>
      
      <div className="water-display">
        <div className="water-icon-container">
          <Droplet size={64} className="water-icon" />
        </div>
        <div className="water-stats">
          <div className="water-current">{glasses}</div>
          <div className="water-target">/ {target} glasses</div>
        </div>
      </div>

      <div className="water-progress">
        <div className="progress-label">
          <span>Daily Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="water-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="water-controls">
        <button
          onClick={() => updateWater(-1)}
          className="water-btn minus"
          disabled={glasses === 0}
        >
          <Minus size={24} />
        </button>
        <div className="water-quick-add">
          <button onClick={() => updateWater(1)} className="quick-add-btn">
            +1 Glass
          </button>
          <button onClick={() => updateWater(2)} className="quick-add-btn">
            +2 Glasses
          </button>
        </div>
        <button
          onClick={() => updateWater(1)}
          className="water-btn plus"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="water-tips">
        <h3>💧 Hydration Tips</h3>
        <ul>
          <li>Drink a glass of water when you wake up</li>
          <li>Keep a water bottle with you throughout the day</li>
          <li>Drink water before meals</li>
          <li>Listen to your body's thirst signals</li>
        </ul>
      </div>
    </div>
  )
}
