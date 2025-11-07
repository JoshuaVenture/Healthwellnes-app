import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, Moon } from 'lucide-react'
import { SleepEntry } from '../types'
import './Tracker.css'

interface SleepTrackerProps {
  sleepEntries: SleepEntry[]
  dailyGoal: number
  onUpdate: (sleepEntries: SleepEntry[]) => void
}

const qualities = ['excellent', 'good', 'fair', 'poor'] as const

function SleepTracker({ sleepEntries, dailyGoal, onUpdate }: SleepTrackerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    hours: '',
    quality: 'good' as SleepEntry['quality'],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: SleepEntry = {
      id: Date.now().toString(),
      hours: Number(formData.hours),
      quality: formData.quality,
      date: format(new Date(), 'yyyy-MM-dd'),
    }
    onUpdate([newEntry, ...sleepEntries])
    setFormData({ hours: '', quality: 'good' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    onUpdate(sleepEntries.filter(s => s.id !== id))
  }

  const todayEntry = sleepEntries.find(
    s => s.date === format(new Date(), 'yyyy-MM-dd')
  )

  const last7Days = sleepEntries.slice(0, 7)
  const avgSleep = last7Days.length > 0
    ? (last7Days.reduce((sum, s) => sum + s.hours, 0) / last7Days.length).toFixed(1)
    : '0'

  return (
    <div className="tracker">
      <div className="tracker-header">
        <div>
          <h2>Sleep Tracker</h2>
          <p className="subtitle">Track your rest and recovery</p>
        </div>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          Log Sleep
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <Moon size={24} className="summary-icon sleep-icon" />
          <div>
            <div className="summary-value">{todayEntry ? `${todayEntry.hours}h` : '-'}</div>
            <div className="summary-label">Last Night</div>
          </div>
        </div>
        <div className="summary-card">
          <Moon size={24} className="summary-icon sleep-icon" />
          <div>
            <div className="summary-value">{avgSleep}h</div>
            <div className="summary-label">7-Day Average</div>
          </div>
        </div>
        <div className="summary-card">
          <Moon size={24} className="summary-icon sleep-icon" />
          <div>
            <div className="summary-value">{dailyGoal}h</div>
            <div className="summary-label">Daily Goal</div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Log Sleep</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Hours of Sleep</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="e.g., 7.5"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Sleep Quality</label>
              <div className="quality-selector">
                {qualities.map((quality) => (
                  <button
                    key={quality}
                    type="button"
                    className={`quality-button ${formData.quality === quality ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, quality })}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Log Sleep
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="entries-section">
        <h3>Sleep History</h3>
        {sleepEntries.length === 0 ? (
          <div className="empty-state">
            <Moon size={48} />
            <p>No sleep entries yet</p>
            <p className="empty-hint">Start tracking your sleep patterns!</p>
          </div>
        ) : (
          <div className="entries-list">
            {sleepEntries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <div className="entry-main">
                  <div className="entry-icon sleep-bg">
                    <Moon size={20} />
                  </div>
                  <div className="entry-info">
                    <div className="entry-title">{entry.hours} hours</div>
                    <div className="entry-date">
                      {format(new Date(entry.date), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="entry-details">
                  <span className={`quality-badge quality-${entry.quality}`}>
                    {entry.quality}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(entry.id)}
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

export default SleepTracker
