import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const vehicleService = {
  getVehiclesBySteamId: async (steamId: string) => {
    return prisma.vehicle.findMany({ where: { ownerSteamId: steamId } });
  },
  getVehicleByPlate: async (plate: string) => {
    return prisma.vehicle.findUnique({ where: { licensePlate: plate } });
  },
};
