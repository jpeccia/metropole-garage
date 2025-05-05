import { createContext, useContext, useState, type ReactNode } from 'react';
import { vehicles } from '@/data/vehicles';
import type { Vehicle, VehicleContextType, VehicleType } from '@/types/vehicle';
import { toast } from '@/hooks/use-toast';

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterType, setFilterType] = useState<VehicleType | 'all'>('all');

  const filteredVehicles = filterType === 'all'
    ? vehicles
    : vehicles.filter(vehicle => vehicle.type === filterType);

  const spawnVehicle = (vehicle: Vehicle) => {
    toast({
      title: "Vehicle Spawned",
      description: `Your ${vehicle.year} ${vehicle.make} ${vehicle.model} has been spawned in the game.`,
      variant: "success",
    });
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        selectedVehicle,
        filteredVehicles,
        filterType,
        setSelectedVehicle,
        setFilterType,
        spawnVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = (): VehicleContextType => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};