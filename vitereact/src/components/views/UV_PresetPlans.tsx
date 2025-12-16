import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkoutPlan, Exercise } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Clock, BarChart, Target, Dumbbell, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UV_PresetPlans: React.FC = () => {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/workout-plans');
      setPlans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error",
        description: "Failed to load workout plans. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const fetchPlanDetails = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/workout-plans/${id}`);
      setSelectedPlan(response.data);
      setViewMode('detail');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plan details:', error);
      toast({
        title: "Error",
        description: "Failed to load plan details.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: WorkoutPlan) => {
    fetchPlanDetails(plan.id);
  };

  const handleBackToList = () => {
    setSelectedPlan(null);
    setViewMode('list');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && plans.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
               <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {viewMode === 'list' ? 'Preset Workout Plans' : selectedPlan?.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col" onClick={() => handleSelectPlan(plan)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <Badge className={getDifficultyColor(plan.difficulty)} variant="secondary">
                      {plan.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{plan.goal}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4 line-clamp-3">{plan.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {plan.duration_minutes} min
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {selectedPlan && (
              <>
                {/* Plan Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedPlan.name}</CardTitle>
                        <CardDescription className="text-lg mt-1">{selectedPlan.goal}</CardDescription>
                      </div>
                      <Badge className={`${getDifficultyColor(selectedPlan.difficulty)} text-sm px-3 py-1`} variant="secondary">
                        {selectedPlan.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6 text-lg">{selectedPlan.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                        <Clock className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-900">{selectedPlan.duration_minutes} Minutes</p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                        <BarChart className="h-8 w-8 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Difficulty</p>
                          <p className="font-semibold text-gray-900">{selectedPlan.difficulty}</p>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg flex items-center">
                        <Target className="h-8 w-8 text-orange-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Goal</p>
                          <p className="font-semibold text-gray-900">{selectedPlan.goal}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                     <Button variant="outline" onClick={handleBackToList}>Back to Plans</Button>
                     <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <Play className="mr-2 h-4 w-4" /> Start Workout
                     </Button>
                  </CardFooter>
                </Card>

                {/* Exercises List */}
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Exercises</h2>
                <div className="space-y-4">
                  {selectedPlan.exercises?.map((exercise, index) => (
                    <Card key={index} className="flex flex-col sm:flex-row overflow-hidden">
                      <div className="bg-gray-100 p-6 flex items-center justify-center sm:w-32 flex-shrink-0">
                        <Dumbbell className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{index + 1}. {exercise.name}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                              {exercise.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{exercise.description}</p>
                        <div className="flex flex-wrap gap-3">
                          {exercise.sets && (
                            <Badge variant="outline" className="text-sm">
                              {exercise.sets} Sets
                            </Badge>
                          )}
                          {exercise.reps && (
                            <Badge variant="outline" className="text-sm">
                              {exercise.reps} Reps
                            </Badge>
                          )}
                          {exercise.duration_seconds && (
                            <Badge variant="outline" className="text-sm">
                              {exercise.duration_seconds} Seconds
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UV_PresetPlans;
