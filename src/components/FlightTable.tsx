
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Plane, Clock, DollarSign } from 'lucide-react';

interface Flight {
  flights: Array<{
    departure_airport: {
      name: string;
      id: string;
      time: string;
    };
    arrival_airport: {
      name: string;
      id: string;
      time: string;
    };
    duration: number;
    airplane: string;
    airline: string;
    flight_number: string;
  }>;
  total_duration: number;
  price: number;
  booking_token: string;
}

interface FlightTableProps {
  flights: Flight[];
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleBookFlight = (bookingToken: string) => {
    // This would typically redirect to the booking page or open a new tab
    // For now, we'll show the booking token (in a real app, you'd construct the booking URL)
    const bookingUrl = `https://www.google.com/travel/flights/booking?token=${encodeURIComponent(bookingToken)}`;
    window.open(bookingUrl, '_blank');
  };

  if (!flights || flights.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Available Flights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flight</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Aircraft</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight, index) => {
                const flightInfo = flight.flights[0]; // Taking the first flight segment
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{flightInfo.airline}</div>
                      <div className="text-sm text-gray-500">{flightInfo.flight_number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{flightInfo.departure_airport.id}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(flightInfo.departure_airport.time)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{flightInfo.arrival_airport.id}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(flightInfo.arrival_airport.time)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDuration(flight.total_duration)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{flightInfo.airplane}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-bold text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {flight.price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleBookFlight(flight.booking_token)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Book
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightTable;
