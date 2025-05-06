import { prisma } from './../prisma/client';
import { VehicleEntity } from '../core/VehicleEntity';

export class VehicleService {
  static async getByPlate(plate: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { licensePlate: plate },
    });

    if (!vehicle) throw new Error('Veículo não encontrado');

    return new VehicleEntity(vehicle);
  }

  static async create(data: any) {
    return prisma.vehicle.create({ data });
  }

  static async listBySteam(steamId: string) {
    return prisma.vehicle.findMany({ where: { steamId } });
  }
}
