import { FacilitatorApplicationForm } from "@/components/form/faciForm" 

export default function FacilitatorApplicationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Facilitator Application</h1>
        
        <p className="text-sm text-gray-600 text-center mb-6 max-w-prose mx-auto">
          Becoming a facilitator allows you to lead meaningful discussions and support individuals in their mental health journeys. 
          As a facilitator, you'll have the opportunity to create a safe and inclusive environment for participants, 
          helping them share their experiences and learn from one another. Your guidance can make a real difference in their lives.
        </p>

        <FacilitatorApplicationForm />
      </div>
    </div>
  )
}



