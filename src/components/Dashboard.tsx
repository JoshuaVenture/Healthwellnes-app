import { useEffect, useState } from 'react'
import './Dashboard.css'

interface Workout {
  id: string
  name: string
  duration: number
  date: string
}

interface Meal {
  id: string
  name: string
  calories: number
  date: string
}

interface Metrics {
  weight: number
  steps: number
  date: string
}

function Dashboard() {
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([])
  const [recentMeals, setRecentMeals] = useState<Meal[]>([])
  const [todayMetrics, setTodayMetrics] = useState<Metrics | null>(null)
  const [totalCalories, setTotalCalories] = useState(0)
  const [workoutMinutes, setWorkoutMinutes] = useState(0)

  useEffect(() => {
    // Load data from localStorage
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]')
    const meals = JSON.parse(localStorage.getItem('meals') || '[]')
    const metrics = JSON.parse(localStorage.getItem('metrics') || '[]')

    const today = new Date().toISOString().split('T')[0]
    
    // Get today's workouts and meals
    const todayWorkouts = workouts.filter((w: Workout) => w.date === today)
    const todayMeals = meals.filter((m: Meal) => m.date === today)
    const todayMetric = metrics.find((m: Metrics) => m.date === today)

    setRecentWorkouts(todayWorkouts.slice(-3).reverse())
    setRecentMeals(todayMeals.slice(-3).reverse())
    setTodayMetrics(todayMetric || null)

    // Calculate totals
    const calories = todayMeals.reduce((sum: number, m: Meal) => sum + m.calories, 0)
    const minutes = todayWorkouts.reduce((sum: number, w: Workout) => sum + w.duration, 0)
    
    setTotalCalories(calories)
    setWorkoutMinutes(minutes)
  }, [])

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3 className="stat-value">{totalCalories}</h3>
            <p className="stat-label">Calories Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3 className="stat-value">{workoutMinutes}</h3>
            <p className="stat-label">Workout Minutes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👣</div>
          <div className="stat-content">
            <h3 className="stat-value">{todayMetrics?.steps || 0}</h3>
            <p className="stat-label">Steps Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚖️</div>
          <div className="stat-content">
            <h3 className="stat-value">{todayMetrics?.weight || '--'}</h3>
            <p className="stat-label">Weight (kg)</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Recent Workouts</h2>
          {recentWorkouts.length > 0 ? (
            <ul className="activity-list">
              {recentWorkouts.map((workout) => (
                <li key={workout.id} className="activity-item">
                  <div className="activity-info">
                    <span className="activity-name">{workout.name}</span>
                    <span className="activity-detail">{workout.duration} min</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No workouts logged today</p>
          )}
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Recent Meals</h2>
          {recentMeals.length > 0 ? (
            <ul className="activity-list">
              {recentMeals.map((meal) => (
                <li key={meal.id} className="activity-item">
                  <div className="activity-info">
                    <span className="activity-name">{meal.name}</span>
                    <span className="activity-detail">{meal.calories} cal</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No meals logged today</p>
          )}
        </div>
      </div>

      <div className="wellness-tip">
        <h3 className="tip-title">💡 Wellness Tip</h3>
        <p className="tip-text">
          Stay hydrated! Aim to drink at least 8 glasses of water throughout the day. 
          Proper hydration supports metabolism, energy levels, and overall health.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
