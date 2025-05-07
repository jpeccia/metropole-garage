import { getVehicles, saveVehicleState } from './vehicleController';
import { isAdmin } from './utils';

onNet('metropole:getPlayerVehicles', async () => {
  const src = global.source as number;
  const identifier = GetPlayerIdentifier(src, 0); // ou use SteamID dependendo da base
  const vehicles = await getVehicles(identifier);
  emitNet('metropole:returnPlayerVehicles', src, vehicles);
});

onNet('metropole:storeVehicle', async (plate: string) => {
  const src = global.source as number;
  console.log(`Guardando veículo com placa ${plate} do player ${src}`);
  await saveVehicleState(plate, 'stored');
});

onNet('metropole:spawnVehicle', async (plate: string, model: string, color: string, customizations: any) => {
  const src = global.source as number;
  TriggerEvent('metropole:spawnVehicleLua', src, plate, model, color, customizations);
});

onNet('metropole:adminSpawnVehicle', (plate: string, model: string, color: string, customizations: any) => {
  const src = global.source as number;
  if (!isAdmin(src)) {
    console.log(`Usuário ${src} tentou spawnar veículo como admin sem permissão`);
    return;
  }

  TriggerEvent('metropole:adminSpawnVehicleLua', src, plate, model, color, customizations);
});
