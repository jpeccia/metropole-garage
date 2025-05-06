import { Vehicle as PrismaVehicle } from '@prisma/client';

export class VehicleEntity {
  private data: PrismaVehicle;

  constructor(data: PrismaVehicle) {
    this.data = data;
  }

  public spawnForPlayer(playerId: number): void {
    const model = GetHashKey(this.data.model);
    RequestModel(model);

    const interval = setInterval(() => {
      if (HasModelLoaded(model)) {
        clearInterval(interval);

        const coords = GetEntityCoords(GetPlayerPed(playerId), false);
        const vehicle = CreateVehicle(model, coords[0], coords[1], coords[2], 0.0, true, true);

        const netId = NetworkGetNetworkIdFromEntity(vehicle);
        const ent = Entity(vehicle);
        ent.state.set('garage:vehicleData', this.data, true);

        emitNet('chat:addMessage', playerId, {
          args: ['Sistema', `Veículo com placa ${this.data.licensePlate} spawnado.`],
        });
      }
    }, 100);
  }
}
