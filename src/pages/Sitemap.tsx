
import { useState } from 'react';
import { MapPin, Wifi, Cable, Router, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Outlet {
  id: string;
  type: 'ethernet' | 'power' | 'wifi' | 'router';
  x: number;
  y: number;
  label: string;
  status: 'working' | 'faulty' | 'unknown';
  floor: number;
  room: string;
}

const Sitemap = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);

  // Sample venue data - in a real app this would come from an API
  const outlets: Outlet[] = [
    { id: '1', type: 'router', x: 20, y: 30, label: 'Main Router', status: 'working', floor: 1, room: 'Server Room' },
    { id: '2', type: 'ethernet', x: 40, y: 50, label: 'ETH-001', status: 'faulty', floor: 1, room: 'Office A' },
    { id: '3', type: 'ethernet', x: 60, y: 40, label: 'ETH-002', status: 'working', floor: 1, room: 'Office B' },
    { id: '4', type: 'wifi', x: 80, y: 60, label: 'WiFi AP-1', status: 'unknown', floor: 1, room: 'Conference Room' },
    { id: '5', type: 'power', x: 30, y: 70, label: 'PWR-001', status: 'working', floor: 1, room: 'Office A' },
    { id: '6', type: 'ethernet', x: 25, y: 45, label: 'ETH-101', status: 'working', floor: 2, room: 'Office C' },
    { id: '7', type: 'wifi', x: 70, y: 35, label: 'WiFi AP-2', status: 'faulty', floor: 2, room: 'Break Room' },
    { id: '8', type: 'router', x: 50, y: 20, label: 'Floor Router', status: 'working', floor: 2, room: 'IT Closet' },
  ];

  const floorOutlets = outlets.filter(outlet => outlet.floor === selectedFloor);

  const getOutletIcon = (type: string) => {
    switch (type) {
      case 'ethernet': return <Cable className="h-4 w-4" />;
      case 'power': return <Zap className="h-4 w-4" />;
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'router': return <Router className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'text-green-600 bg-green-100';
      case 'faulty': return 'text-red-600 bg-red-100';
      case 'unknown': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Venue Sitemap</h1>
        <p className="text-gray-600">Interactive map showing outlet and cable locations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Floor Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Floor Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFloor === 1 ? "default" : "outline"}
                onClick={() => setSelectedFloor(1)}
                className="w-full justify-start"
              >
                Floor 1 (Ground)
              </Button>
              <Button
                variant={selectedFloor === 2 ? "default" : "outline"}
                onClick={() => setSelectedFloor(2)}
                className="w-full justify-start"
              >
                Floor 2 (Upper)
              </Button>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Cable className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Ethernet Port</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-purple-600" />
                <span className="text-sm">WiFi Access Point</span>
              </div>
              <div className="flex items-center space-x-2">
                <Router className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Router</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Power Outlet</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                  <span className="text-sm">Working</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-100 rounded-full"></div>
                  <span className="text-sm">Faulty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-100 rounded-full"></div>
                  <span className="text-sm">Unknown</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Display */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Floor {selectedFloor} Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-50 rounded-lg p-4 h-96 border-2 border-dashed border-gray-300">
                {/* Floor Plan Background */}
                <div className="absolute inset-4 bg-white rounded border shadow-sm">
                  {/* Room outlines */}
                  <div className="absolute top-4 left-4 w-32 h-20 border border-gray-300 bg-blue-50 rounded flex items-center justify-center text-xs font-medium">
                    Server Room
                  </div>
                  <div className="absolute top-4 right-4 w-32 h-24 border border-gray-300 bg-green-50 rounded flex items-center justify-center text-xs font-medium">
                    Conference Room
                  </div>
                  <div className="absolute bottom-4 left-4 w-28 h-20 border border-gray-300 bg-yellow-50 rounded flex items-center justify-center text-xs font-medium">
                    Office A
                  </div>
                  <div className="absolute bottom-4 right-4 w-28 h-20 border border-gray-300 bg-pink-50 rounded flex items-center justify-center text-xs font-medium">
                    Office B
                  </div>

                  {/* Outlets */}
                  {floorOutlets.map((outlet) => (
                    <button
                      key={outlet.id}
                      onClick={() => setSelectedOutlet(outlet)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 hover:scale-110 transition-transform ${getStatusColor(outlet.status)}`}
                      style={{ left: `${outlet.x}%`, top: `${outlet.y}%` }}
                      title={outlet.label}
                    >
                      {getOutletIcon(outlet.type)}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Outlet Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Outlet Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedOutlet ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {getOutletIcon(selectedOutlet.type)}
                    <span className="font-medium">{selectedOutlet.label}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {selectedOutlet.type}</div>
                    <div><strong>Floor:</strong> {selectedOutlet.floor}</div>
                    <div><strong>Room:</strong> {selectedOutlet.room}</div>
                    <div className="flex items-center space-x-2">
                      <strong>Status:</strong>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOutlet.status)}`}>
                        {selectedOutlet.status}
                      </span>
                    </div>
                  </div>
                  {selectedOutlet.status === 'faulty' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Issue:</strong> This outlet requires attention
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Click on an outlet to view details</p>
              )}
            </CardContent>
          </Card>

          {/* Outlet List */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Floor {selectedFloor} Outlets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {floorOutlets.map((outlet) => (
                  <button
                    key={outlet.id}
                    onClick={() => setSelectedOutlet(outlet)}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded border text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getOutletIcon(outlet.type)}
                        <span>{outlet.label}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(outlet.status)}`}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{outlet.room}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
