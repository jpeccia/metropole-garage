import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Vehicle } from "@/types/vehicle";
import { SpawnButton } from "./SpawnButton";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const { performance } = vehicle;
  
  return (
    <Card className="p-6 bg-gray-900">
      <h2 className="text-xl font-bold text-[#ffeeb2] mb-4">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">Speed</span>
            <span className="text-[#ffeeb2]">{performance.topSpeed}%</span>
          </div>
          <Progress value={performance.topSpeed} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">Acceleration</span>
            <span className="text-[#ffeeb2]">{performance.acceleration}%</span>
          </div>
          <Progress value={performance.acceleration} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-300">Handling</span>
            <span className="text-[#ffeeb2]">{performance.handling}%</span>
          </div>
          <Progress value={performance.handling} className="h-2" />
        </div>
      </div>
      
      <SpawnButton vehicle={vehicle} />
    </Card>
  );
}