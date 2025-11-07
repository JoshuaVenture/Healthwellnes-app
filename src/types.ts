export interface Activity {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface WaterIntake {
  id: string;
  amount: number; // in ml
  date: string;
}

export interface MoodEntry {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note?: string;
  date: string;
}

export interface SleepEntry {
  id: string;
  hours: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  date: string;
}

export interface HealthData {
  activities: Activity[];
  waterIntakes: WaterIntake[];
  moodEntries: MoodEntry[];
  sleepEntries: SleepEntry[];
  dailyGoals: {
    steps: number;
    water: number; // in ml
    exercise: number; // in minutes
    sleep: number; // in hours
  };
}
