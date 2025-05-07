
onNet('metropole-garage:getVehicles', () => {
  const _source = global.source;
  const steam = GetPlayerIdentifierByType(_source, 'steam');

  // Simulando dados fixos — aqui você puxaria do banco
  const vehicles: VehicleData[] = [
    {
      id: 'veh1',
      make: 'Toyota',
      model: 'Supra',
      year: 1998,
      color: 'Red',
      licensePlate: 'XYZ123',
      type: 'sports',
      imageUrl: 'https://placehold.co/600x400',
      performance: {
        topSpeed: 200,
        acceleration: 80,
        handling: 75,
        braking: 70
      },
      customizations: {
        spoiler: true
      }
    }
  ];

  emitNet('metropole-garage:sendVehicles', _source, vehicles);
});

onNet('metropole-garage:spawnVehicle', (vehicle: VehicleData) => {
  const _source = global.source;
  const playerPed = GetPlayerPed(_source);

  const [x, y, z] = GetEntityCoords(playerPed, false);
  const vehicleHash = GetHashKey(vehicle.model);

  RequestModel(vehicleHash);
  while (!HasModelLoaded(vehicleHash)) {
    Wait(100);
  }

  const veh = CreateVehicle(vehicleHash, x + 2, y, z, GetEntityHeading(playerPed), true, false);

  SetVehicleNumberPlateText(veh, vehicle.licensePlate);
  SetPedIntoVehicle(playerPed, veh, -1);

  // Guardar no StateBag
  Entity(veh).state.set('owner', GetPlayerIdentifierByType(_source, 'steam'), true);

  emitNet('ox_lib:notify', _source, {
    title: 'Veículo Spawnado',
    description: `${vehicle.model} spawnado com placa ${vehicle.licensePlate}`,
    type: 'success'
  });
});
