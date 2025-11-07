import { useState, useEffect } from 'react'
import './NutritionLogger.css'

interface Meal {
  id: string
  name: string
  calories: number
  date: string
}

function NutritionLogger() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [mealName, setMealName] = useState('')
  const [calories, setCalories] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('meals')
    if (saved) {
      setMeals(JSON.parse(saved))
    }
  }, [])

  const saveMeals = (newMeals: Meal[]) => {
    setMeals(newMeals)
    localStorage.setItem('meals', JSON.stringify(newMeals))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mealName.trim() || !calories) return

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      calories: parseInt(calories),
      date: new Date().toISOString().split('T')[0]
    }

    const updated = [...meals, newMeal]
    saveMeals(updated)
    setMealName('')
    setCalories('')
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = meals.filter(m => m.id !== id)
    saveMeals(updated)
  }

  const todayMeals = meals.filter(m => m.date === new Date().toISOString().split('T')[0])
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0)
  const calorieGoal = 2000

  return (
    <div className="nutrition-logger">
      <div className="page-header">
        <h1 className="page-title">Nutrition Logger</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log Meal'}
        </button>
      </div>

      {showForm && (
        <form className="meal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="meal-name">Meal Name</label>
            <input
              id="meal-name"
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., Grilled Chicken Salad, Oatmeal"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="500"
              min="1"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Log Meal</button>
        </form>
      )}

      <div className="calorie-summary">
        <div className="calorie-progress">
          <div className="calorie-header">
            <h3>Daily Calorie Goal</h3>
            <span className="calorie-count">
              {totalCalories} / {calorieGoal} cal
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%`,
                backgroundColor: totalCalories > calorieGoal ? var(--danger-color) : var(--secondary-color)
              }}
            />
          </div>
          <p className="calorie-remaining">
            {totalCalories < calorieGoal
              ? `${calorieGoal - totalCalories} calories remaining`
              : `${totalCalories - calorieGoal} calories over goal`}
          </p>
        </div>
      </div>

      <div className="meals-list">
        <h2 className="section-title">Today's Meals</h2>
        {todayMeals.length > 0 ? (
          <div className="meal-items">
            {todayMeals.map((meal) => (
              <div key={meal.id} className="meal-item">
                <div className="meal-info">
                  <span className="meal-name">{meal.name}</span>
                  <span className="meal-calories">{meal.calories} cal</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(meal.id)}
                  aria-label="Delete meal"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No meals logged today. Start tracking your nutrition!</p>
        )}
      </div>

      {meals.filter(m => m.date !== new Date().toISOString().split('T')[0]).length > 0 && (
        <div className="meals-list">
          <h2 className="section-title">Previous Meals</h2>
          <div className="meal-items">
            {meals
              .filter(m => m.date !== new Date().toISOString().split('T')[0])
              .slice(-10)
              .reverse()
              .map((meal) => (
                <div key={meal.id} className="meal-item">
                  <div className="meal-info">
                    <span className="meal-name">{meal.name}</span>
                    <div className="meal-meta">
                      <span className="meal-calories">{meal.calories} cal</span>
                      <span className="meal-date">{meal.date}</span>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(meal.id)}
                    aria-label="Delete meal"
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

export default NutritionLogger
