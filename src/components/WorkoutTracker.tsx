import { useState, useEffect } from 'react'
import './WorkoutTracker.css'

interface Workout {
  id: string
  name: string
  duration: number
  date: string
}

function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [workoutName, setWorkoutName] = useState('')
  const [duration, setDuration] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('workouts')
    if (saved) {
      setWorkouts(JSON.parse(saved))
    }
  }, [])

  const saveWorkouts = (newWorkouts: Workout[]) => {
    setWorkouts(newWorkouts)
    localStorage.setItem('workouts', JSON.stringify(newWorkouts))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!workoutName.trim() || !duration) return

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      duration: parseInt(duration),
      date: new Date().toISOString().split('T')[0]
    }

    const updated = [...workouts, newWorkout]
    saveWorkouts(updated)
    setWorkoutName('')
    setDuration('')
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = workouts.filter(w => w.id !== id)
    saveWorkouts(updated)
  }

  const todayWorkouts = workouts.filter(w => w.date === new Date().toISOString().split('T')[0])
  const totalMinutes = todayWorkouts.reduce((sum, w) => sum + w.duration, 0)

  return (
    <div className="workout-tracker">
      <div className="page-header">
        <h1 className="page-title">Workout Tracker</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Workout'}
        </button>
      </div>

      {showForm && (
        <form className="workout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="workout-name">Workout Name</label>
            <input
              id="workout-name"
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Running, Yoga, Weight Training"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              min="1"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Log Workout</button>
        </form>
      )}

      <div className="summary-card">
        <h3>Today's Summary</h3>
        <div className="summary-stats">
          <div>
            <span className="summary-value">{todayWorkouts.length}</span>
            <span className="summary-label">Workouts</span>
          </div>
          <div>
            <span className="summary-value">{totalMinutes}</span>
            <span className="summary-label">Total Minutes</span>
          </div>
        </div>
      </div>

      <div className="workouts-list">
        <h2 className="section-title">Today's Workouts</h2>
        {todayWorkouts.length > 0 ? (
          <div className="workout-items">
            {todayWorkouts.map((workout) => (
              <div key={workout.id} className="workout-item">
                <div className="workout-info">
                  <span className="workout-name">{workout.name}</span>
                  <span className="workout-duration">{workout.duration} min</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(workout.id)}
                  aria-label="Delete workout"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No workouts logged today. Start your fitness journey!</p>
        )}
      </div>

      {workouts.filter(w => w.date !== new Date().toISOString().split('T')[0]).length > 0 && (
        <div className="workouts-list">
          <h2 className="section-title">Previous Workouts</h2>
          <div className="workout-items">
            {workouts
              .filter(w => w.date !== new Date().toISOString().split('T')[0])
              .slice(-10)
              .reverse()
              .map((workout) => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-info">
                    <span className="workout-name">{workout.name}</span>
                    <div className="workout-meta">
                      <span className="workout-duration">{workout.duration} min</span>
                      <span className="workout-date">{workout.date}</span>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(workout.id)}
                    aria-label="Delete workout"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkoutTracker
