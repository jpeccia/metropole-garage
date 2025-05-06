import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Vehicle } from "@/types/vehicle";
import { useVehicles } from "@/contexts/VehicleContext";
import { ArrowLeft, Gauge, Zap, CircleDot, Anchor } from "lucide-react";

interface VehicleSpawnScreenProps {
  vehicle: Vehicle;
}

export function VehicleSpawnScreen({ vehicle }: VehicleSpawnScreenProps) {
  const { setSelectedVehicle, spawnVehicle } = useVehicles();
  const { performance, customizations } = vehicle;

  const stats = [
    { label: "Top Speed", value: performance.topSpeed, icon: <Gauge className="w-5 h-5" /> },
    { label: "Acceleration", value: performance.acceleration, icon: <Zap className="w-5 h-5" /> },
    { label: "Handling", value: performance.handling, icon: <CircleDot className="w-5 h-5" /> },
    { label: "Braking", value: performance.braking, icon: <Anchor className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="text-[#BBDE1A] hover:text-[#ffe380] mb-6"
          onClick={() => setSelectedVehicle(null)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Garage
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img 
              src={vehicle.imageUrl} 
              alt={vehicle.model} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl font-bold text-[#BBDE1A]">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-300 mt-2">
                {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} • {vehicle.color}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-[#BBDE1A]">
                      {stat.icon}
                      <span className="ml-2">{stat.label}</span>
                    </div>
                    <span className="text-[#BBDE1A]">{stat.value}%</span>
                  </div>
                  <Progress 
                    value={stat.value} 
                    className="h-2 bg-gray-800" 
                    indicatorClassName="bg-[#BBDE1A]" 
                  />
                </div>
              ))}
            </div>

            {customizations && (
              <div className="grid grid-cols-2 gap-3 mt-6">
                {Object.entries(customizations).map(([key, value]) => {
                  if (typeof value === 'boolean') return null;
                  if (!value) return null;
                  return (
                    <div key={key} className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-[#BBDE1A]">{value}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <Button 
              className="w-full bg-[#BBDE1A] text-gray-900 hover:bg-[#ffe380] h-12 text-lg mt-6"
              onClick={() => spawnVehicle(vehicle)}
            >
              Spawn Vehicle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}