import query from '@overextended/oxmysql';
import Vehicle from './vehicle';

async function initializeDatabase() {
    await query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            owner VARCHAR(50) NOT NULL,
            make VARCHAR(50),
            model VARCHAR(50) NOT NULL,
            year INT,
            color VARCHAR(20),
            type ENUM('sports', 'suv', 'sedan', 'motorcycle', 'exotic', 'offroad'),
            licensePlate VARCHAR(10) UNIQUE NOT NULL,
            topSpeed FLOAT,
            acceleration FLOAT,
            handling FLOAT,
            braking FLOAT,
            customizations JSON,
            imageUrl VARCHAR(255)
        )
    `);
}

on('onResourceStart', (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
        initializeDatabase().then(() => {
            console.log('Banco de dados inicializado');
        }).catch(err => {
            console.error('Falha ao inicializar banco de dados:', err);
        });
    }
});

function getSteamId(source: number): string | null {
    const identifiers = getPlayerIdentifiers(source.toString());
    for (const id of identifiers) {
        if (id.startsWith('steam:')) {
            return id;
        }
    }
    return null;
}

setHttpHandler((req, res) => {
    if (req.method === 'POST' && req.path === '/getVehicles') {
        let body = '';
        req.setDataHandler((data: string) => {
            body += data;
        });
        req.setEndHandler(async () => {
            const fivemUrl = req.headers['fivem-url'];
            if (!fivemUrl) {
                res.send('Cabeçalho fivem-url ausente');
                return;
            }
            const match = fivemUrl.match(/http:\/\/(\d+)\//);
            if (!match) {
                res.send('fivem-url inválido');
                return;
            }
            const source = parseInt(match[1], 10);
            const steamId = getSteamId(source);
            if (!steamId) {
                res.send('Jogador sem Steam ID');
                return;
            }
            try {
                const vehicles = await query('SELECT * FROM vehicles WHERE owner = ?', [steamId]);
                res.send(JSON.stringify(vehicles));
            } catch (err) {
                console.error('Falha ao buscar veículos:', err);
                res.send('Erro ao buscar veículos');
            }
        });
    } else if (req.method === 'POST' && req.path === '/spawnVehicle') {
        let body = '';
        req.setDataHandler((data: string) => {
            body += data;
        });
        req.setEndHandler(async () => {
            try {
                const vehicleData = JSON.parse(body);
                const fivemUrl = req.headers['fivem-url'];
                if (!fivemUrl) {
                    res.send('Cabeçalho fivem-url ausente');
                    return;
                }
                const match = fivemUrl.match(/http:\/\/(\d+)\//);
                if (!match) {
                    res.send('fivem-url inválido');
                    return;
                }
                const source = parseInt(match[1], 10);
                const steamId = getSteamId(source);
                if (!steamId) {
                    res.send('Jogador sem Steam ID');
                    return;
                }
                if (vehicleData.owner !== steamId) {
                    res.send('Você não possui este veículo');
                    return;
                }
                const vehicle = new Vehicle(vehicleData);
                await vehicle.spawn(source);
                res.send('Veículo gerado');
            } catch (err) {
                console.error('Erro ao gerar veículo:', err);
                res.send('Erro ao gerar veículo');
            }
        });
    } else {
        res.send('Requisição inválida');
    }
});

RegisterCommand('car', async (source: number, args: string[]) => {
    if (!IsPlayerAceAllowed(source.toString(), 'command.car')) {
        console.log('Você não tem permissão para usar este comando.');
        return;
    }
    const placa = args[0];
    if (!placa) {
        console.log('Uso: /car <placa>');
        return;
    }
    try {
        const [vehicleData] = await query('SELECT * FROM vehicles WHERE licensePlate = ?', [placa]);
        if (!vehicleData) {
            console.log('Veículo não encontrado');
            return;
        }
        const vehicle = new Vehicle(vehicleData);
        await vehicle.spawn(source);
        console.log('Veículo gerado');
    } catch (err) {
        console.error('Erro ao gerar veículo:', err);
    }
}, false);