import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import WorkoutTracker from './components/WorkoutTracker'
import NutritionLogger from './components/NutritionLogger'
import HealthMetrics from './components/HealthMetrics'
import './App.css'

function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">💪</span>
          <span className="logo-text">Health & Wellness</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </Link>
          <Link to="/workouts" className={isActive('/workouts') ? 'nav-link active' : 'nav-link'}>
            Workouts
          </Link>
          <Link to="/nutrition" className={isActive('/nutrition') ? 'nav-link active' : 'nav-link'}>
            Nutrition
          </Link>
          <Link to="/metrics" className={isActive('/metrics') ? 'nav-link active' : 'nav-link'}>
            Metrics
          </Link>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<WorkoutTracker />} />
            <Route path="/nutrition" element={<NutritionLogger />} />
            <Route path="/metrics" element={<HealthMetrics />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
