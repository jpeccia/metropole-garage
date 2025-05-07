import { useVehicles } from '@/contexts/VehicleContext';
import { VehicleCard } from './VehicleCard';
import { VehicleSpawnScreen } from './VehicleSpawnScreen';
import { VehicleFilter } from './VehicleFilter';
import { GaugeIcon } from 'lucide-react';

export function VehicleGarage() {
  const { filteredVehicles, selectedVehicle } = useVehicles();

  if (selectedVehicle) {
    return <VehicleSpawnScreen vehicle={selectedVehicle} />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <GaugeIcon className="h-8 w-8 text-[#BBDE1A]" />
          <h1 className="text-3xl font-bold text-[#BBDE1A]">Metropole Garage</h1>
        </div>
        
        <VehicleFilter />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
          
          {filteredVehicles.length === 0 && (
            <div className="col-span-full flex items-center justify-center p-8 border border-gray-700 rounded-lg">
              <p className="text-gray-400">No vehicles found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}