local garageUIOpen = false

-- Abrir com a tecla G
RegisterCommand("toggleGarage", function()
    print("Comando toggleGarage executado")
    garageUIOpen = not garageUIOpen
    SetNuiFocus(garageUIOpen, garageUIOpen)
    SendNUIMessage({
        type = "garage:toggle",
        show = garageUIOpen
    })
end)


-- Mapear tecla G para o comando
RegisterKeyMapping("toggleGarage", "Abrir a Garagem", "keyboard", "G")

-- Fechar com ESC ou botão da UI
RegisterNUICallback("garage:close", function(data, cb)
    garageUIOpen = false
    SetNuiFocus(false, false)
    cb({})
end)

-- Exemplo: receber comando de spawn da UI
RegisterNUICallback("garage:spawnVehicle", function(data, cb)
    local plate = data.plate
    TriggerServerEvent("metropole:spawnVehicle", plate)
    cb({ success = true })
end)

RegisterNUICallback("garage:storeVehicle", function(data, cb)
    local plate = data.plate
    TriggerServerEvent("metropole:storeVehicle", plate)
    cb({ success = true })
end)
