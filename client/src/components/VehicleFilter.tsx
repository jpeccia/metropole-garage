import { Button } from "@/components/ui/button";
import { useVehicles } from "@/contexts/VehicleContext";
import type { VehicleType } from "@/types/vehicle";
import { Car, Trophy, Truck, CircleDollarSign, Bike, Mountain } from "lucide-react";

export function VehicleFilter() {
  const { filterType, setFilterType } = useVehicles();
  
  const filters: { value: VehicleType | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Car className="h-4 w-4" /> },
    { value: 'sports', label: 'Sports', icon: <Trophy className="h-4 w-4" /> },
    { value: 'exotic', label: 'Exotic', icon: <CircleDollarSign className="h-4 w-4" /> },
    { value: 'suv', label: 'SUV', icon: <Truck className="h-4 w-4" /> },
    { value: 'motorcycle', label: 'Motorcycle', icon: <Bike className="h-4 w-4" /> },
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
              ? 'bg-[#ffeeb2] text-gray-900' 
              : 'text-[#ffeeb2] hover:text-gray-900 hover:bg-[#ffeeb2]'
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