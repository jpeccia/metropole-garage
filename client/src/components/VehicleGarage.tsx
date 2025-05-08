import { useVehicles } from '@/contexts/VehicleContext';
import { VehicleCard } from './VehicleCard';
import { VehicleSpawnScreen } from './VehicleSpawnScreen';
import { VehicleFilter } from './VehicleFilter';
import { GaugeIcon, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function VehicleGarage() {
  const { filteredVehicles, selectedVehicle } = useVehicles();

  const handleClose = () => {
    fetch('https://metropolegarage/garage:close', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  };

  const storeAllVehicles = () => {
    filteredVehicles.forEach((vehicle) => {
      fetch('https://metropolegarage/garage:storeVehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate: vehicle.licensePlate }),
      });
      toast({
        title: 'Veículos Guardados!',
        description: `Todos seus veiculos foram guardados com sucesso!`,
      });
    });
  };

  if (selectedVehicle) {
    return <VehicleSpawnScreen vehicle={selectedVehicle} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-6xl mx-auto bg-[#1a1a1a] p-6 rounded-2xl shadow-2xl border border-gray-700">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 z-10"
        >
          <X className="w-5 h-5 inline mr-1" />
          Fechar
        </button>

        <div className="flex items-center gap-3 mb-6">
          <GaugeIcon className="h-8 w-8 text-[#BBDE1A]" />
          <h1 className="text-3xl font-bold text-[#BBDE1A]">Metropole Garage</h1>
        </div>

        <div className="flex items-center gap-3 mb-6">
        <button
          onClick={storeAllVehicles}
          className="bg-[#BBDE1A] text-black px-4 py-2 rounded hover:bg-yellow-600"
        >
          Guardar Veiculos
        </button>
        </div>

        <VehicleFilter />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}

          {filteredVehicles.length === 0 && (
            <div className="col-span-full flex items-center justify-center p-8 border border-gray-700 rounded-lg">
              <p className="text-gray-400">Você não tem veiculos :( </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}