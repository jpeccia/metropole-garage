import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Vehicle, VehicleContextType, VehicleType } from '@/types/vehicle';
import { toast } from '@/hooks/use-toast';

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterType, setFilterType] = useState<VehicleType | 'all'>('all');

  const isEnvBrowser = typeof window !== 'undefined';
  const isNuiEnv = isEnvBrowser && (window as any).invokeNative;

  const fetchNui = async <T>(event: string, data?: any): Promise<T> => {
    if (isNuiEnv) {
      const res = await fetch(`https://metropole-garage/${event}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || {}),
      });
      return res.json();
    } else {
      const res = await fetch(`http://localhost:3001/${event}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || {}),
      });
      return res.json();
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await fetchNui<Vehicle[]>('getVehicles');
        setVehicles(data);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os veículos.',
          variant: 'destructive',
        });
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = filterType === 'all'
    ? vehicles
    : vehicles.filter(vehicle => vehicle.type === filterType);

  const spawnVehicle = async (vehicle: Vehicle) => {
    try {
      await fetchNui('spawnVehicle', vehicle);

      toast({
        title: 'Vehicle Spawned',
        description: `Your ${vehicle.year} ${vehicle.make} ${vehicle.model} with plate ${vehicle.licensePlate} has been spawned in the game.`,
      });
    } catch (err) {
      console.error('Spawn error:', err);
      toast({
        title: 'Erro ao spawnar veículo',
        description: 'Algo deu errado ao tentar spawnar o veículo.',
        variant: 'destructive',
      });
    }
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
