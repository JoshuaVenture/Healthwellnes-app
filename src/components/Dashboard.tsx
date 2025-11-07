import { format } from 'date-fns'
import { Activity, Droplet, Heart, Moon, TrendingUp } from 'lucide-react'
import { HealthData } from '../types'
import './Dashboard.css'

interface DashboardProps {
  data: HealthData
}

function Dashboard({ data }: DashboardProps) {
  const today = format(new Date(), 'yyyy-MM-dd')

  // Calculate today's statistics
  const todayActivities = data.activities.filter(a => a.date === today)
  const todayWater = data.waterIntakes
    .filter(w => w.date === today)
    .reduce((sum, w) => sum + w.amount, 0)
  const todayMood = data.moodEntries.find(m => m.date === today)
  const todaySleep = data.sleepEntries.find(s => s.date === today)

  const totalExerciseMinutes = todayActivities.reduce((sum, a) => sum + a.duration, 0)
  const totalCalories = todayActivities.reduce((sum, a) => sum + a.calories, 0)

  // Calculate progress percentages
  const waterProgress = Math.min((todayWater / data.dailyGoals.water) * 100, 100)
  const exerciseProgress = Math.min((totalExerciseMinutes / data.dailyGoals.exercise) * 100, 100)

  // Weekly summary
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return format(date, 'yyyy-MM-dd')
  }).reverse()

  const weeklyActivities = last7Days.map(date => ({
    date,
    activities: data.activities.filter(a => a.date === date).length,
  }))

  return (
    <div className="dashboard">
      <h2>Today's Overview</h2>
      <p className="date">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>

      <div className="stats-grid">
        <div className="stat-card activity-card">
          <div className="stat-header">
            <Activity size={28} />
            <h3>Activity</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalExerciseMinutes} min</div>
            <div className="stat-label">Exercise time</div>
            <div className="progress-bar">
              <div 
                className="progress-fill activity-fill" 
                style={{ width: `${exerciseProgress}%` }}
              />
            </div>
            <div className="stat-detail">{totalCalories} calories burned</div>
            <div className="stat-detail">{todayActivities.length} activities logged</div>
          </div>
        </div>

        <div className="stat-card water-card">
          <div className="stat-header">
            <Droplet size={28} />
            <h3>Hydration</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{todayWater} ml</div>
            <div className="stat-label">Water intake</div>
            <div className="progress-bar">
              <div 
                className="progress-fill water-fill" 
                style={{ width: `${waterProgress}%` }}
              />
            </div>
            <div className="stat-detail">
              Goal: {data.dailyGoals.water} ml ({Math.round(waterProgress)}%)
            </div>
          </div>
        </div>

        <div className="stat-card mood-card">
          <div className="stat-header">
            <Heart size={28} />
            <h3>Mood</h3>
          </div>
          <div className="stat-content">
            {todayMood ? (
              <>
                <div className="stat-value mood-emoji">{getMoodEmoji(todayMood.mood)}</div>
                <div className="stat-label">{todayMood.mood}</div>
                {todayMood.note && (
                  <div className="stat-detail mood-note">"{todayMood.note}"</div>
                )}
              </>
            ) : (
              <>
                <div className="stat-value">-</div>
                <div className="stat-label">Not logged yet</div>
              </>
            )}
          </div>
        </div>

        <div className="stat-card sleep-card">
          <div className="stat-header">
            <Moon size={28} />
            <h3>Sleep</h3>
          </div>
          <div className="stat-content">
            {todaySleep ? (
              <>
                <div className="stat-value">{todaySleep.hours}h</div>
                <div className="stat-label">{todaySleep.quality} quality</div>
                <div className="stat-detail">
                  Goal: {data.dailyGoals.sleep}h ({Math.round((todaySleep.hours / data.dailyGoals.sleep) * 100)}%)
                </div>
              </>
            ) : (
              <>
                <div className="stat-value">-</div>
                <div className="stat-label">Not logged yet</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="weekly-summary">
        <div className="section-header">
          <TrendingUp size={24} />
          <h3>7-Day Activity Trend</h3>
        </div>
        <div className="weekly-chart">
          {weeklyActivities.map(({ date, activities }) => (
            <div key={date} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ height: `${Math.min(activities * 30, 100)}%` }}
              >
                {activities > 0 && <span className="bar-label">{activities}</span>}
              </div>
              <div className="chart-label">{format(new Date(date), 'EEE')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    bad: '😟',
    terrible: '😢',
  }
  return emojis[mood] || '😐'
}

export default Dashboard
