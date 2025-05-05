import { Button } from "@/components/ui/button";
import { useVehicles } from "@/contexts/VehicleContext";
import { Vehicle } from "@/types/vehicle";
import { ArrowRightCircle } from "lucide-react";

interface SpawnButtonProps {
  vehicle: Vehicle;
}

export function SpawnButton({ vehicle }: SpawnButtonProps) {
  const { spawnVehicle } = useVehicles();

  return (
    <Button 
      className="w-full bg-[#ffeeb2] text-gray-900 hover:bg-[#ffe380] transition-colors"
      onClick={() => spawnVehicle(vehicle)}
    >
      <ArrowRightCircle className="w-5 h-5 mr-2" />
      Spawn Vehicle
    </Button>
  );
}