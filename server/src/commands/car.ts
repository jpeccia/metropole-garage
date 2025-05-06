import { VehicleService } from '../services/VehicleService';

RegisterCommand('car', async (src: number, args: string[]) => {
  const plate = args[0];
  if (!plate) return emitNet('chat:addMessage', src, { args: ['Erro', 'Informe a placa.'] });

  try {
    const veh = await VehicleService.getByPlate(plate);
    veh.spawnForPlayer(src);
  } catch (err) {
    emitNet('chat:addMessage', src, { args: ['Erro', err.message] });
  }
}, true);
