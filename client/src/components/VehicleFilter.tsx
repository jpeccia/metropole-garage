import { Button } from "@/components/ui/button";
import { useVehicles } from "@/contexts/VehicleContext";
import { VehicleType } from "@/types/vehicle";
import { Car, Trophy, Truck, CircleDollarSign, Bike, Mountain, CarFront } from "lucide-react";

export function VehicleFilter() {
  const { filterType, setFilterType } = useVehicles();
  
  const filters: { value: VehicleType | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'Todos', icon: <Car className="h-4 w-4" /> },
    { value: 'sports', label: 'Esportivos', icon: <Trophy className="h-4 w-4" /> },
    { value: 'sedan', label: 'Sedans', icon: <CarFront className="h-4 w-4" /> },
    { value: 'exotic', label: 'Diferentes', icon: <CircleDollarSign className="h-4 w-4" /> },
    { value: 'suv', label: 'SUV', icon: <Truck className="h-4 w-4" /> },
    { value: 'motorcycle', label: 'Motos', icon: <Bike className="h-4 w-4" /> },
    { value: 'offroad', label: 'Off-road', icon: <Mountain className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={filterType === filter.value ? "default" : "outline"}
          className={`
            ${filterType === filter.value 
              ? 'bg-[#BBDE1A] text-white-900' 
              : 'text-[#BBDE1A] hover:text-gray-400 hover:bg-[#BBDE1A ]'
            }
          `}
          onClick={() => setFilterType(filter.value)}
        >
          {filter.icon}
          <span className="ml-2">{filter.label}</span>
        </Button>
      ))}
    </div>
  );
}