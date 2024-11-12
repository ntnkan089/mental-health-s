import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MentalHealthVideos from "@/components/res/vidres";

import WebScrapingComponent from "@/components/res/artiRes";


import Therapis from "@/components/res/thera";
export default function ResourcePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Mental Health Resources</h1>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="flex justify-center space-x-4 mb-6">
            <TabsTrigger value="videos" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Videos
            </TabsTrigger>
            <TabsTrigger value="articles" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Articles
            </TabsTrigger>
            <TabsTrigger value="therapists" className="w-1/3 text-center py-2 px-4 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Therapists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Helpful Videos</h2>
              {/* Insert Video Resources Here */}
              <p className="text-gray-600">Here are some useful video resources on mental health. You can watch tutorials, talks, and other insightful content.</p>
            <MentalHealthVideos />

            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informative Articles</h2>
              {/* Insert Article Resources Here */}
              <p className="text-gray-600">Here are some insightful articles on mental health. Learn more about different conditions, coping strategies, and well-being tips.</p>
              <WebScrapingComponent />
            </div>
          </TabsContent>

          <TabsContent value="therapists">
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Find a Therapist</h2>
              {/* Insert Therapist Resources Here */}
              <p className="text-gray-600">Looking for a therapist? Browse through recommended professionals and resources that can help you find the support you need.</p>
            </div>
            <Therapis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}





















