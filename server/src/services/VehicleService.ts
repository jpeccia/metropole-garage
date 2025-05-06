import { prisma } from '../prisma/client';
import { VehicleEntity } from '../core/VehicleEntity';

export class VehicleService {
  async getAll(): Promise<VehicleEntity[]> {
    const vehicles = await prisma.vehicle.findMany({ include: { performance: true, customizations: true } });
    return vehicles.map(v => new VehicleEntity(v));
  }

  async getByPlate(plate: string): Promise<VehicleEntity | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate: plate },
      include: { performance: true, customizations: true },
    });
    return vehicle ? new VehicleEntity(vehicle) : null;
  }
}
