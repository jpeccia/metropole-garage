import { getVehicles, saveVehicleState } from './vehicleController';
import { isAdmin } from './utils';

declare function RegisterNuiCallbackType(name: string): void;
declare function on(event: string, callback: (...args: any[]) => void): void;


onNet('metropole:getPlayerVehicles', async () => {
  const src = global.source as number;
  const identifiers = getPlayerIdentifiers(src);

  const license = identifiers.find(id => id.startsWith('license:'));
  const steam = identifiers.find(id => id.startsWith('steam:'));

  const mainIdentifier = license || steam;

  if (!mainIdentifier) {
    console.warn(`Nenhum identificador válido encontrado para o jogador ${src}`);
    return;
  }

  const vehicles = await getVehicles(mainIdentifier);
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

RegisterNuiCallbackType('getVehicles');

on('getVehicles', async (data: any, cb: Function) => {
  const _source = (global as any).source;
  const src = typeof _source === 'number' ? _source : 1;

  const identifiers = getPlayerIdentifiers(src);
  const license = identifiers.find((id) => id.startsWith('license:'));
  const steam = identifiers.find((id) => id.startsWith('steam:'));
  const mainIdentifier = license || steam;

  if (!mainIdentifier) {
    console.warn(`Nenhum identificador válido encontrado para o jogador ${src}`);
    cb([]); // fallback vazio
    return;
  }

  const vehicles = await getVehicles(mainIdentifier);
  cb(vehicles);
});

