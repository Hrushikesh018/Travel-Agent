
import React from 'react';
import { airplane, map, users, calendar } from 'lucide-react';

const TravelPlannerHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <airplane className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          AI Travel Planner
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
          Let our AI create the perfect travel itinerary tailored to your preferences, budget, and dreams
        </p>
        <div className="flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <map className="w-5 h-5" />
            <span>Smart Itineraries</span>
          </div>
          <div className="flex items-center space-x-2">
            <users className="w-5 h-5" />
            <span>Group Planning</span>
          </div>
          <div className="flex items-center space-x-2">
            <calendar className="w-5 h-5" />
            <span>Date Optimization</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent"></div>
    </div>
  );
};

export default TravelPlannerHero;
