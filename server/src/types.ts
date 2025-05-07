export interface VehicleData {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    type: VehicleType;
    licensePlate: string;
    imageUrl: string;
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
  }
  
  export type VehicleType = 'sports' | 'suv' | 'sedan' | 'motorcycle' | 'exotic' | 'offroad';
  