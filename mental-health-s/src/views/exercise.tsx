import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PhysicalExercises from '@/components/exercis/phys';

import MindfulnessExercises from "@/components/exercis/bre";
import RelaxationTechniques from "@/components/exercis/relax";


export default function ExercisesPage() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Exercises for Mental Health</h1>
  
          <Tabs defaultValue="physical" className="w-full">
            <TabsList className="flex justify-center space-x-4 mb-6">
              <TabsTrigger value="physical" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Physical Exercises
              </TabsTrigger>
              <TabsTrigger value="mindfulness" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Mindfulness & Breathing
              </TabsTrigger>
              <TabsTrigger value="relaxation" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                Relaxation Techniques
              </TabsTrigger>
            </TabsList>
  
            <TabsContent value="physical">
              <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Physical Exercises</h2>
                <PhysicalExercises />
              </div>
            </TabsContent>
  
            <TabsContent value="mindfulness">
              <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mindfulness & Breathing</h2>
                <MindfulnessExercises />
              </div>
            </TabsContent>
  
            <TabsContent value="relaxation">
              <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Relaxation Techniques</h2>
                <RelaxationTechniques />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )

  }




  