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

// Registrar o comando /car
RegisterCommand('car', async (source, args) => {
  // Verificar se o jogador é administrador
  if (!IsPlayerAceAllowed(source, 'admin')) { // Verifica se o jogador tem permissão de admin
    TriggerClientEvent('chat:addMessage', source, {
      args: ['^1ERROR', 'Você não tem permissão para usar este comando!'],
    });
    return;
  }

  // Verificar se a placa ou o modelo foi passado
  if (args.length < 1) {
    TriggerClientEvent('chat:addMessage', source, {
      args: ['^1ERROR', 'Você precisa especificar a placa ou o modelo!'],
    });
    return;
  }

  const plateOrModel = args[0];  // Placa ou modelo

  let plate: string | null = null;
  let model: string | null = null;
  let color = args[1] || 'black';  // Cor (opcional, se não passar, coloca "black")
  let customizations = {};  // Customizações (depois você pode passar dados aqui)

  // Se o primeiro argumento for uma placa (formato esperado: ABC1234)
  if (plateOrModel.match(/^[A-Z0-9]{1,7}$/)) {
    plate = plateOrModel;
    model = '';  // Não vamos buscar o modelo se for uma placa
  } else {
    // Caso contrário, é considerado um modelo
    model = plateOrModel;
    plate = generatePlate();  // Função que pode gerar uma placa aleatória, se precisar
  }

  // Se for um modelo, buscamos o veículo no banco de dados do FiveM
  if (model) {
    // Buscar o veículo pelo modelo (você pode fazer isso via evento ou consulta no banco de dados, se necessário)
    const vehicleData = await getVehicleByModel(model);  // Função fictícia que precisa ser implementada

    if (!vehicleData) {
      TriggerClientEvent('chat:addMessage', source, {
        args: ['^1ERROR', `Modelo ${model} não encontrado.`],
      });
      return;
    }

    // Agora temos as informações do veículo (modelo, cor, etc.), podemos spawná-lo
    TriggerClientEvent('metropole:adminSpawnVehicleLua', source, plate, vehicleData.model, color, customizations);
  } else {
    // Se for uma placa, spawnamos o veículo diretamente
    TriggerClientEvent('metropole:adminSpawnVehicleLua', source, plate, model || 'unknown', color, customizations);
  }

  TriggerClientEvent('chat:addMessage', source, {
    args: ['^2SUCCESS', `Veículo ${model} com a placa ${plate} spawnado com sucesso!`],
  });
}, false);

// Função fictícia para gerar uma placa aleatória
function generatePlate(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let plate = '';
  for (let i = 0; i < 7; i++) {
    plate += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return plate;
}

// Função fictícia para buscar o veículo no banco de dados (aqui você pode integrar com o seu banco de dados FiveM)
async function getVehicleByModel(model: string) {
  // Exemplo de consulta que você pode adaptar para o seu banco de dados
  const vehicles = [
    { model: 'buffalo', displayName: 'Buffalo', type: 'car' },
    { model: 'adder', displayName: 'Adder', type: 'car' },
    // Adicione outros modelos conforme necessário
  ];

  // Simula uma busca no banco de dados (substitua isso pela sua lógica real)
  return vehicles.find(vehicle => vehicle.model === model) || null;
}
