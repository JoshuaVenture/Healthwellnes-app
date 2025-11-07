import { useState } from 'react'
import { Target, Save } from 'lucide-react'
import { HealthData } from '../types'
import './Tracker.css'

interface GoalsSettingsProps {
  goals: HealthData['dailyGoals']
  onUpdate: (goals: HealthData['dailyGoals']) => void
}

function GoalsSettings({ goals, onUpdate }: GoalsSettingsProps) {
  const [formData, setFormData] = useState(goals)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="tracker">
      <div className="tracker-header">
        <div>
          <h2>Daily Goals</h2>
          <p className="subtitle">Set your health and wellness targets</p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="goals-form">
          <div className="goal-item">
            <div className="goal-header">
              <Target className="goal-icon" />
              <h3>Steps Goal</h3>
            </div>
            <div className="goal-input-wrapper">
              <input
                type="number"
                min="1000"
                step="1000"
                value={formData.steps}
                onChange={(e) => setFormData({ ...formData, steps: Number(e.target.value) })}
              />
              <span className="goal-unit">steps per day</span>
            </div>
            <p className="goal-description">
              Recommended: 10,000 steps per day for maintaining good health
            </p>
          </div>

          <div className="goal-item">
            <div className="goal-header">
              <Target className="goal-icon" />
              <h3>Water Intake Goal</h3>
            </div>
            <div className="goal-input-wrapper">
              <input
                type="number"
                min="500"
                step="250"
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: Number(e.target.value) })}
              />
              <span className="goal-unit">ml per day</span>
            </div>
            <p className="goal-description">
              Recommended: 2000-3000 ml (8-12 glasses) per day
            </p>
          </div>

          <div className="goal-item">
            <div className="goal-header">
              <Target className="goal-icon" />
              <h3>Exercise Goal</h3>
            </div>
            <div className="goal-input-wrapper">
              <input
                type="number"
                min="15"
                step="5"
                value={formData.exercise}
                onChange={(e) => setFormData({ ...formData, exercise: Number(e.target.value) })}
              />
              <span className="goal-unit">minutes per day</span>
            </div>
            <p className="goal-description">
              Recommended: At least 30 minutes of moderate exercise per day
            </p>
          </div>

          <div className="goal-item">
            <div className="goal-header">
              <Target className="goal-icon" />
              <h3>Sleep Goal</h3>
            </div>
            <div className="goal-input-wrapper">
              <input
                type="number"
                min="4"
                max="12"
                step="0.5"
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: Number(e.target.value) })}
              />
              <span className="goal-unit">hours per night</span>
            </div>
            <p className="goal-description">
              Recommended: 7-9 hours of quality sleep per night
            </p>
          </div>

          <button type="submit" className="submit-button full-width save-button">
            <Save size={20} />
            {saved ? 'Goals Saved!' : 'Save Goals'}
          </button>
        </form>
      </div>

      <div className="info-section">
        <h3>Why Set Goals?</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>🎯 Stay Motivated</h4>
            <p>Having clear targets helps you stay focused and committed to your health journey.</p>
          </div>
          <div className="info-card">
            <h4>📊 Track Progress</h4>
            <p>Measure your daily achievements against your goals to see how you're improving.</p>
          </div>
          <div className="info-card">
            <h4>🏆 Build Habits</h4>
            <p>Consistent goal-setting helps establish healthy habits that last a lifetime.</p>
          </div>
          <div className="info-card">
            <h4>💪 Improve Health</h4>
            <p>Research shows that people who set health goals are more likely to achieve them.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalsSettings
