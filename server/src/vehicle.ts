interface VehicleData {
    id: number;
    owner: string;
    make: string;
    model: string;
    year: number;
    color: string;
    type: 'sports' | 'suv' | 'sedan' | 'motorcycle' | 'exotic' | 'offroad';
    licensePlate: string;
    topSpeed: number;
    acceleration: number;
    handling: number;
    braking: number;
    customizations: {
        bodyKit?: string;
        wheels?: string;
        paintJob?: string;
        interior?: string;
        spoiler?: boolean;
        neonLights?: boolean;
    };
    imageUrl: string;
}

class Vehicle {
    private data: VehicleData;

    constructor(data: VehicleData) {
        this.data = data;
    }

    async spawn(source: number): Promise<void> {
        const modelHash = GetHashKey(this.data.model);
        const playerPed = GetPlayerPed(source.toString());
        const [x, y, z] = GetEntityCoords(playerPed);
        const heading = GetEntityHeading(playerPed);
        const vehicle = CreateVehicle(modelHash, x + 2, y + 2, z, heading, true, false);
        
        while (!DoesEntityExist(vehicle)) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        SetVehicleNumberPlateText(vehicle, this.data.licensePlate);
        const colorIndex = this.getColorIndex(this.data.color);
        SetVehicleColours(vehicle, colorIndex, colorIndex);
    }

    private getColorIndex(colorName: string): number {
        const colorMap: { [key: string]: number } = {
            'red': 27,
            'blue': 64,
            'black': 0,
            'white': 112
        };
        return colorMap[colorName.toLowerCase()] || 0;
    }
}

export default Vehicle;