import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, Droplet } from 'lucide-react'
import { WaterIntake } from '../types'
import './Tracker.css'

interface WaterTrackerProps {
  waterIntakes: WaterIntake[]
  dailyGoal: number
  onUpdate: (waterIntakes: WaterIntake[]) => void
}

const quickAmounts = [250, 500, 750, 1000]

function WaterTracker({ waterIntakes, dailyGoal, onUpdate }: WaterTrackerProps) {
  const [customAmount, setCustomAmount] = useState('')

  const addWater = (amount: number) => {
    const newIntake: WaterIntake = {
      id: Date.now().toString(),
      amount,
      date: format(new Date(), 'yyyy-MM-dd'),
    }
    onUpdate([newIntake, ...waterIntakes])
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customAmount) {
      addWater(Number(customAmount))
      setCustomAmount('')
    }
  }

  const handleDelete = (id: string) => {
    onUpdate(waterIntakes.filter(w => w.id !== id))
  }

  const todayIntakes = waterIntakes.filter(
    w => w.date === format(new Date(), 'yyyy-MM-dd')
  )

  const totalToday = todayIntakes.reduce((sum, w) => sum + w.amount, 0)
  const progress = Math.min((totalToday / dailyGoal) * 100, 100)

  return (
    <div className="tracker">
      <div className="tracker-header">
        <div>
          <h2>Water Tracker</h2>
          <p className="subtitle">Stay hydrated throughout the day</p>
        </div>
      </div>

      <div className="water-progress-section">
        <div className="water-glass">
          <div className="water-level" style={{ height: `${progress}%` }}>
            <div className="water-wave"></div>
          </div>
          <div className="water-text">
            <div className="water-amount">{totalToday} ml</div>
            <div className="water-goal">of {dailyGoal} ml</div>
          </div>
        </div>
        <div className="progress-details">
          <div className="progress-stat">
            <div className="stat-value-large">{Math.round(progress)}%</div>
            <div className="stat-label">Daily Goal</div>
          </div>
          <div className="progress-stat">
            <div className="stat-value-large">{todayIntakes.length}</div>
            <div className="stat-label">Times Logged</div>
          </div>
          <div className="progress-stat">
            <div className="stat-value-large">{dailyGoal - totalToday > 0 ? dailyGoal - totalToday : 0} ml</div>
            <div className="stat-label">Remaining</div>
          </div>
        </div>
      </div>

      <div className="quick-add-section">
        <h3>Quick Add</h3>
        <div className="quick-buttons">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              className="quick-button"
              onClick={() => addWater(amount)}
            >
              <Droplet size={20} />
              {amount} ml
            </button>
          ))}
        </div>
      </div>

      <div className="form-card">
        <h3>Custom Amount</h3>
        <form onSubmit={handleCustomSubmit} className="inline-form">
          <input
            type="number"
            min="1"
            placeholder="Enter amount in ml"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
          <button type="submit" className="submit-button">
            <Plus size={20} />
            Add
          </button>
        </form>
      </div>

      <div className="entries-section">
        <h3>Today's Log</h3>
        {todayIntakes.length === 0 ? (
          <div className="empty-state">
            <Droplet size={48} />
            <p>No water logged today</p>
            <p className="empty-hint">Start tracking your hydration!</p>
          </div>
        ) : (
          <div className="entries-list">
            {todayIntakes.map((intake) => (
              <div key={intake.id} className="entry-card">
                <div className="entry-main">
                  <div className="entry-icon water-bg">
                    <Droplet size={20} />
                  </div>
                  <div className="entry-info">
                    <div className="entry-title">{intake.amount} ml</div>
                    <div className="entry-date">
                      {format(new Date(), 'h:mm a')}
                    </div>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(intake.id)}
                  title="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WaterTracker
