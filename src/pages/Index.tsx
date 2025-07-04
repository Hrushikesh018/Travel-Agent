
import React from 'react';
import TravelPlannerHero from '@/components/TravelPlannerHero';
import TravelPlannerForm from '@/components/TravelPlannerForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <TravelPlannerHero />
      <TravelPlannerForm />
    </div>
  );
};

export default Index;
