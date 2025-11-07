import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import './ActivityTracker.css'

interface Activity {
  id: string
  name: string
  duration: number
  calories: number
  date: string
}

export default function ActivityTracker() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [steps, setSteps] = useState(0)
  const [calories, setCalories] = useState(0)

  const activityTypes = [
    { name: 'Walking', caloriesPerMin: 4 },
    { name: 'Running', caloriesPerMin: 10 },
    { name: 'Cycling', caloriesPerMin: 8 },
    { name: 'Yoga', caloriesPerMin: 3 },
    { name: 'Swimming', caloriesPerMin: 7 },
    { name: 'Strength Training', caloriesPerMin: 5 }
  ]

  const addActivity = (name: string, caloriesPerMin: number) => {
    const duration = 30 // default 30 minutes
    const newActivity: Activity = {
      id: Date.now().toString(),
      name,
      duration,
      calories: duration * caloriesPerMin,
      date: new Date().toISOString()
    }
    setActivities([...activities, newActivity])
    setCalories(calories + newActivity.calories)
  }

  const removeActivity = (id: string) => {
    const activity = activities.find(a => a.id === id)
    if (activity) {
      setCalories(Math.max(0, calories - activity.calories))
    }
    setActivities(activities.filter(a => a.id !== id))
  }

  const updateSteps = (delta: number) => {
    setSteps(Math.max(0, steps + delta))
    // Save to localStorage
    const savedStats = JSON.parse(localStorage.getItem('healthStats') || '{}')
    savedStats.steps = Math.max(0, steps + delta)
    savedStats.calories = calories
    localStorage.setItem('healthStats', JSON.stringify(savedStats))
  }

  return (
    <div className="activity-tracker">
      <h2>Activity Tracker</h2>
      
      <div className="steps-counter">
        <h3>Steps</h3>
        <div className="steps-controls">
          <button onClick={() => updateSteps(-100)} className="step-btn">
            <Minus size={20} />
          </button>
          <div className="steps-display">{steps.toLocaleString()}</div>
          <button onClick={() => updateSteps(100)} className="step-btn">
            <Plus size={20} />
          </button>
        </div>
        <button onClick={() => updateSteps(1000)} className="add-steps-btn">
          +1,000 Steps
        </button>
      </div>

      <div className="activities-section">
        <h3>Log Activities</h3>
        <div className="activity-buttons">
          {activityTypes.map((activity) => (
            <button
              key={activity.name}
              onClick={() => addActivity(activity.name, activity.caloriesPerMin)}
              className="activity-btn"
            >
              <Plus size={18} />
              {activity.name}
            </button>
          ))}
        </div>
      </div>

      <div className="activities-list">
        <h3>Today's Activities</h3>
        {activities.length === 0 ? (
          <p className="empty-state">No activities logged yet. Start tracking your workouts!</p>
        ) : (
          <div className="activities">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-info">
                  <span className="activity-name">{activity.name}</span>
                  <span className="activity-details">
                    {activity.duration} min • {activity.calories} cal
                  </span>
                </div>
                <button
                  onClick={() => removeActivity(activity.id)}
                  className="remove-btn"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="calories-summary">
        <h3>Total Calories Burned</h3>
        <div className="calories-value">{calories}</div>
      </div>
    </div>
  )
}
