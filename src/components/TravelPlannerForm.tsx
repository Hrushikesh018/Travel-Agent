
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { airplane } from 'lucide-react';
import TravelResults from './TravelResults';

interface TravelFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  interests: string;
}

const TravelPlannerForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TravelFormData>({
    source: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '',
    interests: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateTravelPlan = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to generate a travel plan.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.source || !formData.destination || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `Create a detailed travel plan with the following information:
      
Source: ${formData.source}
Destination: ${formData.destination}
Travel Dates: ${formData.startDate} to ${formData.endDate}
Budget: $${formData.budget}
Number of Travelers: ${formData.travelers}
Interests: ${formData.interests}

Please provide a comprehensive travel itinerary including:
1. Best time to visit and weather considerations
2. Recommended accommodations within budget
3. Must-visit attractions based on interests
4. Daily itinerary suggestions
5. Local cuisine recommendations
6. Transportation options
7. Budget breakdown
8. Packing suggestions
9. Cultural tips and local customs
10. Emergency contacts and important information

Format the response in a clear, organized manner with headings and bullet points.`;

      console.log('Generating travel plan with Gemini API...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Gemini API response:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const generatedPlan = data.candidates[0].content.parts[0].text;
        setTravelPlan(generatedPlan);
        toast({
          title: "Travel Plan Generated!",
          description: "Your personalized travel itinerary is ready.",
        });
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error generating travel plan:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate travel plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Plan Your Perfect Trip
            </CardTitle>
            <p className="text-gray-600 mt-2">Fill in your travel preferences and let AI create your ideal itinerary</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* API Key Input */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Label htmlFor="apiKey" className="text-sm font-semibold text-yellow-800">
                Gemini API Key (Required)
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="mt-2 border-yellow-300 focus:border-yellow-500"
              />
              <p className="text-xs text-yellow-700 mt-1">
                Get your free API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="source" className="text-sm font-semibold">From *</Label>
                <Input
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, NY"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-semibold">To *</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Paris, France"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-semibold">Start Date *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-semibold">End Date *</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-semibold">Budget (USD)</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-sm font-semibold">Number of Travelers</Label>
                <Input
                  id="travelers"
                  name="travelers"
                  type="number"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  min="1"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-sm font-semibold">Interests & Preferences</Label>
              <Textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., museums, food tours, nightlife, adventure sports, history, art, shopping..."
                rows={4}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>

            <Button 
              onClick={generateTravelPlan}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Your Perfect Trip...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <airplane className="w-5 h-5" />
                  <span>Generate Travel Plan</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {travelPlan && <TravelResults travelPlan={travelPlan} />}
      </div>
    </div>
  );
};

export default TravelPlannerForm;
