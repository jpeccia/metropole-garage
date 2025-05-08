"use strict";
console.log('Script do servidor inicializado');
const modelImageMap = {
    sultan: "https://cs1.gtaall.com.br/attachments/2020-05/original/fe4ab5b4e917a883e7be01984a19fedd0287c120/11686-GTA5-2020-03-27-12-30-06-32.jpg",
    t20: "https://gtacars.net/images/96aedf0b847f0454aa69cc413c697268",
};
const isAdmin = (source) => {
    return IsPlayerAceAllowed(String(source), 'metropole.admin');
};
const query = (sql, values) => {
    return global.exports.oxmysql.query_async(sql, values);
};
const getVehicles = async (identifier) => {
    return await query('SELECT * FROM vehicles WHERE owner = ?', [identifier]);
};
const saveVehicleState = async (plate, state) => {
    await query('UPDATE vehicles SET status = ? WHERE licensePlate = ?', [state, plate]);
};
const saveVehicleDamage = async (plate, damage) => {
    await query('UPDATE vehicles SET damage = ? WHERE licensePlate = ?', [damage, plate]);
};
const addVehicleToPlayer = async (identifier, plate, model, make, color, type = "car") => {
    const performance = JSON.stringify({});
    const customizations = JSON.stringify({});
    const damage = 0;
    const year = new Date().getFullYear();
    await query(`INSERT INTO vehicles (owner, licensePlate, model, make, year, color, type, performance, customizations, damage, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [identifier, plate, model, make, year, color, type, performance, customizations, damage, 'stored']);
};
const removeVehicleFromPlayer = async (identifier, plate) => {
    await query(`DELETE FROM vehicles WHERE owner = ? AND licensePlate = ?`, [identifier, plate]);
};
onNet('metropole:storeVehicle', async (plate, damage) => {
    const src = global.source;
    console.log(`[storeVehicle] Jogador ${src} guardou ${plate} com dano ${damage}`);
    await saveVehicleDamage(plate, damage);
    await saveVehicleState(plate, 'stored');
    emitNet('metropole:removeVehicle', src, plate);
});
onNet('metropole:spawnVehicle', async (plate, model, color, customizations, x, y, z) => {
    const src = global.source;
    const identifiers = getPlayerIdentifiers(src);
    const mainIdentifier = identifiers.find(id => id.startsWith('license:'));
    if (!mainIdentifier) {
        console.warn(`[spawnVehicle] Nenhum identificador encontrado para ${src}`);
        return;
    }
    try {
        const vehicle = await query('SELECT * FROM vehicles WHERE licensePlate = ? AND owner = ?', [plate, mainIdentifier]);
        if (!vehicle || vehicle.length === 0) {
            console.warn(`[spawnVehicle] Jogador ${src} tentou spawnar um veículo que não lhe pertence ou que não existe`);
            return;
        }
        if (vehicle[0].status === 'spawned') {
            const damage = vehicle[0].damage || 0;
            await saveVehicleDamage(plate, damage);
            TriggerClientEvent('metropole:storeVehicle', src, plate);
        }
        await saveVehicleState(plate, 'spawned');
        TriggerEvent('metropole:spawnVehicleLua', src, plate, model, color, customizations);
    }
    catch (err) {
        console.error('[spawnVehicle] Erro:', err);
    }
});
onNet('admin:spawnVehicle', (model) => {
    const src = global.source;
    if (!isAdmin(src)) {
        console.warn(`[admin:spawnVehicle] Jogador ${src} tentou usar comando admin sem permissão`);
        return;
    }
    TriggerClientEvent('admin:spawnVehicleClient', src, model);
});
onNet('requestVehicles', async () => {
    const src = global.source;
    console.log(`[requestVehicles] Solicitação de veículos do jogador ${src}`);
    const identifiers = getPlayerIdentifiers(src);
    const license = identifiers.find(id => id.startsWith('license:'));
    const mainIdentifier = license;
    if (!mainIdentifier) {
        console.warn(`[getVehicles] Nenhum identificador encontrado para ${src}`);
        TriggerClientEvent('sendVehicles', src, []);
        return;
    }
    try {
        const rawVehicles = await getVehicles(mainIdentifier);
        if (!rawVehicles || !Array.isArray(rawVehicles)) {
            console.warn(`[getVehicles] Nenhum veículo encontrado no banco para ${mainIdentifier}`);
            TriggerClientEvent('sendVehicles', src, []);
            return;
        }
        const vehicles = rawVehicles.map((v) => {
            const modelKey = v.model.toLowerCase();
            return {
                id: v.id.toString(),
                make: v.make,
                model: v.model,
                year: v.year,
                color: v.color,
                type: v.type,
                licensePlate: v.licensePlate,
                performance: JSON.parse(v.performance),
                customizations: JSON.parse(v.customizations),
                imageUrl: modelImageMap[modelKey]
            };
        });
        console.log(`[requestVehicles] ${vehicles.length} veículo(s) retornado(s) para o jogador ${src}`);
        TriggerClientEvent('sendVehicles', src, vehicles);
    }
    catch (err) {
        console.error('[getVehicles] Erro ao buscar veículos:', err);
        TriggerClientEvent('sendVehicles', src, []);
    }
});
RegisterCommand("giveVehicle", async (src, args, raw) => {
    const [targetIdStr, modelRaw, plateRaw, colorRaw, typeRaw] = args;
    if (!targetIdStr || !modelRaw || !plateRaw || !typeRaw) {
        emitNet("chat:addMessage", src, {
            args: ["^1Uso:^0 /giveVehicle [id] [modelo] [placa] [cor] [tipo]"],
        });
        return;
    }
    const targetId = parseInt(targetIdStr);
    if (isNaN(targetId) || !GetPlayerName(String(targetId))) {
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Jogador alvo inválido."],
        });
        return;
    }
    const identifiers = getPlayerIdentifiers(targetId);
    const license = identifiers.find((id) => id.startsWith("license:"));
    if (!license) {
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Não foi possível obter a licença do jogador."],
        });
        return;
    }
    const model = modelRaw.toLowerCase();
    const make = model.toUpperCase(); // ou poderia ser mapeado
    const plate = plateRaw.toUpperCase();
    const color = colorRaw || "White";
    const type = typeRaw.toLowerCase();
    const year = new Date().getFullYear();
    const performance = {
        braking: 7,
        handling: 7,
        topSpeed: 180,
        acceleration: 7,
    };
    const customizations = {
        wheels: "Stock",
        bodyKit: "Standard",
        spoiler: false,
        interior: "Default",
        paintJob: color,
        neonLights: false,
    };
    try {
        await query(`INSERT INTO vehicles (owner, licensePlate, model, make, year, color, type, performance, customizations, damage, status, imageUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            license,
            plate,
            model,
            make,
            year,
            color,
            type,
            JSON.stringify(performance),
            JSON.stringify(customizations),
            0,
            "stored",
            "https://example.com/default-car.jpg",
        ]);
        emitNet("chat:addMessage", src, {
            args: [`^2Sucesso:^0 Veículo ${model} (${plate}) adicionado para ${GetPlayerName(String(targetId))}.`],
        });
    }
    catch (error) {
        console.error("Erro ao adicionar veículo:", error);
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Falha ao adicionar veículo."],
        });
    }
}, false);
RegisterCommand("giveVehicle", async (src, args, raw) => {
    const [modelRaw, plateRaw, colorRaw, typeRaw] = args;
    if (!modelRaw || !plateRaw || !typeRaw) {
        emitNet("chat:addMessage", src, {
            args: ["^1Uso:^0 /giveVehicle [modelo] [placa] [cor] [tipo]"],
        });
        return;
    }
    const identifiers = getPlayerIdentifiers(src);
    const license = identifiers.find(id => id.startsWith('license:'));
    if (!license) {
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Não foi possível obter a licença do jogador."],
        });
        return;
    }
    const model = modelRaw.toLowerCase();
    const make = model.toUpperCase();
    const plate = plateRaw.toUpperCase();
    const color = colorRaw || "White";
    const type = typeRaw.toLowerCase();
    const year = new Date().getFullYear();
    const performance = {
        braking: 7,
        handling: 7,
        topSpeed: 180,
        acceleration: 7,
    };
    const customizations = {
        wheels: "Stock",
        bodyKit: "Standard",
        spoiler: false,
        interior: "Default",
        paintJob: color,
        neonLights: false,
    };
    try {
        await query(`INSERT INTO vehicles (owner, licensePlate, model, make, year, color, type, performance, customizations, damage, status, imageUrl)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            license,
            plate,
            model,
            make,
            year,
            color,
            type,
            JSON.stringify(performance),
            JSON.stringify(customizations),
            0,
            "stored",
            "https://example.com/default-car.jpg",
        ]);
        emitNet("chat:addMessage", src, {
            args: [`^2Sucesso:^0 Veículo ${model} (${plate}) adicionado para você.`],
        });
    }
    catch (error) {
        console.error("Erro ao adicionar veículo:", error);
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Falha ao adicionar veículo."],
        });
    }
}, false);
RegisterCommand("removeVehicle", async (src, args, raw) => {
    const [plateRaw] = args;
    if (!plateRaw) {
        emitNet("chat:addMessage", src, {
            args: ["^1Uso:^0 /removeVehicle [placa]"],
        });
        return;
    }
    const plate = plateRaw.toUpperCase();
    const identifiers = getPlayerIdentifiers(src);
    const license = identifiers.find(id => id.startsWith('license:'));
    if (!license) {
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Não foi possível obter a licença do jogador."],
        });
        return;
    }
    try {
        const vehicle = await query('SELECT * FROM vehicles WHERE licensePlate = ? AND owner = ?', [plate, license]);
        if (!vehicle || vehicle.length === 0) {
            emitNet("chat:addMessage", src, {
                args: [`^1Erro:^0 Veículo com placa ${plate} não encontrado ou não pertence a você.`],
            });
            return;
        }
        await removeVehicleFromPlayer(license, plate);
        emitNet("chat:addMessage", src, {
            args: [`^2Sucesso:^0 Veículo ${plate} removido com sucesso.`],
        });
    }
    catch (error) {
        console.error("Erro ao remover veículo:", error);
        emitNet("chat:addMessage", src, {
            args: ["^1Erro:^0 Falha ao remover o veículo."],
        });
    }
}, false);
