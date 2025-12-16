export interface Exercise {
  id: number;
  name: string;
  description: string;
  category: string;
  video_url?: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  order_index?: number;
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: string;
  duration_minutes: number;
  created_at?: string;
  exercises?: Exercise[];
}
