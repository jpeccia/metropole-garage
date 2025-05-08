import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Vehicle, VehicleContextType, VehicleType } from '@/types/vehicle';
import { toast } from '@/hooks/use-toast';

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filterType, setFilterType] = useState<VehicleType | 'all'>('all');
  
  const isBrowser = typeof window !== 'undefined';
  const isNui = isBrowser && typeof (window as any).invokeNative === 'function';

  const fetchNui = async <T = unknown>(event: string, data?: unknown): Promise<T> => {
    const url = isNui
      ? `https://metropolegarage/${event}`
      : `http://localhost:3001/${event}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data || {}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status} - ${res.statusText}: ${errorText}`);
    }

    return res.json();
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await fetchNui<Vehicle[]>('getVehicles');
        setVehicles(data || []);
      } catch (err) {
        console.error('Falha ao carregar os veículos:', err);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os veículos.',
          variant: 'destructive',
        });
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles =
    filterType === 'all'
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.type === filterType);

  const spawnVehicle = async (vehicle: Vehicle) => {
    try {
      await fetchNui('garage:spawnVehicle', {
        plate: vehicle.licensePlate,
        model: vehicle.model,
        color: vehicle.color,
        customizations: vehicle.customizations,
      });
      toast({
        title: 'Veículo Spawnado',
        description: `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) foi spawnado.`,
      });
    } catch (err) {
      console.error('Erro ao spawnar veículo:', err);
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
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};
