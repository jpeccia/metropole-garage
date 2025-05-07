AddEventHandler('metropole:spawnVehicleLua', function(source, plate, model, color, customizations)
    print('Spawning para player - Source:', source, 'Plate:', plate)
    TriggerClientEvent('metropole:spawnVehicleClient', source, plate, model, color, customizations)
end)

AddEventHandler('metropole:adminSpawnVehicleLua', function(source, plate, model, color, customizations)
    print('Spawning admin - Source:', source, 'Plate:', plate)
    TriggerClientEvent('metropole:spawnVehicleClient', source, plate, model, color, customizations)
end)
