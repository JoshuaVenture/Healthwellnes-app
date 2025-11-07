import { useState, useEffect } from 'react'
import './HealthMetrics.css'

interface Metric {
  id: string
  weight: number
  steps: number
  date: string
}

function HealthMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [weight, setWeight] = useState('')
  const [steps, setSteps] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('metrics')
    if (saved) {
      setMetrics(JSON.parse(saved))
    }
  }, [])

  const saveMetrics = (newMetrics: Metric[]) => {
    setMetrics(newMetrics)
    localStorage.setItem('metrics', JSON.stringify(newMetrics))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!weight || !steps) return

    const today = new Date().toISOString().split('T')[0]
    const existingIndex = metrics.findIndex(m => m.date === today)

    const newMetric: Metric = {
      id: existingIndex >= 0 ? metrics[existingIndex].id : Date.now().toString(),
      weight: parseFloat(weight),
      steps: parseInt(steps),
      date: today
    }

    let updated: Metric[]
    if (existingIndex >= 0) {
      updated = [...metrics]
      updated[existingIndex] = newMetric
    } else {
      updated = [...metrics, newMetric]
    }

    saveMetrics(updated)
    setWeight('')
    setSteps('')
    setShowForm(false)
  }

  const todayMetric = metrics.find(m => m.date === new Date().toISOString().split('T')[0])

  // Calculate weekly average weight
  const last7Days = metrics
    .filter(m => {
      const metricDate = new Date(m.date)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - metricDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    })
    .slice(-7)

  const avgWeight = last7Days.length > 0
    ? (last7Days.reduce((sum, m) => sum + m.weight, 0) / last7Days.length).toFixed(1)
    : null

  const totalSteps = last7Days.reduce((sum, m) => sum + m.steps, 0)

  return (
    <div className="health-metrics">
      <div className="page-header">
        <h1 className="page-title">Health Metrics</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log Metrics'}
        </button>
      </div>

      {showForm && (
        <form className="metrics-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70.5"
              step="0.1"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="steps">Steps</label>
            <input
              id="steps"
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="10000"
              min="0"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            {todayMetric ? 'Update Today\'s Metrics' : 'Log Metrics'}
          </button>
        </form>
      )}

      <div className="metrics-summary">
        <div className="summary-card">
          <div className="summary-icon">⚖️</div>
          <div className="summary-content">
            <h3>Today's Weight</h3>
            <p className="summary-value-large">
              {todayMetric ? `${todayMetric.weight} kg` : '--'}
            </p>
            {avgWeight && (
              <p className="summary-note">7-day avg: {avgWeight} kg</p>
            )}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">👣</div>
          <div className="summary-content">
            <h3>Today's Steps</h3>
            <p className="summary-value-large">
              {todayMetric ? todayMetric.steps.toLocaleString() : '--'}
            </p>
            <p className="summary-note">7-day total: {totalSteps.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="metrics-history">
        <h2 className="section-title">Recent History</h2>
        {metrics.length > 0 ? (
          <div className="metrics-list">
            {metrics.slice(-10).reverse().map((metric) => (
              <div key={metric.id} className="metric-item">
                <div className="metric-date">{metric.date}</div>
                <div className="metric-values">
                  <div className="metric-value">
                    <span className="metric-label">Weight:</span>
                    <span className="metric-number">{metric.weight} kg</span>
                  </div>
                  <div className="metric-value">
                    <span className="metric-label">Steps:</span>
                    <span className="metric-number">{metric.steps.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No metrics logged yet. Start tracking your health!</p>
        )}
      </div>
    </div>
  )
}

export default HealthMetrics
