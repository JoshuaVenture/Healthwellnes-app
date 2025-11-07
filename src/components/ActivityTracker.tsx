import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, Activity as ActivityIcon } from 'lucide-react'
import { Activity } from '../types'
import './Tracker.css'

interface ActivityTrackerProps {
  activities: Activity[]
  onUpdate: (activities: Activity[]) => void
}

const activityTypes = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Yoga',
  'Gym Workout',
  'Dancing',
  'Sports',
  'Hiking',
  'Other',
]

function ActivityTracker({ activities, onUpdate }: ActivityTrackerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Running',
    duration: '',
    calories: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: formData.type,
      duration: Number(formData.duration),
      calories: Number(formData.calories),
      date: format(new Date(), 'yyyy-MM-dd'),
    }
    onUpdate([newActivity, ...activities])
    setFormData({ type: 'Running', duration: '', calories: '' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    onUpdate(activities.filter(a => a.id !== id))
  }

  const todayActivities = activities.filter(
    a => a.date === format(new Date(), 'yyyy-MM-dd')
  )

  const totalDuration = todayActivities.reduce((sum, a) => sum + a.duration, 0)
  const totalCalories = todayActivities.reduce((sum, a) => sum + a.calories, 0)

  return (
    <div className="tracker">
      <div className="tracker-header">
        <div>
          <h2>Activity Tracker</h2>
          <p className="subtitle">Log your exercises and stay active</p>
        </div>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          Add Activity
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <ActivityIcon size={24} className="summary-icon activity-icon" />
          <div>
            <div className="summary-value">{todayActivities.length}</div>
            <div className="summary-label">Activities Today</div>
          </div>
        </div>
        <div className="summary-card">
          <ActivityIcon size={24} className="summary-icon duration-icon" />
          <div>
            <div className="summary-value">{totalDuration} min</div>
            <div className="summary-label">Total Duration</div>
          </div>
        </div>
        <div className="summary-card">
          <ActivityIcon size={24} className="summary-icon calories-icon" />
          <div>
            <div className="summary-value">{totalCalories}</div>
            <div className="summary-label">Calories Burned</div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Log New Activity</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Activity Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Calories Burned</label>
                <input
                  type="number"
                  min="1"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Log Activity
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="entries-section">
        <h3>Recent Activities</h3>
        {activities.length === 0 ? (
          <div className="empty-state">
            <ActivityIcon size={48} />
            <p>No activities logged yet</p>
            <p className="empty-hint">Start tracking your exercises to see your progress!</p>
          </div>
        ) : (
          <div className="entries-list">
            {activities.map((activity) => (
              <div key={activity.id} className="entry-card">
                <div className="entry-main">
                  <div className="entry-icon activity-bg">
                    <ActivityIcon size={20} />
                  </div>
                  <div className="entry-info">
                    <div className="entry-title">{activity.type}</div>
                    <div className="entry-date">
                      {format(new Date(activity.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="entry-details">
                  <span className="entry-badge">{activity.duration} min</span>
                  <span className="entry-badge">{activity.calories} cal</span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(activity.id)}
                  title="Delete activity"
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

export default ActivityTracker
