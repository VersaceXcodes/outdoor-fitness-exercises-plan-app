-- COMMANDS FOR DB TABLES
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  video_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50), -- 'Beginner', 'Intermediate', 'Advanced'
  goal VARCHAR(50), -- 'Strength', 'Cardio', 'Weight Loss'
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_plan_exercises (
  id SERIAL PRIMARY KEY,
  workout_plan_id INTEGER REFERENCES workout_plans(id) ON DELETE CASCADE,
  exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
  sets INTEGER DEFAULT 3,
  reps INTEGER DEFAULT 10,
  duration_seconds INTEGER,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- COMMANDS FOR DB SEED
TRUNCATE TABLE workout_plan_exercises, workout_plans, exercises RESTART IDENTITY CASCADE;

INSERT INTO exercises (name, description, category) VALUES
('Push-ups', 'A classic upper body exercise.', 'Strength'),
('Squats', 'A lower body exercise targeting thighs and glutes.', 'Strength'),
('Jumping Jacks', 'A full-body cardio exercise.', 'Cardio'),
('Lunges', 'A lower body exercise for legs.', 'Strength'),
('Plank', 'Core strengthening exercise.', 'Core'),
('Burpees', 'Full body strength and cardio.', 'HIIT'),
('Running', 'Outdoor running.', 'Cardio'),
('Pull-ups', 'Upper body pulling exercise.', 'Strength');

INSERT INTO workout_plans (name, description, difficulty, goal, duration_minutes) VALUES
('Beginner Full Body', 'A simple routine to get started.', 'Beginner', 'General Fitness', 20),
('HIIT Blast', 'High intensity interval training for fat loss.', 'Intermediate', 'Weight Loss', 30),
('Advanced Strength', 'Heavy lifting focus.', 'Advanced', 'Strength', 45),
('Morning Cardio', 'Wake up with this cardio routine.', 'Beginner', 'Cardio', 15);

INSERT INTO workout_plan_exercises (workout_plan_id, exercise_id, sets, reps, duration_seconds, order_index) VALUES
-- Beginner Full Body
(1, 3, 3, 20, NULL, 1), -- Jumping Jacks
(1, 2, 3, 10, NULL, 2), -- Squats
(1, 1, 3, 10, NULL, 3), -- Push-ups
(1, 5, 3, NULL, 30, 4), -- Plank

-- HIIT Blast
(2, 3, 4, 30, NULL, 1), -- Jumping Jacks
(2, 6, 4, 15, NULL, 2), -- Burpees
(2, 2, 4, 20, NULL, 3), -- Squats
(2, 4, 4, 20, NULL, 4), -- Lunges

-- Advanced Strength
(3, 8, 5, 10, NULL, 1), -- Pull-ups
(3, 1, 5, 20, NULL, 2), -- Push-ups
(3, 2, 5, 20, NULL, 3), -- Squats
(3, 4, 4, 15, NULL, 4), -- Lunges
(3, 5, 3, NULL, 60, 5); -- Plank
