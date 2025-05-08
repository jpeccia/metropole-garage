import { Card } from "@/components/ui/card";
import { Vehicle } from "@/types/vehicle";
import { useVehicles } from "@/contexts/VehicleContext";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { selectedVehicle, setSelectedVehicle } = useVehicles();
  const isSelected = selectedVehicle?.id === vehicle.id;

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 overflow-hidden h-[200px] ${
        isSelected ? 'ring-2 ring-[#BBDE1A]' : 'hover:ring-1 hover:ring-gray-500'
      }`}
      onClick={() => setSelectedVehicle(vehicle)}
    >
      <div className="relative h-full">
      <img 
          src={vehicle.imageUrl} 
          alt={vehicle.model}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[#BBDE1A] text-lg font-bold">
            {vehicle.make} {vehicle.model}
          </p>
          <p className="text-gray-300 text-sm">
            {vehicle.year} • {vehicle.type}
          </p>
          <p className="text-[#BBDE1A] text-sm mt-1">
            {vehicle.licensePlate}
          </p>
        </div>
      </div>
    </Card>
  );
}