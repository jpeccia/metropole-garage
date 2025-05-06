export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  licensePlate: string;
  performance: {
    topSpeed: number;
    acceleration: number;
    handling: number;
    braking: number;
  };
  customizations: {
    bodyKit?: string;
    wheels?: string;
    paintJob?: string;
    interior?: string;
    spoiler?: boolean;
    neonLights?: boolean;
  };
  imageUrl: string;
}

export type VehicleType = 'sports' | 'suv' | 'sedan' | 'motorcycle' | 'exotic' | 'offroad';

export interface VehicleContextType {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  filteredVehicles: Vehicle[];
  filterType: VehicleType | 'all';
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setFilterType: (type: VehicleType | 'all') => void;
  spawnVehicle: (vehicle: Vehicle) => void;
}