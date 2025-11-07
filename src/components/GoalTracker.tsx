import { useState } from 'react'
import { Target, CheckCircle, Circle } from 'lucide-react'
import './GoalTracker.css'

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  completed: boolean
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Steps',
      target: 10000,
      current: 0,
      unit: 'steps',
      completed: false
    },
    {
      id: '2',
      title: 'Water Intake',
      target: 8,
      current: 0,
      unit: 'glasses',
      completed: false
    },
    {
      id: '3',
      title: 'Exercise Minutes',
      target: 30,
      current: 0,
      unit: 'minutes',
      completed: false
    }
  ])

  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '' })

  const updateGoal = (id: string, value: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updated = { ...goal, current: Math.max(0, value) }
        updated.completed = updated.current >= updated.target
        return updated
      }
      return goal
    }))
  }

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: parseInt(newGoal.target),
        current: 0,
        unit: newGoal.unit || 'units',
        completed: false
      }
      setGoals([...goals, goal])
      setNewGoal({ title: '', target: '', unit: '' })
    }
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const getProgress = (goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100)
  }

  return (
    <div className="goal-tracker">
      <h2>Health Goals</h2>

      <div className="goals-list">
        {goals.map((goal) => (
          <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
            <div className="goal-header">
              <div className="goal-title-section">
                {goal.completed ? (
                  <CheckCircle size={24} className="goal-icon completed" />
                ) : (
                  <Target size={24} className="goal-icon" />
                )}
                <div>
                  <h3>{goal.title}</h3>
                  <p className="goal-target">
                    {goal.current} / {goal.target} {goal.unit}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="delete-goal-btn"
              >
                ×
              </button>
            </div>
            
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${getProgress(goal)}%` }}
              />
            </div>

            <div className="goal-controls">
              <button onClick={() => updateGoal(goal.id, goal.current - 1)}>
                −
              </button>
              <input
                type="number"
                value={goal.current}
                onChange={(e) => updateGoal(goal.id, parseInt(e.target.value) || 0)}
                min="0"
                className="goal-input"
              />
              <button onClick={() => updateGoal(goal.id, goal.current + 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-goal-section">
        <h3>Add New Goal</h3>
        <div className="add-goal-form">
          <input
            type="text"
            placeholder="Goal name (e.g., Daily Meditation)"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="goal-input-field"
          />
          <input
            type="number"
            placeholder="Target"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            className="goal-input-field"
          />
          <input
            type="text"
            placeholder="Unit (e.g., minutes, glasses)"
            value={newGoal.unit}
            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
            className="goal-input-field"
          />
          <button onClick={addGoal} className="add-goal-btn">
            Add Goal
          </button>
        </div>
      </div>
    </div>
  )
}
