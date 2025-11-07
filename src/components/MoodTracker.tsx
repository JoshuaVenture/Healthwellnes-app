import { useState } from 'react'
import { format } from 'date-fns'
import { Heart, Trash2 } from 'lucide-react'
import { MoodEntry } from '../types'
import './Tracker.css'

interface MoodTrackerProps {
  moodEntries: MoodEntry[]
  onUpdate: (moodEntries: MoodEntry[]) => void
}

const moods = [
  { value: 'great', emoji: '😄', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'bad', emoji: '😟', label: 'Bad' },
  { value: 'terrible', emoji: '😢', label: 'Terrible' },
] as const

function MoodTracker({ moodEntries, onUpdate }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMood) {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: selectedMood as MoodEntry['mood'],
        note: note.trim() || undefined,
        date: format(new Date(), 'yyyy-MM-dd'),
      }
      onUpdate([newEntry, ...moodEntries])
      setSelectedMood('')
      setNote('')
    }
  }

  const handleDelete = (id: string) => {
    onUpdate(moodEntries.filter(m => m.id !== id))
  }

  const todayEntry = moodEntries.find(
    m => m.date === format(new Date(), 'yyyy-MM-dd')
  )

  return (
    <div className="tracker">
      <div className="tracker-header">
        <div>
          <h2>Mood Tracker</h2>
          <p className="subtitle">How are you feeling today?</p>
        </div>
      </div>

      {todayEntry && (
        <div className="mood-today">
          <div className="mood-today-emoji">{moods.find(m => m.value === todayEntry.mood)?.emoji}</div>
          <div className="mood-today-text">
            <h3>Today's Mood: {todayEntry.mood}</h3>
            {todayEntry.note && <p className="mood-today-note">"{todayEntry.note}"</p>}
          </div>
        </div>
      )}

      {!todayEntry && (
        <div className="form-card">
          <h3>Log Your Mood</h3>
          <form onSubmit={handleSubmit}>
            <div className="mood-selector">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <span className="mood-emoji-large">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
            <div className="form-group">
              <label>Add a note (optional)</label>
              <textarea
                placeholder="What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
            <button 
              type="submit" 
              className="submit-button full-width"
              disabled={!selectedMood}
            >
              Log Mood
            </button>
          </form>
        </div>
      )}

      <div className="entries-section">
        <h3>Mood History</h3>
        {moodEntries.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} />
            <p>No mood entries yet</p>
            <p className="empty-hint">Start tracking your emotional wellbeing!</p>
          </div>
        ) : (
          <div className="entries-list">
            {moodEntries.map((entry) => {
              const moodData = moods.find(m => m.value === entry.mood)
              return (
                <div key={entry.id} className="entry-card">
                  <div className="entry-main">
                    <div className="entry-icon mood-bg">
                      <span style={{ fontSize: '1.5rem' }}>{moodData?.emoji}</span>
                    </div>
                    <div className="entry-info">
                      <div className="entry-title">{moodData?.label}</div>
                      <div className="entry-date">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </div>
                      {entry.note && (
                        <div className="entry-note">"{entry.note}"</div>
                      )}
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(entry.id)}
                    title="Delete entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodTracker
