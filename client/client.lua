local garageUIOpen = false

local spawnedVehicles = {}

local NamedColors = {
    Black   = {0,   0,   0  },
    White   = {255, 255, 255},
    Red     = {255, 0,   0  },
    Green   = {0,   255, 0  },
    Blue    = {0,   0,   255},
    Yellow  = {255, 255, 0  },
    Orange  = {255, 165, 0  },
    Pink    = {255, 192, 203},
    Purple  = {128, 0,   128},
    Brown   = {165, 42,  42 },
    Grey    = {128, 128, 128},
  }

local function hexToRgb(hex)
    hex = hex:gsub("#","")
    return tonumber(hex:sub(1,2),16),
           tonumber(hex:sub(3,4),16),
           tonumber(hex:sub(5,6),16)
  end

RegisterCommand("toggleGarage", function()
    garageUIOpen = not garageUIOpen
    SetNuiFocus(garageUIOpen, garageUIOpen)
    SendNUIMessage({
        type = "garage:toggle",
        show = garageUIOpen
    })
end)

RegisterKeyMapping("toggleGarage", "Abrir/Fechar a Garagem", "keyboard", "G")

RegisterNUICallback("garage:close", function(data, cb)
    garageUIOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "garage:toggle",
        show = false
    })
    cb({})
end)

RegisterNUICallback("garage:spawnVehicle", function(data, cb)
    local plate = data.plate
    local model = data.model
    local color = data.color
    local customizations = data.customizations
    TriggerServerEvent("metropole:spawnVehicle", plate, model, color, customizations)
    cb({ success = true })
end)

RegisterNUICallback("garage:storeVehicle", function(data, cb)
    local plate = data.plate
    local veh = spawnedVehicles[plate]
  
    local damage = 0
    if veh and DoesEntityExist(veh) then
      damage = GetVehicleEngineHealth(veh) or 0
    end
  
    TriggerServerEvent("metropole:storeVehicle", plate, damage)
    cb({ success = true })
  end)

local vehiclesCb = nil

RegisterNUICallback('getVehicles', function(data, cb)
    vehiclesCb = cb
    TriggerServerEvent('requestVehicles')
end)

RegisterNetEvent('sendVehicles')
AddEventHandler('sendVehicles', function(vehicles)
    if vehiclesCb then
        vehiclesCb(vehicles)
        vehiclesCb = nil
    end
end)

RegisterNetEvent('metropole:removeVehicle')
AddEventHandler('metropole:removeVehicle', function(plate)
  local veh = spawnedVehicles[plate]
  if veh and DoesEntityExist(veh) then
    DeleteVehicle(veh)
  end
  spawnedVehicles[plate] = nil
end)

RegisterNetEvent('metropole:spawnVehicleClient')
AddEventHandler('metropole:spawnVehicleClient', function(plate, model, color, customizations)
  local playerPed = PlayerPedId()
  local coords, heading = GetEntityCoords(playerPed), GetEntityHeading(playerPed)

  local existing = spawnedVehicles[plate]
  if existing and DoesEntityExist(existing) then
    SetEntityCoordsNoOffset(existing, coords.x, coords.y, coords.z, false, false, false)
    SetEntityHeading(existing, heading)
    SetPedIntoVehicle(playerPed, existing, -1)
    return
  end

  local modelHash = GetHashKey(model)
  RequestModel(modelHash)
  while not HasModelLoaded(modelHash) do Citizen.Wait(0) end

  local vehicle = CreateVehicle(modelHash, coords.x, coords.y, coords.z, heading, true, false)
  SetVehicleNumberPlateText(vehicle, plate)
  SetModelAsNoLongerNeeded(modelHash)

  if color and color ~= "" then
    local r,g,b
    if color:match("^#%x%x%x%x%x%x$") then
      local hex = color:gsub("#","")
      r,g,b = tonumber(hex:sub(1,2),16), tonumber(hex:sub(3,4),16), tonumber(hex:sub(5,6),16)
    else
      local NamedColors = {
        Black = {0,0,0}, White = {255,255,255}, Red = {255,0,0}, -- etc
      }
      local n = NamedColors[color]
      if n then r,g,b = n[1],n[2],n[3] end
    end
    if r then SetVehicleCustomPrimaryColour(vehicle, r,g,b) end
  end

  if customizations and customizations.mods then
    for t, v in pairs(customizations.mods) do
      SetVehicleMod(vehicle, tonumber(t), tonumber(v), false)
    end
  end

  spawnedVehicles[plate] = vehicle

  SetPedIntoVehicle(playerPed, vehicle, -1)
end)

RegisterCommand('car', function(source, args, rawCommand)
    if #args < 1 then
        TriggerEvent('chat:addMessage', {
            args = {"^1Erro:^0 Use /car [modelo]"}
        })
        return
    end
    local model = string.lower(args[1]) -- Converte para minúsculas
    TriggerServerEvent('admin:spawnVehicle', model)
end, false)

RegisterNetEvent('admin:spawnVehicleClient')
AddEventHandler('admin:spawnVehicleClient', function(model)
    local modelHash = GetHashKey(model)
    if not IsModelAVehicle(modelHash) then
        TriggerEvent('chat:addMessage', {
            args = {"^1Erro:^0 Modelo inválido para veículo"}
        })
        return
    end
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed)
    RequestModel(modelHash)
    while not HasModelLoaded(modelHash) do
        Citizen.Wait(0)
    end
    local vehicle = CreateVehicle(modelHash, coords.x, coords.y, coords.z, 0.0, true, false)
    SetModelAsNoLongerNeeded(modelHash)
end)